import api from "./api";

import { getToken } from "../utils";

const token = getToken();

export const ENDPOINTS = {
    auth: {
        login: (data: {
            phoneCode: string;
            phoneNumber: string;
            password: string;
        }) => api.post("/login", data),
        logout: () =>
            api.post(
                "/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            ),
        sendVerificationCode: (data: {
            phoneCode: string;
            phoneNumber: string;
        }) => api.post("/forgot-password", data),
        verifyVerificationCode: (data: {
            phoneCode: string;
            phoneNumber: string;
            code: string;
        }) => api.post("/forgot-verify-code", data),
        resetPassword: (data: { verifyToken: string; password: string }) =>
            api.post(`/reset-password`, data),
        profile: () =>
            api.get("/profile", {
                headers: { Authorization: `Bearer ${token}` },
            }),
        changePassword: (data: {
            currentPassword: string;
            newPassword: string;
            newPasswordConfirmation: string;
        }) =>
            api.post(`/change-password`, data, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    },
};
