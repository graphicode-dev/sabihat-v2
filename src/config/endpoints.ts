import api, { ApiResponseWrapper } from "./api";
import { token } from "../utils";
import { ApiResponse } from "../types";
import { ContactMessage } from "../pages/dashboard/system-management-administration/contact-messages/types";
import { PartnerClassification } from "../pages/dashboard/system-management-administration/partners-classification/types";
import { Tax } from "../pages/dashboard/system-management-administration/tax/types";
import { PaymentMethod } from "../pages/dashboard/system-management-administration/payment-methods/types";
import { Policy } from "../pages/dashboard/system-management-administration/policies/types";
import { TermsConditions } from "../pages/dashboard/system-management-administration/terms-conditions/types";
import {
    Currency,
    CurrencyRate,
} from "../pages/dashboard/system-management-administration/currency/types";
import { Promotion } from "../pages/dashboard/system-management-administration/promotion/types";
import {
    Load,
    LoadType,
} from "../pages/dashboard/system-management-administration/load-types/types";
import { TicketRule } from "../pages/dashboard/system-management-administration/ticket-rules/types";
import {
    ContactInformation,
    CreditLimit,
    Partner,
    TicketQuotaManagement,
} from "../pages/dashboard/business-partners-management/partners/types";
import {
    AboutUsType,
    CompanyType,
    ContactUsType,
    SettingType,
} from "../pages/dashboard/system-management-administration/company-profile/types";
import { UserProfile } from "../pages/dashboard/system-management-administration/user-profiles/types";
import { Commission } from "../pages/dashboard/business-partners-management/commissions/types";
import { MarkUp } from "../pages/dashboard/business-partners-management/markup-discounts/types";
import {
    Authority,
    AuthorityContactInformation,
} from "../pages/dashboard/business-partners-management/authorities/types";

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
    // System Management & Administration
    companyInfo: {
        getAll: (): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: CompanyType;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: CompanyType;
            }>(`/company-profile/company-info`),
    },
    companyContactUs: {
        getAll: (): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: ContactUsType[];
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: ContactUsType[];
            }>(`/company-profile/contact-us`),
    },
    companyAboutUs: {
        getAll: (): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: AboutUsType;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: AboutUsType;
            }>(`/company-profile/about-us`),
    },
    companySetting: {
        getAll: (): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: SettingType;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: SettingType;
            }>(`/company-profile/setting`),
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
        add: (data: FormData) =>
            api
                .post(`/payment-methods`, data, {
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
    termsConditions: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<TermsConditions>>> =>
            api.get<ApiResponse<TermsConditions>>(
                `/terms-conditions?page=${page}`
            ),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: TermsConditions;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: TermsConditions;
            }>(`/terms-conditions/${id}`),
        add: (data: FormData) =>
            api
                .post(`/terms-conditions`, data, {
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
    currency: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<Currency>>> =>
            api.get<ApiResponse<Currency>>(`/currencies?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Currency;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Currency;
            }>(`/currencies/${id}`),
        add: (data: FormData) =>
            api
                .post(`/currencies`, data, {
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
    currencyRate: {
        getAll: (
            page: number,
            currencyId: string
        ): Promise<ApiResponseWrapper<ApiResponse<CurrencyRate>>> =>
            api.get<ApiResponse<CurrencyRate>>(
                `/currencies/rates/currency/${currencyId}?page=${page}`
            ),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: CurrencyRate;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: CurrencyRate;
            }>(`/currencies/rates/${id}`),
        add: (data: FormData) =>
            api
                .post(`/currencies/rates`, data, {
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
    promotion: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<Promotion>>> =>
            api.get<ApiResponse<Promotion>>(`/promotions?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Promotion;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Promotion;
            }>(`/promotions/${id}`),
        add: (data: FormData) =>
            api
                .post(`/promotions`, data, {
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
    loadTypes: {
        getAll: () =>
            api.get("load-types", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: LoadType;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: LoadType;
            }>(`/load-types/${id}`),
        add: (data: FormData) =>
            api
                .post(`/load-types`, data, {
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
    loads: {
        getAll: (loadTypeId: string, page: number) =>
            api.get(`/loads?load_type_id=${loadTypeId}&page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Load;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Load;
            }>(`/loads/${id}`),
    },
    ticketRules: {
        getAll: () =>
            api.get("ticket-rules", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: TicketRule;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: TicketRule;
            }>(`/ticket-rules/${id}`),
        add: (data: FormData) =>
            api
                .post(`/ticket-rules`, data, {
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
    users: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<UserProfile>>> =>
            api.get<ApiResponse<UserProfile>>(
                `/users/business-partners/my-users?page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: UserProfile;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: UserProfile;
            }>(`/users/${id}`),
        add: (data: FormData) =>
            api
                .post(`/users`, data, {
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
    // Business Partners Management
    partners: {
        getAll: () =>
            api.get("business-partners", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Partner;
            }>
        > =>
            api.get<{ success: boolean; message: string; data: Partner }>(
                `/business-partners/${id}`
            ),
        add: (data: FormData) =>
            api
                .post(`/business-partners`, data, {
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
    partnerUsers: {
        getAll: (id: string) =>
            api.get(`/users/business-partner/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    },
    contactInformation: {
        getAll: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: ContactInformation[];
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: ContactInformation[];
            }>(`/business-partners/${id}/contact-info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    },
    quotaManagement: {
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: TicketQuotaManagement;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: TicketQuotaManagement;
            }>(`/business-partners/${id}/quota-management`),
    },
    creditLimit: {
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: CreditLimit;
            }>
        > =>
            api.get<{ success: boolean; message: string; data: CreditLimit }>(
                `/business-partners/${id}/credit-limit`
            ),
    },
    commissions: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<Commission>>> =>
            api.get<ApiResponse<Commission>>(`/commissions?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Commission;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Commission;
            }>(`/commissions/${id}`),
        add: (data: FormData) =>
            api
                .post(`/commissions`, data, {
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
    markupDiscounts: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<MarkUp>>> =>
            api.get<ApiResponse<MarkUp>>(`/markup-discounts?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: MarkUp;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: MarkUp;
            }>(`/markup-discounts/${id}`),
        add: (data: FormData) =>
            api
                .post(`/markup-discounts`, data, {
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
    authorities: {
        getAll: (
            page: number
        ): Promise<ApiResponseWrapper<ApiResponse<Authority>>> =>
            api.get<ApiResponse<Authority>>(`/authorities?page=${page}`),
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: Authority;
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: Authority;
            }>(`/authorities/${id}`),
        add: (data: FormData) =>
            api
                .post(`/authorities`, data, {
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
    authoritiesContactInformation: {
        getOne: (
            id: string
        ): Promise<
            ApiResponseWrapper<{
                success: boolean;
                message: string;
                data: AuthorityContactInformation[];
            }>
        > =>
            api.get<{
                success: boolean;
                message: string;
                data: AuthorityContactInformation[];
            }>(`/authorities/${id}/contact-info`),
    },
};
