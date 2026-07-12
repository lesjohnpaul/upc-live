import { cookies } from 'next/headers';
import Dashboard from '@/components/dashboard/Dashboard';
import DashboardGate from '@/components/dashboard/DashboardGate';
import { expectedCookie } from '@/lib/dashboardAuth';

export const metadata = { title: 'Dashboard — UPC Live' };

export default async function DashboardPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const upper = code.toUpperCase();

  const expected = expectedCookie();
  if (expected === null) {
    // Fail closed — never fall through to an open dashboard.
    return (
      <main className="flex min-h-svh flex-col items-center justify-center bg-cream-50 px-8 text-center text-forest-950">
        <h1 className="font-display text-3xl font-medium">Dashboard password not configured</h1>
        <p className="mt-3 max-w-md font-sans text-forest-700">
          Set the <span className="font-mono">DASHBOARD_PASSWORDS</span> environment variable, then
          restart the server to enable facilitator access.
        </p>
      </main>
    );
  }

  const cookie = (await cookies()).get('upc-dash')?.value;
  if (cookie === expected) return <Dashboard code={upper} />;
  return <DashboardGate code={upper} />;
}
