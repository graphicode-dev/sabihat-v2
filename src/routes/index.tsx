import { lazy, Suspense } from "react";
import Loading from "../components/ui/Loading";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { navigationConfig } from "../config/navigationConfig";
import { useAuth } from "../hooks/useAuth";
const DashboardWrapper = lazy(
    () => import("../pages/dashboard/DashboardWrapper")
);
const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const Login = lazy(() => import("../pages/auth/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Component to handle root path redirection
const RootRedirect = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loading />;
    }

    // Redirect based on authentication status
    return <Navigate to={isAuthenticated ? "/" : "/login"} replace />;
};

function AppRoutes() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<DashboardWrapper />}>
                        <Route index element={<DashboardHome />} />
                    </Route>

                    {navigationConfig.map((link, i) => (
                        <Route
                            key={i}
                            path={link.path}
                            element={<DashboardWrapper />}
                        >
                            <Route index element={<link.component />} />
                            {link.sideBar?.links?.map((route, j) => (
                                <Route
                                    key={j}
                                    path={route.path}
                                    element={<route.component />}
                                />
                            ))}
                        </Route>
                    ))}
                </Route>

                {/* Root path - redirect based on auth status */}
                <Route path="/" element={<RootRedirect />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
