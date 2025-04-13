import { lazy, Suspense, useEffect } from "react";
import Loading from "../components/ui/Loading";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { navigationConfig } from "../config/navigationConfig";
import { useAuth } from "../hooks/useAuth";
const DashboardWrapper = lazy(
    () => import("../pages/dashboard/DashboardWrapper")
);
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

// Helper function to get clean path without leading/trailing slashes
const cleanPath = (path: string) => path.replace(/^\/|\/$/g, "");

// Debug component to log routes
const RouteLogger = () => {
    const location = useLocation();

    useEffect(() => {
        console.log("Current location:", location);
    }, [location]);

    return null;
};

function AppRoutes() {
    // Extract all view routes with ID parameters
    const viewRoutes = navigationConfig.flatMap((link) =>
        (link.sideBar?.links || []).flatMap((route) =>
            (route.subLinks || [])
                .filter((subLink) => subLink.path.includes(":id"))
                .map((subLink) => {
                    const basePath = cleanPath(route.path);
                    return {
                        path: `${basePath}/${cleanPath(subLink.path)}`,
                        component: subLink.component,
                    };
                })
        )
    );

    return (
        <Suspense fallback={<Loading />}>
            <RouteLogger />
            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    {/* Dashboard wrapper */}
                    <Route path="/" element={<DashboardWrapper />}>
                        {/* Dynamic view routes with ID parameters */}
                        {viewRoutes.map((route, i) => (
                            <Route
                                key={`view-${i}`}
                                path={route.path}
                                element={<route.component />}
                            />
                        ))}

                        {/* Main navigation routes */}
                        {navigationConfig.map((link, i) => (
                            <Route
                                key={`main-${i}`}
                                path={cleanPath(link.path)}
                                element={<link.component />}
                            />
                        ))}

                        {/* Sidebar routes */}
                        {navigationConfig.flatMap((link, i) =>
                            (link.sideBar?.links || [])
                                .filter(
                                    (route) =>
                                        !route.subLinks?.some((subLink) =>
                                            subLink.path.includes(":id")
                                        )
                                )
                                .map((route, j) => {
                                    const routePath = route.path.startsWith("/")
                                        ? cleanPath(route.path)
                                        : `${cleanPath(link.path)}/${cleanPath(
                                              route.path
                                          )}`;

                                    return (
                                        <Route
                                            key={`sidebar-${i}-${j}`}
                                            path={routePath}
                                            element={<route.component />}
                                        />
                                    );
                                })
                        )}
                    </Route>
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
