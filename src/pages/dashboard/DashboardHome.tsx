import PageLayout from '../../components/layout/PageLayout';
import { useAuth } from '../../context/useAuth';

export const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <PageLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome back, {user?.name}!</h2>
        <p className="text-gray-600">
          This is your dashboard home page. You can add widgets, statistics, and other important information here.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[var(--color-green-50)] p-6 rounded-lg shadow">
            <h3 className="font-bold text-[var(--color-green-700)]">Analytics</h3>
            <p className="mt-2 text-[var(--color-green-800)]">View your analytics and performance metrics</p>
          </div>
          
          <div className="bg-[var(--color-primary-50)] p-6 rounded-lg shadow">
            <h3 className="font-bold text-[var(--color-primary-700)]">Reports</h3>
            <p className="mt-2 text-[var(--color-primary-800)]">Access your latest reports and data</p>
          </div>
          
          <div className="bg-[var(--color-blue-50)] p-6 rounded-lg shadow">
            <h3 className="font-bold text-[var(--color-blue-700)]">Settings</h3>
            <p className="mt-2 text-[var(--color-blue-800)]">Configure your dashboard preferences</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
