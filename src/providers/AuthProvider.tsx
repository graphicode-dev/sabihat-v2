import { createContext, useState, ReactNode, useEffect, useRef } from "react";
import { authService } from "../services/auth";
import { User } from "../types";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (phone: string, password: string) => Promise<boolean>;
    logout: () => void;
    refreshUserProfile: () => Promise<void>;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const profileFetchedRef = useRef<boolean>(false);

    // Initialize auth state and fetch profile if authenticated
    useEffect(() => {
        const initAuth = async () => {
            // Skip if we've already fetched the profile
            if (profileFetchedRef.current) return;

            setIsLoading(true);
            try {
                const isAuth = authService.isAuthenticated();
                setIsAuthenticated(isAuth);

                if (isAuth) {
                    // Get profile from API to ensure session is valid
                    const profileData = await authService.getProfile();

                    if (profileData) {
                        setUser(profileData);
                        // Mark that we've fetched the profile
                        profileFetchedRef.current = true;
                    } else {
                        // If profile fetch fails, user might be logged out on server
                        authService.logout();
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // Function to refresh user profile data
    const refreshUserProfile = async (): Promise<void> => {
        if (!isAuthenticated) return;

        try {
            const profileData = await authService.getProfile();
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
            const userData = await authService.login(phone, password);

            if (userData) {
                setUser(userData);
                setIsAuthenticated(true);
                // Mark that we've fetched the profile (via login)
                profileFetchedRef.current = true;
                return true;
            }

            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        // Reset the profile fetched flag
        profileFetchedRef.current = false;
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        refreshUserProfile,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export { AuthContext };
