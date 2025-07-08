import { useForm } from "react-hook-form";
import AuthCard from "../../components/auth/AuthCard";
import AuthLayout from "../../layout/AuthLayout";
import FormFieldsLayout from "../../layout/FormFieldsLayout";
import FormLayout from "../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
    AuthState,
    resetPassword,
    selectError,
    selectForgetPasswordStep,
    selectIsAuthenticated,
    selectLoading,
    selectResetPhoneNumber,
    sendVerificationCode,
    setError,
    verifyVerificationCode,
} from "../../store/slices/auth/authSlice";
import { FormInput } from "../../components/form";
import axios from "axios";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { Toast } from "../../types";

type CommonComponentsProps = {
    dispatch: ThunkDispatch<
        {
            auth: AuthState;
        },
        undefined,
        UnknownAction
    > &
        Dispatch<UnknownAction>;
    addToast: (toast: Omit<Toast, "id">) => string;
    error: string | null;
    isLoading: boolean;
};

type SendCodeFormFields = {
    phone: string;
};
const sendCodeSchema = z.object({
    phone: z.string(),
});

type VerifyCodeFormFields = {
    code: string;
};
const verifyCodeSchema = z.object({
    code: z.string(),
});

type ResetPasswordFormFields = {
    password: string;
    confirmPassword: string;
};
const resetPasswordSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
});

const SendCode = ({
    dispatch,
    addToast,
    error,
    isLoading,
}: CommonComponentsProps) => {
    const { control, handleSubmit, reset } = useForm<SendCodeFormFields>({
        resolver: zodResolver(sendCodeSchema),
        defaultValues: {
            phone: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: SendCodeFormFields) => {
        dispatch(setError(""));

        try {
            const response = await dispatch(
                sendVerificationCode({ phone: data.phone })
            );
            if (response.meta.requestStatus === "fulfilled") {
                addToast({
                    message: "Code sent successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMessage = err.response.data?.message;
                dispatch(setError(errorMessage));
            }
            console.error(err);
        }
    };

    return (
        <AuthCard
            title="Forget Password"
            subtitle={
                <>
                    Please enter your <span className="text-black">Phone</span>{" "}
                    — so we can send you the OTP code!
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
                    {/* Phone */}
                    <FormInput
                        formFieldWrapperParentClassName="p-0! mb-7"
                        name="phone"
                        control={control}
                        label="Phone"
                        type="tel"
                        placeholder="Enter Phone"
                    />

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
                    Confirm
                </button>
            </FormLayout>
        </AuthCard>
    );
};

const VerifyCode = ({
    dispatch,
    addToast,
    error,
    isLoading,
}: CommonComponentsProps) => {
    const resetPhoneNumber = useAppSelector(selectResetPhoneNumber);
    const { control, handleSubmit, reset, formState } =
        useForm<VerifyCodeFormFields>({
            resolver: zodResolver(verifyCodeSchema),
            defaultValues: {
                code: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (data: VerifyCodeFormFields) => {
        dispatch(setError(""));

        try {
            const response = await dispatch(
                verifyVerificationCode({ code: data.code })
            );
            if (response.meta.requestStatus === "fulfilled") {
                addToast({
                    message: "Code verified successfully",
                    type: "success",
                    title: "Success!",
                });
                const validatedData = verifyCodeSchema.parse(data);

                console.log("Code:", validatedData.code);

                reset();
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMessage = err.response.data?.message;
                dispatch(setError(errorMessage));
            }
            console.error(err);
        }
    };

    return (
        <AuthCard
            title="Verification code"
            subtitle={
                <>
                    We’ve sent an OTP to your{" "}
                    <span className="text-black">+{resetPhoneNumber}</span> .
                    Please enter it to verify
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
                    {/* Code */}
                    <FormInput
                        formFieldWrapperParentClassName="p-0! mb-7"
                        name="code"
                        control={control}
                        type="otp"
                    />

                    {error && (
                        <span className="form-error text-center mb-5">
                            *{error}
                        </span>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 rounded-3xl text-white mb-4 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-600 disabled:cursor-not-allowed"
                        disabled={isLoading || !formState.isDirty}
                    >
                        Confirm
                    </button>
                </FormFieldsLayout>
            </FormLayout>
        </AuthCard>
    );
};

const ResetPassword = ({
    dispatch,
    addToast,
    error,
    isLoading,
}: CommonComponentsProps) => {
    const { control, handleSubmit, reset } = useForm<ResetPasswordFormFields>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: ResetPasswordFormFields) => {
        dispatch(setError(""));

        try {
            if (data.password !== data.confirmPassword) {
                dispatch(setError("Passwords doesn't match"));
                return;
            }
            const response = await dispatch(
                resetPassword({ password: data.password })
            );
            if (response.meta.requestStatus === "fulfilled") {
                addToast({
                    message: "Password reset successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const errorMessage = err.response.data?.message;
                dispatch(setError(errorMessage));
            }
            console.error(err);
        }
    };

    return (
        <AuthCard
            title="reset password"
            subtitle={
                <>
                    This step allows you to create a{" "}
                    <span className="text-black capitalize">new password</span>.
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
                    {/* Password */}
                    <FormInput
                        formFieldWrapperParentClassName="p-0! mb-7"
                        name="password"
                        control={control}
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        required
                    />

                    {/* Confirm Password */}
                    <FormInput
                        formFieldWrapperParentClassName="p-0! mb-7"
                        name="confirmPassword"
                        control={control}
                        label="Confirm Password"
                        type="password"
                        placeholder="Enter Confirm Password"
                        required
                    />

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
                    Confirm
                </button>
            </FormLayout>
        </AuthCard>
    );
};

function ForgetPasswordPage() {
    const { addToast } = useToast();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectError);
    const navigate = useNavigate();
    const step = useAppSelector(selectForgetPasswordStep);
    const isLoading = useAppSelector(selectLoading);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Redirect to dashboard if already authenticated with a smooth transition
    useEffect(() => {
        if (isAuthenticated && !isLoading && !isRedirecting) {
            setIsRedirecting(true);
            // Short delay to allow for a smoother transition
            setTimeout(() => {
                navigate("/");
            }, 10);
        }
    }, [isAuthenticated, isLoading, navigate, isRedirecting]);

    // Apply fade-out effect when redirecting
    const pageStyle = {
        opacity: isRedirecting ? 0 : 1,
        transition: 'opacity 0.1s ease-out'
    };

    const forgotPasswordSteps = () => {
        switch (step) {
            case "send-code":
                return (
                    <SendCode
                        addToast={addToast}
                        dispatch={dispatch}
                        error={error}
                        isLoading={isLoading}
                    />
                );

            case "verify-code":
                return (
                    <VerifyCode
                        addToast={addToast}
                        dispatch={dispatch}
                        error={error}
                        isLoading={isLoading}
                    />
                );

            case "reset-password":
                return (
                    <ResetPassword
                        addToast={addToast}
                        dispatch={dispatch}
                        error={error}
                        isLoading={isLoading}
                    />
                );
        }
    };

    return (
        <div style={pageStyle}>
            <AuthLayout>{forgotPasswordSteps()}</AuthLayout>
        </div>
    );
}

export default ForgetPasswordPage;
