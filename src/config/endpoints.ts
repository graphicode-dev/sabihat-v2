import api from "./api";

import { getToken } from "../utils";

const token = getToken();

export const ENDPOINTS = {
    auth: {
        login: (data: { phone: string; password: string }) =>
            api.post("/auth/login", data),
        logout: () =>
            api.post(
                "/auth/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            ),
        sendVerificationCode: (data: { phone: string }) =>
            api.post("/auth/verification/send", data),
        verifyVerificationCode: (data: { code: string }) =>
            api.post(`/auth/verification/verify/${data.code}`),
        resetPassword: (data: { token: string; password: string }) =>
            api.post(`/auth/reset-password`, data),
        profile: () =>
            api.get("/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            }),
    },
};
