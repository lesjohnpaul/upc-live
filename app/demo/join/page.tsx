import JoinFlow from '@/components/join/JoinFlow';
import { DEMO_SESSION_ID } from '@/lib/demo/mockSupabase';

export const metadata = { title: 'Join Demo — UPC Live' };

// JoinFlow talks to the mock client (getSupabase routes `/demo` to the seeded
// in-memory store). The session object here matches the seeded DEMO session, so
// joining, answering, and live active-activity sync all work with no database.
const demoSession = {
  id: DEMO_SESSION_ID,
  code: 'DEMO',
  day: 1,
  active_activity: 'demo-poll',
};

export default function DemoJoinPage() {
  return <JoinFlow session={demoSession} />;
}
