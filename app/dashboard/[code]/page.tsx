import Dashboard from '@/components/dashboard/Dashboard';

export const metadata = { title: 'Dashboard — UPC Live' };

export default async function DashboardPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <Dashboard code={code.toUpperCase()} />;
}
