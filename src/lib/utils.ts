import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
