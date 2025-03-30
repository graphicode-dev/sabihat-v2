import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { DashboardWrapper } from "./pages/dashboard/DashboardWrapper";
import DashboardHome from "./pages/dashboard/DashboardHome";
import { useAuth } from "./hooks/useAuth";
import Loading from "./components/ui/Loading";
import NotFound from "./pages/NotFound";
import Providers from "./providers";

// Component to handle root path redirection
const RootRedirect = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loading />;
    }

    // Redirect based on authentication status
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

function App() {
    return (
        <Providers>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardWrapper />}>
                            <Route index element={<DashboardHome />} />
                        </Route>
                    </Route>

                    {/* Root path - redirect based on auth status */}
                    <Route path="/" element={<RootRedirect />} />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </Providers>
    );
}

export default App;
