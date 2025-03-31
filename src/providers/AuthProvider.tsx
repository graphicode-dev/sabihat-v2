/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, ReactNode, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import api from "../services/api";
import { User, LoginResponse, ProfileResponse } from "../types";

const AUTH_COOKIE_NAME =
    import.meta.env.VITE_AUTH_COOKIE_NAME || "sabihat_auth_token";
const AUTH_COOKIE_EXPIRES_DAYS = parseInt(
    import.meta.env.VITE_AUTH_COOKIE_EXPIRES_DAYS || "7",
    10
);

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (phone: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    refreshUserProfile: () => Promise<void>;
    isLoading: boolean;
    getToken: () => string | undefined;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const profileFetchedRef = useRef<boolean>(false);

    const checkIsAuthenticated = (): boolean => {
        return !!Cookies.get(AUTH_COOKIE_NAME);
    };

    const getToken = (): string | undefined => {
        return Cookies.get(AUTH_COOKIE_NAME);
    };

    useEffect(() => {
        const initAuth = async () => {
            if (profileFetchedRef.current) return;

            setIsLoading(true);
            try {
                const isAuth = checkIsAuthenticated();
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
            const response = await api.get<ProfileResponse>("/auth/profile");

            if (response.data.success) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data)
                );
                return response.data.data;
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
        if (!isAuthenticated) return;

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

            const formattedPhone = phone.startsWith("20")
                ? phone
                : `20${phone}`;

            const response = await api.post<LoginResponse>("/auth/login", {
                phone: formattedPhone,
                password,
            });

            if (response.data.success && response.data.data.token) {
                Cookies.set(AUTH_COOKIE_NAME, response.data.data.token, {
                    expires: AUTH_COOKIE_EXPIRES_DAYS,
                    secure: import.meta.env.PROD,
                    sameSite: "strict",
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.data.result)
                );

                setUser(response.data.data.result);
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
            const response = await api.post("/auth/logout");
            if (response.data.success) {
                Cookies.remove(AUTH_COOKIE_NAME);
                localStorage.removeItem("user");
                setUser(null);
                setIsAuthenticated(false);
                profileFetchedRef.current = false;
            }
        } catch (error) {
            console.error("Logout error:", error);
            Cookies.remove(AUTH_COOKIE_NAME);
            localStorage.removeItem("user");
            setUser(null);
            setIsAuthenticated(false);
            profileFetchedRef.current = false;
        }
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        refreshUserProfile,
        isLoading,
        getToken,
        error,
        setError,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export { AuthContext };
