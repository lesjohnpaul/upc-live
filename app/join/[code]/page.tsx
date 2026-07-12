import { getSupabase } from '@/lib/supabase';
import JoinFlow from '@/components/join/JoinFlow';

export const metadata = { title: 'Sali — UPC Live' };
export const dynamic = 'force-dynamic';

type SessionRow = {
  id: string;
  code: string;
  day: number;
  active_activity: string | null;
};

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;

  let session: SessionRow | null = null;
  let fetchFailed = false;
  try {
    const { data, error } = await getSupabase()
      .from('sessions')
      .select('id, code, day, active_activity')
      .ilike('code', raw)
      .maybeSingle();
    if (error) fetchFailed = true;
    session = data;
  } catch {
    fetchFailed = true;
  }

  if (!session) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-cream-50 px-8 text-center text-forest-950">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-gold-600">
          UPC Live
        </p>
        <h1 className="mt-5 font-display text-3xl font-medium">
          {fetchFailed ? 'May problema sa koneksyon' : `Hindi mahanap ang session “${raw}”`}
        </h1>
        <p className="mt-3 max-w-xs font-sans text-forest-700">
          {fetchFailed
            ? 'Hindi kami makakonekta ngayon. Subukan muli sa ilang sandali.'
            : 'Pakisuri ang QR code o ang link na binigay ng facilitator, at subukan muli.'}
        </p>
        <a
          href=""
          className="mt-8 flex min-h-14 items-center rounded-full bg-gold-400/15 px-7 font-sans font-bold text-gold-600 ring-1 ring-gold-400/40"
        >
          Subukan muli
        </a>
      </main>
    );
  }

  return <JoinFlow session={session} />;
}
