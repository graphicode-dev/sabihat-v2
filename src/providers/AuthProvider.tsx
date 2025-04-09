import { createContext, useState, ReactNode, useEffect, useRef } from "react";
import axios from "axios";
import { User } from "../types";
import { apiRequest } from "../hooks/useApiRequest";
import {
    formatPhoneForSubmission,
    isAuthenticated,
    removeToken,
    setToken,
} from "../lib/utils";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (phone: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    refreshUserProfile: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticatedState, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const profileFetchedRef = useRef<boolean>(false);

    useEffect(() => {
        const initAuth = async () => {
            if (profileFetchedRef.current) return;

            setIsLoading(true);
            try {
                const isAuth = isAuthenticated();

                setIsAuthenticated(isAuth);

                if (isAuth) {
                    const profileData = await getProfile();

                    if (profileData) {
                        setUser(profileData);
                        profileFetchedRef.current = true;
                    } else {
                        await logout();
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
                setError("Failed to initialize authentication");
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const getProfile = async (): Promise<User | null> => {
        try {
            const response = await apiRequest("/auth/profile", "GET");

            if (response.success) {
                localStorage.setItem("user", JSON.stringify(response.data));
                return response.data;
            }

            return null;
        } catch (error) {
            console.error("Get profile error:", error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                await logout();
            }
            return null;
        }
    };

    const refreshUserProfile = async (): Promise<void> => {
        if (!isAuthenticatedState) return;

        try {
            const profileData = await getProfile();
            if (profileData) {
                setUser(profileData);
            }
        } catch (error) {
            console.error("Profile refresh error:", error);
        }
    };

    const login = async (phone: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true);

            const response = await apiRequest("/auth/login", "POST", {
                phone: formatPhoneForSubmission(phone),
                password,
            });

            if (response.success && response.data.token) {
                setToken(response.data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.result)
                );

                setUser(response.data.result);
                setIsAuthenticated(true);
                profileFetchedRef.current = true;
                return true;
            }

            return false;
        } catch (error: any) {
            setError(error.response?.data?.message);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            const response = await apiRequest("/auth/logout", "POST");
            if (response.success) {
                removeToken();
                localStorage.removeItem("user");
                setUser(null);
                setIsAuthenticated(false);
                profileFetchedRef.current = false;
            }
        } catch (error) {
            console.error("Logout error:", error);
            removeToken();
            localStorage.removeItem("user");
            setUser(null);
            setIsAuthenticated(false);
            profileFetchedRef.current = false;
        }
    };

    const value = {
        user,
        isAuthenticated: isAuthenticatedState,
        login,
        logout,
        refreshUserProfile,
        isLoading,
        error,
        setError,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export { AuthContext };
