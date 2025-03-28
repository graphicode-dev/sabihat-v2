import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export const DashboardWrapper = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
