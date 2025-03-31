export type ToastType = "error" | "warning" | "success" | "info";

export interface ToastProps {
    id: string;
    type?: ToastType;
    title?: string;
    message?: string;
    duration?: number;
}

export interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message?: string;
    duration?: number;
    position?: ToastPosition;
}

export type ToastPosition =
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";

export interface ToastContextValue {
    toasts: Toast[];
    position: ToastPosition;
    onClose: (id: string) => void;
    spacing: 2 | 4 | 6 | 8;
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    removeAllToasts: () => void;
    updateToast: (id: string, toast: Partial<Omit<Toast, "id">>) => void;
}

export interface ToastProviderProps {
    children: React.ReactNode;
    position?: ToastPosition;
    maxToasts?: number;
    spacing?: 2 | 4 | 6 | 8;
}
