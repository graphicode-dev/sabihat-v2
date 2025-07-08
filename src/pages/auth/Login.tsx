import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import AuthLayout from "../../layout/AuthLayout";
import AuthCard from "../../components/auth/AuthCard";
import FormLayout from "../../layout/FormLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../hooks/useToast";
import FormFieldsLayout from "../../layout/FormFieldsLayout";
import { FormInput } from "../../components/form";

type LoginCredentials = {
    phone: string;
    password: string;
};

const loginSchema = z.object({
    phone: z.string(),
    password: z.string(),
});

const Login = () => {
    const { addToast } = useToast();
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

    const { control, handleSubmit, reset } = useForm<LoginCredentials>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: LoginCredentials) => {
        dispatch(setError(""));

        try {
            const response = await dispatch(
                login({ phone: data.phone, password: data.password })
            );
            if (response.meta.requestStatus === "fulfilled") {
                addToast({
                    message: "Login successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
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

    // Show loading spinner while checking authentication
    if (isLoading) return <Loading />;

    // Don't render login form if already authenticated (will redirect via useEffect)
    if (isAuthenticated) return null;

    return (
        <AuthLayout>
            <AuthCard
                title="welcome back!"
                subtitle={
                    <>
                        Great to see you again —{" "}
                        <span className="text-black">log in</span> to continue.
                    </>
                }
            >
                <FormLayout
                    handleSubmit={handleSubmit}
                    handleFormSubmit={onSubmit}
                    removeBorder
                    noPadding
                >
                    <FormFieldsLayout cols="1" className="p-0! gap-0!">
                        {/* Name */}
                        <FormInput
                            formFieldWrapperParentClassName="p-0! mb-7"
                            name="phone"
                            control={control}
                            label="Phone"
                            type="tel"
                            placeholder="Enter Phone"
                        />

                        {/* Password */}
                        <FormInput
                            formFieldWrapperParentClassName="p-0! mb-3"
                            name="password"
                            control={control}
                            label="Password"
                            type="password"
                        />

                        <span className="text-right text-sm text-dark-100 hover:text-dark-300 transition-colors duration-300 ease-in-out">
                            <Link to="/forget-password">Forgot Password?</Link>
                        </span>

                        {error && (
                            <span className="form-error text-center mb-5">
                                *{error}
                            </span>
                        )}
                    </FormFieldsLayout>

                    <button
                        type="submit"
                        className="w-full rounded-3xl bg-primary-500 py-2 text-white mt-7"
                        disabled={isLoading}
                    >
                        Login
                    </button>
                </FormLayout>
            </AuthCard>
        </AuthLayout>
    );
};

export default Login;
