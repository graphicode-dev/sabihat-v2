import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldValues, FormState } from "react-hook-form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PageData } from "../types";
import { ENDPOINTS } from "../config/endpoints";
import { TableData } from "../types/table";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AUTH_COOKIE_NAME =
    import.meta.env.VITE_AUTH_COOKIE_NAME || "sabihat_auth_token";
const AUTH_COOKIE_EXPIRES_DAYS = parseInt(
    import.meta.env.VITE_AUTH_COOKIE_EXPIRES_DAYS || "7",
    10
);

export const formatPhone = (phoneNumber: string) => {
    return phoneNumber.startsWith("20")
        ? phoneNumber
        : phoneNumber.startsWith("0")
        ? `2${phoneNumber}`
        : `20${phoneNumber}`;
};

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const USER_KEY = import.meta.env.VITE_LOCALSTORAGE_USER;

export const getToken = () => Cookies.get(AUTH_COOKIE_NAME);
export const isAuthenticated = () => Boolean(Cookies.get(AUTH_COOKIE_NAME));
export const removeToken = () => Cookies.remove(AUTH_COOKIE_NAME);
export const setToken = (token: string) =>
    Cookies.set(AUTH_COOKIE_NAME, token, {
        expires: AUTH_COOKIE_EXPIRES_DAYS,
        secure: import.meta.env.PROD,
        sameSite: "strict",
    });
export const token = getToken();

export const logFormData = (apiFormData: FormData, message?: string) => {
    console.log(message + ":" || "FormData contents:");
    for (const pair of apiFormData.entries()) {
        console.log(
            pair[0] +
                ": " +
                (pair[1] instanceof File
                    ? `File: ${(pair[1] as File).name}, ${
                          (pair[1] as File).size
                      } bytes`
                    : pair[1])
        );
    }
};

export const printDocument = (options?: {
    title?: string;
    beforePrint?: () => void;
    afterPrint?: () => void;
    printOnly?: string;
}) => {
    // Set document title if provided
    const originalTitle = document.title;
    if (options?.title) {
        document.title = options.title;
    }

    // Add print-only class to target specific elements if needed
    if (options?.printOnly) {
        const elements = document.querySelectorAll(options.printOnly);
        elements.forEach((el) => {
            el.classList.add(options?.printOnly || "");
        });
    }

    // Execute beforePrint callback if provided
    if (options?.beforePrint) {
        options.beforePrint();
    }

    // Open print dialog
    window.print();

    // Execute afterPrint callback if provided
    if (options?.afterPrint) {
        options.afterPrint();
    }

    // Reset document title
    if (options?.title) {
        document.title = originalTitle;
    }

    // Remove print-only class if it was added
    if (options?.printOnly) {
        const elements = document.querySelectorAll(options.printOnly);
        elements.forEach((el) => {
            el.classList.remove(options?.printOnly || "");
        });
    }
};

export const dirtyFields = <T extends FieldValues>(formState: FormState<T>) =>
    Object.keys(formState.dirtyFields || {});

// Define a type for the endpoint methods to help with type safety
type EndpointMethods = {
    [key: string]: (...args: any[]) => Promise<any>;
};

type Methods = "getAll" | "getOne" | "add" | "update" | "delete";

export const fetchPaginatedData = async <T>(
    page: number,
    endpointKey: keyof typeof ENDPOINTS,
    method: Methods = "getAll"
): Promise<PageData<T>> => {
    try {
        // Get the endpoint from the ENDPOINTS object
        const endpoint = ENDPOINTS[endpointKey] as EndpointMethods;
        if (!endpoint || typeof endpoint[method] !== "function") {
            throw new Error(`Endpoint ${endpointKey}.${method} not found`);
        }

        // Call the API method with the page parameter
        const response = await endpoint[method](page);

        // Validate the response structure
        if (!response.data?.success || !response.data?.data) {
            throw new Error(
                response.data?.message || "Invalid response structure from API"
            );
        }

        const apiData = response.data.data;

        // Transform API response to PageData format
        const pageData: PageData<T> = {
            items: apiData.items || [],
            hasMore: apiData.currentPage < apiData.lastPage,
            lastPage: apiData.lastPage || 1,
            currentPage: apiData.currentPage || 1,
            totalCount: apiData.totalCount || apiData.items?.length || 0,
            perPage: apiData.perPage || 10,
        };

        return pageData;
    } catch (error) {
        console.error(
            `Error fetching data from ${endpointKey}.${method}:`,
            error
        );
        throw error;
    }
};

export const useInfinitePaginatedQuery = <T>(options: {
    queryKey: string | string[];
    endpointKey: keyof typeof ENDPOINTS;
    method?: Methods;
    enabled?: boolean;
    staleTime?: number;
    retry?: number;
    retryDelay?: number;
}) => {
    const {
        queryKey,
        endpointKey,
        method = "getAll",
        enabled = true,
        staleTime = 5 * 60 * 1000, // 5 minutes default
        retry = 1,
        retryDelay = 1000,
    } = options;

    // Use the imported useInfiniteQuery from react-query
    return useInfiniteQuery({
        queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        queryFn: async ({ pageParam = 1 }) => {
            return fetchPaginatedData<T>(pageParam, endpointKey, method);
        },
        getNextPageParam: (lastPage: PageData<T>) => {
            return lastPage.hasMore ? lastPage.currentPage + 1 : undefined;
        },
        initialPageParam: 1,
        staleTime,
        retry,
        retryDelay,
        enabled,
    });
};

export const transformPaginatedDataToTableData = <
    T extends { id: string | number }
>(
    paginatedData: { pages: Array<{ items: T[] }> } | undefined,
    columnMapping: (item: T) => Record<string, any>
): TableData[] => {
    if (!paginatedData) return [];

    return paginatedData.pages.flatMap((page) =>
        page.items.map((item) => ({
            id: item.id.toString(),
            original: item,
            columns: columnMapping(item),
        }))
    );
};
