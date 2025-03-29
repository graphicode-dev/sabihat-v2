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
import  DashboardHome  from "./pages/dashboard/DashboardHome";
import { useAuth } from "./context/useAuth";
import Loading from "./components/ui/Loading";

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
