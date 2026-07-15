import { describe, expect, it } from 'vitest';
import { MockClient } from './mockClient';

type Row = Record<string, unknown>;

describe('MockClient query builder', () => {
  it('inserts and returns the row with a generated id', async () => {
    const c = new MockClient();
    const { data } = await c
      .from('participants')
      .insert({ session_id: 's1', role: 'admin', nickname: 'Ana' })
      .select('id')
      .single();
    expect((data as Row).id).toBeTruthy();
    expect(c.db.participants).toHaveLength(1);
  });

  it('filters selects by chained eq', async () => {
    const c = new MockClient();
    await c.from('responses').insert({ session_id: 's1', activity_id: 'a', payload: { choice: 1 } });
    await c.from('responses').insert({ session_id: 's1', activity_id: 'b', payload: { choice: 2 } });
    const { data } = await c.from('responses').select('*').eq('session_id', 's1').eq('activity_id', 'b');
    expect(data).toHaveLength(1);
    expect((data as Row[])[0].activity_id).toBe('b');
  });

  it('upsert with onConflict updates in place instead of duplicating', async () => {
    const c = new MockClient();
    const key = { onConflict: 'participant_id,activity_id' };
    await c.from('responses').upsert({ participant_id: 'p1', activity_id: 'a', payload: { choice: 0 } }, key);
    await c.from('responses').upsert({ participant_id: 'p1', activity_id: 'a', payload: { choice: 3 } }, key);
    expect(c.db.responses).toHaveLength(1);
    expect((c.db.responses[0].payload as Row).choice).toBe(3);
  });

  it('delete removes matching rows', async () => {
    const c = new MockClient();
    await c.from('responses').insert({ session_id: 's1', activity_id: 'a' });
    await c.from('responses').insert({ session_id: 's2', activity_id: 'a' });
    await c.from('responses').delete().eq('session_id', 's1');
    expect(c.db.responses).toHaveLength(1);
    expect(c.db.responses[0].session_id).toBe('s2');
  });

  it('maybeSingle returns null when nothing matches', async () => {
    const c = new MockClient();
    const { data } = await c.from('sessions').select('*').eq('code', 'NOPE').maybeSingle();
    expect(data).toBeNull();
  });
});

describe('MockClient realtime', () => {
  it('fans a matching INSERT to a filtered subscriber', async () => {
    const c = new MockClient();
    const seen: Row[] = [];
    const ch = c.channel('t').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'responses', filter: 'session_id=eq.s1' },
      (p) => seen.push(p.new),
    );
    ch.subscribe();
    await c.from('responses').insert({ session_id: 's1', activity_id: 'a' });
    await c.from('responses').insert({ session_id: 's2', activity_id: 'a' }); // filtered out
    expect(seen).toHaveLength(1);
    expect(seen[0].session_id).toBe('s1');
  });

  it('stops delivering after removeChannel', async () => {
    const c = new MockClient();
    const seen: Row[] = [];
    const ch = c.channel('t').on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'participants', filter: 'session_id=eq.s1' },
      (p) => seen.push(p.new),
    );
    ch.subscribe();
    c.removeChannel(ch);
    await c.from('participants').insert({ session_id: 's1', role: 'admin', nickname: 'x' });
    expect(seen).toHaveLength(0);
  });
});
