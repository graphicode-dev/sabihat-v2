import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { DashboardWrapper } from "./pages/dashboard/DashboardWrapper";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { useAuth } from "./context/useAuth";

// Component to handle root path redirection
const RootRedirect = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    // Redirect based on authentication status
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

function App() {
    return (
        <AuthProvider>
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

                    {/* Catch all - redirect to root for proper handling */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
