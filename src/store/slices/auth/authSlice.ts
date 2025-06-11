import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
    formatPhone,
    removeToken,
    setToken,
    getToken,
    isAuthenticated,
    USER_KEY,
} from "../../../lib/utils";
import { RootState } from "../..";
import { User } from "../../../types";

// Define the auth state interface
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    profileRefreshed: boolean;
}

// Initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    profileRefreshed: false,
};

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Initialize auth from localStorage
const initializeAuth = (): AuthState => {
    try {
        const isAuth = isAuthenticated();
        const storedUser = localStorage.getItem(USER_KEY);

        if (isAuth && storedUser) {
            const parsedUser = JSON.parse(storedUser);
            return {
                user: parsedUser,
                isAuthenticated: true,
                profileRefreshed: true,
                loading: false,
                error: null,
            };
        }
    } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem(USER_KEY);
    }
    return initialState;
};

// Async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async (
        { phone, password }: { phone: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post("/auth/login", {
                phone: formatPhone(phone),
                password,
            });

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Login failed");
            }

            if (response.data.data.token) {
                setToken(response.data.data.token);

                // Store user data
                const userData = response.data.data.result;
                localStorage.setItem(USER_KEY, JSON.stringify(userData));

                return userData;
            }

            return rejectWithValue("Invalid response format");
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "An unknown error occurred"
            );
        }
    }
);

// Async thunk for logout
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );

            if (response.data.success) {
                // Clear local storage and token
                removeToken();
                localStorage.removeItem(USER_KEY);
                return true;
            }

            return rejectWithValue("Logout failed");
        } catch (error) {
            console.error("Logout error:", error);
            // Still clear local storage and token even if API call fails
            removeToken();
            localStorage.removeItem(USER_KEY);
            return true;
        }
    }
);

// Async thunk for refreshing user profile
export const refreshUserProfile = createAsyncThunk(
    "auth/refreshProfile",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState() as { auth: AuthState };

        // Prevent infinite loop by checking if profile has already been refreshed
        if (auth.profileRefreshed) {
            // Return current user without making API call and ensure loading is false
            return auth.user;
        }

        if (!auth.isAuthenticated) {
            return rejectWithValue("Not authenticated");
        }

        try {
            const response = await axios.get("/auth/profile", {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            if (response.data.success) {
                localStorage.setItem(USER_KEY, JSON.stringify(response.data));
                return response.data;
            }

            return rejectWithValue("Failed to fetch profile");
        } catch (error) {
            console.error("Profile refresh error:", error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                // Handle unauthorized error
                removeToken();
                localStorage.removeItem(USER_KEY);
            }
            return rejectWithValue("Failed to refresh profile");
        }
    }
);

// Create the auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: initializeAuth(),
    reducers: {
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Logout cases
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
                // Redirect to login page
                window.location.href = "/login";
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
                // Still logout locally even if API call fails
                state.user = null;
                state.isAuthenticated = false;
                window.location.href = "/login";
            })
            // Profile refresh cases
            .addCase(refreshUserProfile.pending, (state) => {
                // Only set loading to true if we're actually making an API call
                // (if profileRefreshed is false)
                if (!state.profileRefreshed) {
                    state.loading = true;
                    state.error = null;
                }
            })
            .addCase(
                refreshUserProfile.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.user = action.payload;
                    state.loading = false;
                    state.error = null;
                    state.profileRefreshed = true;
                }
            )
            .addCase(refreshUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setError } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
