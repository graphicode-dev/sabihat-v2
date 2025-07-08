// src/components/AuthInitializer.tsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    initializeAuth,
    refreshUserProfile,
    selectIsAuthenticated,
    selectProfileRefreshed,
} from "../../store/slices/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";

export const AuthInitializer = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const profileRefreshed = useSelector(selectProfileRefreshed);

    useEffect(() => {
        initializeAuth();
    }, []);

    useEffect(() => {
        // Only fetch profile if authenticated but profile not yet refreshed
        if (isAuthenticated && !profileRefreshed) {
            dispatch(refreshUserProfile());
        }
    }, [dispatch, isAuthenticated, profileRefreshed]);

    return null; // This component doesn't render anything
};
