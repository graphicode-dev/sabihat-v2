import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/ui/Loading";

interface ProtectedRouteProps {
    redirectPath?: string;
}

export const ProtectedRoute = ({
    redirectPath = "/login",
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
