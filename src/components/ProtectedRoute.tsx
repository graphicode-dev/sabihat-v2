import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Loading from './ui/Loading';

interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute = ({ 
  redirectPath = '/login'
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading indicator while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
