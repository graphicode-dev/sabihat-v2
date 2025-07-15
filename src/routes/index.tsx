import { lazy, Suspense, useState, useEffect } from "react";
import Loading from "../components/ui/Loading";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { buildDynamicNavigation } from "../config/navigationConfig";
import { TabLink } from "../types";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { useAppSelector } from "../store/hooks";
import {
    selectIsAuthenticated,
    selectLoading,
} from "../store/slices/auth/authSlice";
import CalendarDemo from "../components/ui/Calendar/CalendarDemo";

// Import custom components for direct routes
const LoadTypeViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/view"
        )
);
const LoadTypeEditPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/edit"
        )
);
const LoadTypeAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/load-types/add"
        )
);

const CurrencyRateViewPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/view/rate/view"
        )
);
const CurrencyRateAddPage = lazy(
    () =>
        import(
            "../pages/dashboard/system-management-administration/currency/view/rate/add"
        )
);
const DashboardWrapper = lazy(
    () => import("../pages/dashboard/DashboardWrapper")
);
const Login = lazy(() => import("../pages/auth/Login"));
const ForgetPasswordPage = lazy(() => import("../pages/auth/forget-password"));
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
//         console.log("Current location:", JSON.stringify(location, null, 2));
//     }, [location]);

//     return null;
// };

function AppRoutes() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [navigationConfig, setNavigationConfig] = useState<TabLink[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleNavigation = async () => {
            if (!isAuthenticated) {
                // Set loading to false and navigate to login
                setLoading(false);
                navigate("/login");
                return;
            }

            try {
                const navConfig = await buildDynamicNavigation();
                setNavigationConfig(navConfig);
            } catch (error) {
                console.error("Failed to load navigation:", error);
            } finally {
                setLoading(false);
            }
        };

        handleNavigation();
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <Loading />;
    }

    // Extract all view routes with ID parameters
    const viewRoutes = Array.isArray(navigationConfig)
        ? navigationConfig.flatMap((link) =>
              (link.sideBar?.links || []).flatMap((route) =>
                  (route.subLinks || [])
                      .filter((subLink) => subLink.path.includes(":id"))
                      .map((subLink) => {
                          // Get the base path without parent prefix
                          const basePath = cleanPath(
                              route.path.startsWith("/")
                                  ? route.path
                                  : route.path
                          );
                          return {
                              path: `${basePath}/${cleanPath(subLink.path)}`,
                              component: subLink.component,
                          };
                      })
              )
          )
        : [];

    // Extract all other sublinks (non-ID routes like edit pages)
    const otherSubRoutes = Array.isArray(navigationConfig)
        ? navigationConfig.flatMap((link) =>
              (link.sideBar?.links || []).flatMap((route) =>
                  (route.subLinks || [])
                      .filter((subLink) => !subLink.path.includes(":id"))
                      .map((subLink) => {
                          // Get the base path without parent prefix
                          const basePath = cleanPath(
                              route.path.startsWith("/")
                                  ? route.path
                                  : route.path
                          );
                          return {
                              path: `${basePath}/${cleanPath(subLink.path)}`,
                              component: subLink.component,
                          };
                      })
              )
          )
        : [];

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
                <Route
                    path="/forget-password"
                    element={<ForgetPasswordPage />}
                />

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

                        {/* Other sublinks like edit pages */}
                        {otherSubRoutes.map((route, i) => (
                            <Route
                                key={`other-${i}`}
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

                        {/* Custom routes for specific components */}
                        <Route
                            path="system-management-administration/currency/view/:id/view_rate/:rowId"
                            element={<CurrencyRateViewPage />}
                        />
                        <Route
                            path="system-management-administration/currency/view/:id/add_rate"
                            element={<CurrencyRateAddPage />}
                        />
                        <Route
                            path={`system-management-administration/load-types/:name/view/:id`}
                            element={<LoadTypeViewPage />}
                        />
                        <Route
                            path={`system-management-administration/load-types/:name/edit/:id`}
                            element={<LoadTypeEditPage />}
                        />
                        <Route
                            path={`system-management-administration/load-types/:name/add`}
                            element={<LoadTypeAddPage />}
                        />
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
