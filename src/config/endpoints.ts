import api, { ApiResponseWrapper } from "./api";
import { token } from "../utils";
import { ApiResponse } from "../types";
import { ContactMessage } from "../pages/dashboard/system-management-administration/contact-messages/types";
import { PartnerClassification } from "../pages/dashboard/system-management-administration/partners-classification/types";
import { Tax } from "../pages/dashboard/system-management-administration/tax/types";
import { PaymentMethod } from "../pages/dashboard/system-management-administration/payment-methods";
import { Policy } from "../pages/dashboard/system-management-administration/policies/types";

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
            api.get("/auth/profile", {
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
    contactMessages: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<ContactMessage>>> =>
            api.get<ApiResponse<ContactMessage>>(
                `/contact-messages?page=${page}`
            ),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: ContactMessage;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: ContactMessage;
            }>(`/contact-messages/${id}`),
    },
    partnersClassification: {
        getAll: () => api.get(`/partners-classification`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: PartnerClassification;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: PartnerClassification;
            }>(`/partners-classification/${id}`),
    },
    tax: {
        getAll: (page: number): Promise<ApiResponseWrapper<ApiResponse<Tax>>> =>
            api.get<ApiResponse<Tax>>(`/taxes?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Tax;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Tax;
            }>(`/taxes/${id}`),
        add: (data: FormData) =>
            api
                .post(`/taxes`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.error) {
                        throw response.error.details.errors;
                    }
                }),

        update: (id: string, data: Tax) =>
            api.put(`/taxes/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }),
        delete: (id: string) =>
            api.delete(`/taxes/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    },
    paymentMethods: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<PaymentMethod>>> =>
            api.get<ApiResponse<PaymentMethod>>(
                `/payment-methods?page=${page}`
            ),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: PaymentMethod;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: PaymentMethod;
            }>(`/payment-methods/${id}`),
    },
    policies: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<Policy>>> =>
            api.get<ApiResponse<Policy>>(`/policies?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Policy;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Policy;
            }>(`/policies/${id}`),
        add: (data: FormData) =>
            api
                .post(`/policies`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    if (response.error) {
                        throw response.error.details.errors;
                    }
                }),
    },
};
