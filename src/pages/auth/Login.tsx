import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/ui/Loading";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    login,
    selectError,
    selectIsAuthenticated,
    selectLoading,
    setError,
} from "../../store/slices/auth/authSlice";
import { formatPhone } from "../../lib/utils";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "react-phone-input-2";

const Login = () => {
    const [phone, setPhone] = useState("20");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectLoading);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const error = useAppSelector(selectError);

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            navigate("/");
        }
    }, [isAuthenticated, isLoading, navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(setError(""));

        try {
            const response = await dispatch(
                login({ phone: formatPhone(phone), password })
            );
            if (response.meta.requestStatus === "fulfilled") {
                navigate("/");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMessage = err.response.data?.message;
                dispatch(setError(errorMessage));
            }
            console.error(err);
        }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Show loading spinner while checking authentication
    if (isLoading) {
        return <Loading />;
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
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
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
                            <PhoneInput
                                country={"eg"}
                                enableSearch={true}
                                value={phone}
                                onChange={(phoneValue) => {
                                    setPhone(phoneValue);
                                }}
                                inputClass="w-full! rounded-md! pl-12! px-3! py-2! focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
                                buttonClass="focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
                                dropdownClass="border border-primary-500!"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Enter your number without country code
                        </p>
                    </div>

                    <div className="relative mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-primary-500 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-300"
                            required
                        />
                        <button
                            type="button"
                            onClick={handleShowPassword}
                            className="absolute right-3 transform translate-y-1/2"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-500" />
                            ) : (
                                <Eye className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
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

export default Login;
