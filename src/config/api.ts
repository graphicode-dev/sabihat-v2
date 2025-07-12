import axios, {
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
} from "axios";
import { getToken, removeToken, USER_KEY } from "../utils";

// Correct baseURL: use "/api" in dev to trigger Vite proxy
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Function to handle token removal and store reset
let isAlreadyFetchingAccessToken = false;
// Define a proper type for subscribers
type SubscriberCallback = () => void;
let subscribers: SubscriberCallback[] = [];

// Define response structure for consistent error handling
export interface ApiResponseWrapper<T = any> {
    data: T | null;
    error: {
        message: string;
        status?: number;
        details?: any;
    } | null;
}

const logout = () => {
    localStorage.removeItem(USER_KEY);
    removeToken();
    window.location.href = "/login";
};

// Create the axios instance
const axiosInstance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;

    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"]; // Browser sets it
    }

    config.headers["X-Request-ID"] = `${config.method}-${
        config.url
    }-${Date.now()}`;

    return config;
});

// Add response interceptor to handle token-related errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Add custom _retry property to the config type
        interface ExtendedRequestConfig extends InternalAxiosRequestConfig {
            _retry?: boolean;
        }

        const extendedRequest = originalRequest as
            | ExtendedRequestConfig
            | undefined;

        // If the error is due to an invalid/expired token (401 Unauthorized)
        if (
            (error.response?.status === 401 &&
                extendedRequest &&
                !extendedRequest._retry) ||
            (error.response?.data &&
                typeof error.response.data === "object" &&
                "message" in error.response.data &&
                (error.response.data.message === "Unauthenticated." ||
                    error.response.data.message === "Unauthorized."))
        ) {
            // Only handle the token error once to prevent infinite loops
            if (!isAlreadyFetchingAccessToken) {
                isAlreadyFetchingAccessToken = true;

                // Clear the token
                removeToken();

                // Set auth state in localStorage to trigger logout
                localStorage.setItem("barber-auth", "logged_out");

                // Reset the flag after a delay
                setTimeout(() => {
                    isAlreadyFetchingAccessToken = false;
                    subscribers = [];

                    // Redirect to login page
                    window.location.href = "/login";
                }, 1000);
            }
        }

        return Promise.reject(error);
    }
);

// Wrapper functions with better error handling
const api = {
    async get<T>(url: string, config = {}): Promise<ApiResponseWrapper<T>> {
        try {
            const response: AxiosResponse<T> = await axiosInstance.get(
                url,
                config
            );
            return { data: response.data, error: null };
        } catch (error: any) {
            console.error(`GET ${url} error:`, error);
            return handleApiError<T>(error);
        }
    },

    async post<T>(
        url: string,
        data = {},
        config = {}
    ): Promise<ApiResponseWrapper<T>> {
        try {
            const response: AxiosResponse<T> = await axiosInstance.post(
                url,
                data,
                config
            );
            return { data: response.data, error: null };
        } catch (error: any) {
            console.error(`POST ${url} error:`, error);
            return handleApiError<T>(error);
        }
    },

    async put<T>(
        url: string,
        data = {},
        config = {}
    ): Promise<ApiResponseWrapper<T>> {
        try {
            const response: AxiosResponse<T> = await axiosInstance.put(
                url,
                data,
                config
            );
            return { data: response.data, error: null };
        } catch (error: any) {
            console.error(`PUT ${url} error:`, error);
            return handleApiError<T>(error);
        }
    },

    async delete<T>(url: string, config = {}): Promise<ApiResponseWrapper<T>> {
        try {
            const response: AxiosResponse<T> = await axiosInstance.delete(
                url,
                config
            );
            return { data: response.data, error: null };
        } catch (error: any) {
            console.error(`DELETE ${url} error:`, error);
            return handleApiError<T>(error);
        }
    },

    // Expose the axios instance for advanced use cases
    axiosInstance,
};

// Helper function to handle API errors consistently
function handleApiError<T>(error: any): ApiResponseWrapper<T> {
    if (error.response) {
        // The request was made and the server responded with an error status
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);

        if (error.response.data?.message === "Unauthorized") {
            window.location.href = "/dashboard/unauthorized";
        }

        if (
            error.response.data?.message === "Unauthenticated." ||
            error.response.data?.message === "Your account is not active"
        ) {
            logout();
        }

        return {
            data: null,
            error: {
                message: error.response.data?.message || "Request failed",
                status: error.response.status,
                details: error.response.data,
            },
        };
    } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        return {
            data: null,
            error: {
                message: "No response received from server",
                details: error.request,
            },
        };
    } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
        return {
            data: null,
            error: {
                message: error.message || "An unexpected error occurred",
            },
        };
    }
}

export default api;
