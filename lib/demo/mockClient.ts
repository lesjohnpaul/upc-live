/**
 * In-memory stand-in for the Supabase client, used ONLY on `/demo` routes.
 *
 * Why it exists: the public demo must let anyone explore the join / stage /
 * dashboard surfaces without ever reading or writing the real seminar's rows.
 * getSupabase() returns this mock whenever the browser is on a `/demo` path,
 * so every real component runs unchanged against a throwaway local store —
 * there is no network call, so the live UPC1/UPC2 data is physically
 * unreachable from the demo.
 *
 * It implements only the tiny slice of the Supabase API the app actually uses
 * (see the getSupabase call sites): a thenable query builder with eq / select /
 * maybeSingle / single / insert / upsert / update / delete, plus a
 * postgres_changes channel. Mutations fan out to same-tab subscribers and, via
 * BroadcastChannel, to other demo tabs — so answering on a phone tab shows up
 * live on a stage tab, exactly like the real thing.
 *
 * The pure store (MockDb) is exported for tests; realtime + broadcast are thin
 * layers on top and no-op cleanly when BroadcastChannel is unavailable.
 */

type Row = Record<string, unknown>;
type ChangeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

const uid = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${performance.now()}`;

const now = () => new Date().toISOString();

/** eq() filters accumulated on a builder, applied as AND. */
type Filter = { col: string; val: unknown };

const matches = (row: Row, filters: Filter[]) => filters.every((f) => row[f.col] === f.val);

/** Plain in-memory tables. No realtime — that lives in MockClient. */
export class MockDb {
  sessions: Row[] = [];
  participants: Row[] = [];
  responses: Row[] = [];

  table(name: string): Row[] {
    if (name === 'sessions') return this.sessions;
    if (name === 'participants') return this.participants;
    if (name === 'responses') return this.responses;
    throw new Error(`mock: unknown table ${name}`);
  }
}

type EmitFn = (table: string, event: ChangeEvent, row: Row, broadcast: boolean) => void;

/**
 * Thenable query builder. Each method mutates and returns `this`; awaiting it
 * (or calling maybeSingle/single) runs the accumulated op against the store.
 */
class Query implements PromiseLike<{ data: unknown; error: null }> {
  private filters: Filter[] = [];
  private op: 'select' | 'insert' | 'upsert' | 'update' | 'delete' = 'select';
  private payload: Row | null = null;
  private conflictKeys: string[] = [];
  private wantReturn = false; // insert().select() -> return the row
  private wantSingle = false;

  constructor(
    private db: MockDb,
    private tableName: string,
    private emit: EmitFn,
  ) {}

  private get rows() {
    return this.db.table(this.tableName);
  }

  eq(col: string, val: unknown) {
    this.filters.push({ col, val });
    return this;
  }

  select() {
    this.wantReturn = true;
    return this;
  }

  insert(obj: Row) {
    this.op = 'insert';
    this.payload = { ...obj };
    return this;
  }

  upsert(obj: Row, opts?: { onConflict?: string }) {
    this.op = 'upsert';
    this.payload = { ...obj };
    this.conflictKeys = (opts?.onConflict ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    return this;
  }

  update(obj: Row) {
    this.op = 'update';
    this.payload = { ...obj };
    return this;
  }

  delete() {
    this.op = 'delete';
    return this;
  }

  maybeSingle() {
    this.wantSingle = true;
    return this.run();
  }

  async single() {
    this.wantSingle = true;
    return this.run();
  }

  then<R1 = { data: unknown; error: null }, R2 = never>(
    onfulfilled?: ((v: { data: unknown; error: null }) => R1 | PromiseLike<R1>) | null,
    onrejected?: ((reason: unknown) => R2 | PromiseLike<R2>) | null,
  ): PromiseLike<R1 | R2> {
    return this.run().then(onfulfilled, onrejected);
  }

  private async run(): Promise<{ data: unknown; error: null }> {
    switch (this.op) {
      case 'insert': {
        const row: Row = { id: uid(), created_at: now(), ...this.payload };
        this.rows.push(row);
        this.emit(this.tableName, 'INSERT', row, true);
        return { data: this.wantReturn ? (this.wantSingle ? row : [row]) : null, error: null };
      }
      case 'upsert': {
        const row: Row = { created_at: now(), ...this.payload };
        const i =
          this.conflictKeys.length > 0
            ? this.rows.findIndex((r) => this.conflictKeys.every((k) => r[k] === row[k]))
            : -1;
        if (i === -1) {
          if (!row.id) row.id = uid();
          this.rows.push(row);
          this.emit(this.tableName, 'INSERT', row, true);
        } else {
          this.rows[i] = { ...this.rows[i], ...row };
          this.emit(this.tableName, 'UPDATE', this.rows[i], true);
        }
        return { data: null, error: null };
      }
      case 'update': {
        for (const r of this.rows.filter((r) => matches(r, this.filters))) {
          Object.assign(r, this.payload);
          this.emit(this.tableName, 'UPDATE', r, true);
        }
        return { data: null, error: null };
      }
      case 'delete': {
        const gone = this.rows.filter((r) => matches(r, this.filters));
        const keep = this.rows.filter((r) => !matches(r, this.filters));
        this.rows.length = 0;
        this.rows.push(...keep);
        for (const r of gone) this.emit(this.tableName, 'DELETE', r, true);
        return { data: null, error: null };
      }
      default: {
        const found = this.rows.filter((r) => matches(r, this.filters));
        if (this.wantSingle) return { data: found[0] ?? null, error: null };
        return { data: found.map((r) => ({ ...r })), error: null };
      }
    }
  }
}

type Sub = {
  table: string;
  event: ChangeEvent;
  filter: Filter | null;
  cb: (payload: { new: Row; old: Row }) => void;
};

/** Parse a Supabase realtime filter string like `session_id=eq.abc`. */
function parseFilter(filter?: string): Filter | null {
  if (!filter) return null;
  const m = filter.match(/^(.+)=eq\.(.*)$/);
  return m ? { col: m[1], val: m[2] } : null;
}

class MockChannel {
  subs: Sub[] = [];
  constructor(
    private register: (ch: MockChannel) => void,
    private unregister: (ch: MockChannel) => void,
  ) {}

  on(
    _type: 'postgres_changes',
    cfg: { event: ChangeEvent; schema: string; table: string; filter?: string },
    cb: (payload: { new: Row; old: Row }) => void,
  ) {
    this.subs.push({ table: cfg.table, event: cfg.event, filter: parseFilter(cfg.filter), cb });
    return this;
  }

  subscribe(cb?: (status: string) => void) {
    this.register(this);
    // fire async so callers finish wiring handlers first, mirroring the socket
    setTimeout(() => cb?.('SUBSCRIBED'), 0);
    return this;
  }

  unsubscribe() {
    this.unregister(this);
  }
}

const BROADCAST_TAG = 'upc-demo-mutation';

/** The mock client: a MockDb plus realtime fan-out and cross-tab broadcast. */
export class MockClient {
  private channels = new Set<MockChannel>();
  private bc: BroadcastChannel | null = null;

  constructor(public db = new MockDb()) {
    if (typeof BroadcastChannel !== 'undefined') {
      this.bc = new BroadcastChannel('upc-demo');
      this.bc.onmessage = (e) => {
        const msg = e.data as { tag?: string; table?: string; event?: ChangeEvent; row?: Row };
        if (msg?.tag !== BROADCAST_TAG || !msg.table || !msg.event || !msg.row) return;
        this.applyRemote(msg.table, msg.event, msg.row);
      };
    }
  }

  private emit: EmitFn = (table, event, row, broadcast) => {
    this.fan(table, event, row);
    if (broadcast && this.bc) this.bc.postMessage({ tag: BROADCAST_TAG, table, event, row });
  };

  /** A mutation from another tab: reflect it in this tab's store, then fan out. */
  private applyRemote(table: string, event: ChangeEvent, row: Row) {
    const rows = this.db.table(table);
    const i = rows.findIndex((r) => r.id === row.id);
    if (event === 'DELETE') {
      if (i !== -1) rows.splice(i, 1);
    } else if (i === -1) {
      rows.push(row);
    } else {
      rows[i] = row;
    }
    this.fan(table, event, row);
  }

  private fan(table: string, event: ChangeEvent, row: Row) {
    for (const ch of this.channels)
      for (const s of ch.subs)
        if (s.table === table && s.event === event && (!s.filter || row[s.filter.col] === s.filter.val))
          s.cb({ new: row, old: row });
  }

  from(table: string) {
    return new Query(this.db, table, this.emit);
  }

  channel() {
    return new MockChannel(
      (ch) => this.channels.add(ch),
      (ch) => this.channels.delete(ch),
    );
  }

  removeChannel(ch: MockChannel) {
    ch.unsubscribe();
  }
}
