import Cookies from "js-cookie";

const AUTH_COOKIE_NAME =
    import.meta.env.VITE_AUTH_COOKIE_NAME || "sabihat_auth_token";
const AUTH_COOKIE_EXPIRES_DAYS = parseInt(
    import.meta.env.VITE_AUTH_COOKIE_EXPIRES_DAYS || "7",
    10
);

export async function handleFormSubmitHelper(
    schema: any,
    data: any,
    queryFn: any,
    addToast: any,
    toastMessage: string,
    toastType: "success" | "error" | "warning" | "info",
    toastTitle: string,
    goBack: () => void,
    setFormErrors: any,
    extraData?: any
) {
    const validatedData = schema.parse(data);
    await queryFn(
        {
            ...validatedData,
            ...extraData,
        },
        {
            onSuccess: () => {
                addToast({
                    message: toastMessage,
                    type: toastType,
                    title: toastTitle,
                });
                setFormErrors({});
                if (toastType === "success") {
                    goBack();
                }
            },
            onError: (error: any) => {
                if (error?.data?.errors) {
                    const formattedErrors = Object.entries(
                        error.data.errors
                    ).reduce((acc, [key, value]) => {
                        acc[key as keyof typeof data] = {
                            message: value as string,
                        };
                        return acc;
                    }, {} as Partial<Record<keyof typeof data, { message?: string }>>);
                    setFormErrors(formattedErrors);
                } else {
                    addToast({
                        message:
                            "An unexpected error occurred. Please try again.",
                        type: "error",
                        title: "Error!",
                    });
                }
            },
        }
    );
}

export const formatPhoneForSubmission = (phoneNumber: string) => {
    return phoneNumber.startsWith("20") ? phoneNumber : `20${phoneNumber}`;
};

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getToken = () => Cookies.get(AUTH_COOKIE_NAME);
export const isAuthenticated = () => Boolean(Cookies.get(AUTH_COOKIE_NAME));
export const removeToken = () => Cookies.remove(AUTH_COOKIE_NAME);
export const setToken = (token: string) =>
    Cookies.set(AUTH_COOKIE_NAME, token, {
        expires: AUTH_COOKIE_EXPIRES_DAYS,
        secure: import.meta.env.PROD,
        sameSite: "strict",
    });
