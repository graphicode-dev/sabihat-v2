import { lazy, Suspense } from "react";
import Loading from "../components/ui/Loading";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { navigationConfig } from "../config/navigationConfig";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { useAppSelector } from "../store/hooks";
import {
    selectIsAuthenticated,
    selectLoading,
} from "../store/slices/auth/authSlice";
import CalendarDemo from "../components/ui/Calendar/CalendarDemo";
const DashboardWrapper = lazy(
    () => import("../pages/dashboard/DashboardWrapper")
);
const Login = lazy(() => import("../pages/auth/Login"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Component to handle root path redirection
const RootRedirect = () => {
    const isLoading = useAppSelector(selectLoading);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
// const RouteLogger = () => {
//     const location = useLocation();

//     useEffect(() => {
//         console.log("Current location:", location);
//     }, [location]);

//     return null;
// };

function AppRoutes() {
    // Extract all view routes with ID parameters
    const viewRoutes = navigationConfig.flatMap((link) =>
        (link.sideBar?.links || []).flatMap((route) =>
            (route.subLinks || [])
                .filter((subLink) => subLink.path.includes(":id"))
                .map((subLink) => {
                    // Get the base path without parent prefix
                    const basePath = cleanPath(
                        route.path.startsWith("/") ? route.path : route.path
                    );
                    return {
                        path: `${basePath}/${cleanPath(subLink.path)}`,
                        component: subLink.component,
                    };
                })
        )
    );

    // Create redirects from main paths to first sidebar item
    const mainPathRedirects = navigationConfig
        .map((link) => {
            const firstSidebarLink = link.sideBar?.links?.[0];
            if (firstSidebarLink) {
                // Remove any leading slashes from the sidebar path
                const sidebarPath = firstSidebarLink.path.replace(/^\/+/, "");

                return {
                    path: cleanPath(link.path),
                    // Use the direct path without any prefixing
                    redirectTo: sidebarPath,
                };
            }
            return null;
        })
        .filter(Boolean) as Array<{ path: string; redirectTo: string }>;

    return (
        <Suspense fallback={<Loading />}>
            {/* <RouteLogger /> */}
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

                        {/* Main navigation routes - redirects to first sidebar item */}
                        {mainPathRedirects.map((redirect, i) => (
                            <Route
                                key={`main-redirect-${i}`}
                                path={redirect.path}
                                element={
                                    <Navigate
                                        to={`/${redirect.redirectTo}`}
                                        replace
                                    />
                                }
                            />
                        ))}

                        {/* Sidebar routes - Updated to handle direct paths */}
                        {navigationConfig.flatMap(
                            (link, i) =>
                                (link.sideBar?.links || [])
                                    .map((route, j) => {
                                        // Skip routes that are already handled by main navigation
                                        if (route.path === link.path) {
                                            return null;
                                        }

                                        // Get the clean path for this route - no longer prefixing with parent path
                                        const routePath = cleanPath(route.path);

                                        return (
                                            <Route
                                                key={`sidebar-${i}-${j}`}
                                                path={routePath}
                                                element={<route.component />}
                                            />
                                        );
                                    })
                                    .filter(Boolean) // Remove null entries
                        )}
                    </Route>
                </Route>

                {/* Root path - redirect based on auth status */}
                <Route path="/" element={<RootRedirect />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />

                {/* Unauthorized Page */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />

                {/* Test Route */}
                <Route path="/test" element={<CalendarDemo />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
