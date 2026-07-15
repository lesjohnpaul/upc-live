import Dashboard from '@/components/dashboard/Dashboard';

export const metadata = { title: 'Dashboard Demo — UPC Live' };

// No password gate in the demo: the dashboard drives the seeded DEMO session
// through the mock client. The real /dashboard/[code] routes keep their
// server-side password gate untouched.
export default function DemoDashboardPage() {
  return <Dashboard code="DEMO" />;
}
