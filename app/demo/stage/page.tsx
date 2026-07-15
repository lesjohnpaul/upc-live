import StageDeck from '@/components/stage/StageDeck';
import { demoModule } from '@/content/demo';

export const metadata = { title: 'Stage Demo — UPC Live' };

// The stage reads live data by session code via the mock client (getSupabase
// routes `/demo` paths to the in-memory store), so results render against the
// seeded DEMO session — never the real seminar.
export default function DemoStagePage() {
  return <StageDeck code="DEMO" modules={[demoModule]} />;
}
