import axios from "axios";
import { getToken, removeToken } from "../utils";
// Function to handle token removal and store reset
let isAlreadyFetchingAccessToken = false;
// Define a proper type for subscribers
type SubscriberCallback = () => void;
let subscribers: SubscriberCallback[] = [];

// Correct baseURL: use "/api" in dev to trigger Vite proxy
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
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
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an invalid/expired token (401 Unauthorized)
        if (
            (error.response?.status === 401 && !originalRequest._retry) ||
            error.response.data?.message === "Unauthenticated."
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

export default api;
