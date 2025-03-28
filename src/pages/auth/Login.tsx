import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import axios from "axios";

export const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, authLoading, navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const success = await login(phone, password);
            if (success) {
                navigate("/dashboard");
            } else {
                setError("Invalid phone number or password");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Handle specific API error messages
                const errorMessage =
                    err.response.data?.message ||
                    "An error occurred during login";
                setError(errorMessage);
            } else {
                setError("An error occurred during login");
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading spinner while checking authentication
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    // Don't render login form if already authenticated (will redirect via useEffect)
    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-primary-500">
                    Login
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-primary-100 text-primary-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-primary-500 mb-1"
                        >
                            Phone Number
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-gray-500">+20</span>
                            </div>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    // Remove any non-digit characters
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );
                                    setPhone(value);
                                }}
                                className="w-full pl-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
                                placeholder="1012345678"
                                required
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Enter your number without country code
                        </p>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-primary-500 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-300)]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};
