import axios from "axios";
import { getToken, removeToken } from "../lib/utils";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle unauthorized errors (401)
        if (
            error.response &&
            (error.response.status === 401 ||
                error.response.data?.message === "Unauthenticated.")
        ) {
            // Clear auth data and redirect
            localStorage.removeItem("user");
            removeToken();

            // Redirect to login page if not already there
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export async function apiRequest(
    endpoint: string,
    method: RequestMethod = "GET",
    body: Record<string, any> | FormData | null = null,
    headers: Record<string, string> = {}
) {
    try {
        // Construct headers
        const customHeaders: Record<string, string> = {
            ...headers,
        };

        // Only add Content-Type if not FormData
        if (!(body instanceof FormData) && !customHeaders["Content-Type"]) {
            customHeaders["Content-Type"] = "application/json";
        }

        // Axios request
        const response = await api({
            method,
            url: endpoint,
            ...(method !== "GET" && body && { data: body }),
            headers: customHeaders,
        });

        return response.data;
    } catch (error: any) {
        const isDevelopment = import.meta.env.DEV;
        if (isDevelopment) {
            console.error("API Request error:", error);

            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error message:", error.message);
            }
        }

        if (error.response) {
            // Return the error response for better error handling
            return {
                success: false,
                message: error.response.data?.message || "Request failed",
                error: error.response.data || error.response,
                status: error.response.status,
            };
        } else if (error.request) {
            throw new Error("No response received from server");
        } else {
            throw new Error(error.message || "An unexpected error occurred");
        }
    }
}

export default api;
