import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
    removeToken,
    setToken,
    isAuthenticated,
    USER_KEY,
} from "../../../utils";
import { RootState } from "../..";
import { User } from "../../../types";
import { ENDPOINTS } from "../../../config/endpoints";

// Define the auth state interface
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    profileRefreshed: boolean;
    verificationCodeSent: boolean;
    verificationCodeVerified: boolean;
    forgetPasswordStep: "send-code" | "verify-code" | "reset-password" | "done";
    resetPasswordToken: string | null;
    resetPasswordPhoneNumber: string | null;
    resetPasswordPhoneCode: string | null;
}

// Initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    profileRefreshed: false,
    verificationCodeSent: false,
    verificationCodeVerified: false,
    forgetPasswordStep: "send-code",
    resetPasswordToken: null,
    resetPasswordPhoneNumber: null,
    resetPasswordPhoneCode: null,
};

// No longer needed as we're fetching fresh data on each refresh

// Initialize auth from localStorage
export const initializeAuth = (): AuthState => {
    try {
        const isAuth = isAuthenticated();

        if (isAuth) {
            // If we have a token, set initial state to authenticated
            // but we'll need to fetch the profile data after component mount
            return {
                user: null, // Will be populated by refreshUserProfile action
                isAuthenticated: true,
                profileRefreshed: false, // Set to false to trigger profile refresh
                loading: false,
                error: null,
                verificationCodeSent: false,
                verificationCodeVerified: false,
                forgetPasswordStep: "send-code",
                resetPasswordToken: null,
                resetPasswordPhoneNumber: null,
                resetPasswordPhoneCode: null,
            };
        }
    } catch (error) {
        console.error("Error initializing auth state:", error);
    }
    return initialState;
};

// Async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async (
        {
            phoneCode,
            phoneNumber,
            password,
        }: { phoneCode: string; phoneNumber: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await ENDPOINTS.auth.login({
                phoneCode,
                phoneNumber,
                password,
            });

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Login failed");
            }

            if (response.data.data.token) {
                setToken(response.data.data.token);

                // Store user data
                const userData = response.data.data.result;

                // Return just the user data without storing in localStorage
                return userData;
            }

            return rejectWithValue("Invalid response format");
        } catch (error: any) {
            console.error("Login error:", error);
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
            const response = await ENDPOINTS.auth.logout();

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
            const response = await ENDPOINTS.auth.profile();

            if (response.data.success) {
                // Log the response structure to help debug
                console.log("Profile API response:", response.data);

                // Extract user data from the response
                // The API might return the data in different structures
                let userData;

                if (response.data.data) {
                    userData = response.data.data;
                } else if (response.data.result) {
                    userData = response.data.result;
                } else {
                    userData = response.data;
                }

                console.log("Extracted user data:", userData);

                if (userData && typeof userData === "object") {
                    // Return user data without storing in localStorage
                    return userData;
                } else {
                    console.error(
                        "User data is undefined or invalid in API response"
                    );
                    return rejectWithValue("User data not found in response");
                }
            }

            return rejectWithValue("Failed to fetch profile");
        } catch (error) {
            console.error("Profile refresh error:", error);
            if ((error as any).response?.status === 401) {
                // Handle unauthorized error
                removeToken();
                localStorage.removeItem(USER_KEY);
            }
            return rejectWithValue("Failed to refresh profile");
        }
    }
);

// Reset password steps
export const sendVerificationCode = createAsyncThunk(
    "auth/sendVerificationCode",
    async (
        { phoneCode, phoneNumber }: { phoneCode: string; phoneNumber: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await ENDPOINTS.auth.sendVerificationCode({
                phoneCode,
                phoneNumber,
            });

            if (!response.data.success) {
                return rejectWithValue(
                    response.data.message || "Verification code send failed"
                );
            }

            return true;
        } catch (error: any) {
            console.error("Login error:", error);
            return rejectWithValue(
                error.response?.data?.message || "An unknown error occurred"
            );
        }
    }
);

export const verifyVerificationCode = createAsyncThunk(
    "auth/verifyVerificationCode",
    async (
        {
            phoneCode,
            phoneNumber,
            code,
        }: { phoneCode: string; phoneNumber: string; code: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await ENDPOINTS.auth.verifyVerificationCode({
                phoneCode,
                phoneNumber,
                code,
            });

            if (!response.data.success) {
                return rejectWithValue(
                    response.data.message || "Verification code verify failed"
                );
            }
            return true;
        } catch (error: any) {
            console.error("Login error:", error);
            return rejectWithValue(
                error.response?.data?.message || "An unknown error occurred"
            );
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (
        { password }: { password: string },
        { rejectWithValue, getState }
    ) => {
        try {
            const state = getState() as RootState;
            const response = await ENDPOINTS.auth.resetPassword({
                verifyToken: state.auth.resetPasswordToken!,
                password,
            });

            if (!response.data.success) {
                return rejectWithValue(
                    response.data.message || "Password reset failed"
                );
            }

            // Store user data
            const userData = response.data.data.result;

            // Return just the user data without storing in localStorage
            return userData;
        } catch (error: any) {
            console.error("Login error:", error);
            return rejectWithValue(
                error.response?.data?.message || "An unknown error occurred"
            );
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
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.profileRefreshed = true; // Set to true since we have user data
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
            .addCase(refreshUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
                state.error = null;
                state.profileRefreshed = true;
            })
            .addCase(refreshUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Send verification code cases
            .addCase(sendVerificationCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendVerificationCode.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.resetPasswordPhoneNumber = action.meta.arg.phoneNumber;
                state.resetPasswordPhoneCode = action.meta.arg.phoneCode;
                state.forgetPasswordStep = "verify-code";
                state.verificationCodeSent = true;
            })
            .addCase(sendVerificationCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Verify verification code cases
            .addCase(verifyVerificationCode.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyVerificationCode.fulfilled, (state, action: any) => {
                state.loading = false;
                state.error = null;
                state.forgetPasswordStep = "reset-password";
                state.resetPasswordToken = action.payload.data.token;
                state.verificationCodeVerified = true;
            })
            .addCase(verifyVerificationCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Reset password cases
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.forgetPasswordStep = "done";
                state.resetPasswordToken = null;
                state.profileRefreshed = true;
                state.resetPasswordPhoneNumber = null;
                state.resetPasswordPhoneCode = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setError } = authSlice.actions;

export const selectProfileRefreshed = (state: RootState) =>
    state.auth.profileRefreshed;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
    state.auth.isAuthenticated;
export const selectForgetPasswordStep = (state: RootState) =>
    state.auth.forgetPasswordStep;
export const selectResetPhoneNumber = (state: RootState) =>
    state.auth.resetPasswordPhoneNumber;
export const selectResetPhoneCode = (state: RootState) =>
    state.auth.resetPasswordPhoneCode;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
