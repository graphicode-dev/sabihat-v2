import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/ui/Loading";
import { useAppSelector } from "../store/hooks";
import {
    selectIsAuthenticated,
    selectLoading,
} from "../store/slices/auth/authSlice";

interface ProtectedRouteProps {
    redirectPath?: string;
}

export const ProtectedRoute = ({
    redirectPath = "/login",
}: ProtectedRouteProps) => {
    const isLoading = useAppSelector(selectLoading);
    const isAuth = useAppSelector(selectIsAuthenticated);

    // Only show loading indicator during initial authentication check
    // Don't show loading for navigation between protected routes
    if (isLoading && !isAuth) {
        return <Loading />;
    }

    if (!isAuth) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
