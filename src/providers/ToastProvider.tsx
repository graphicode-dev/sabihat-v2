import React, { createContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    Toast,
    ToastContextValue,
    ToastProviderProps,
} from "../types/toast.types";
import { ToastsList } from "../components/ui/toast/ToastsList";

// Create the context
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Create the provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    position = "top-right",
    maxToasts = 5,
    spacing = 4,
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Add a new toast
    const addToast = useCallback(
        (toast: Omit<Toast, "id">) => {
            const id = uuidv4();
            // Use the toast's position if provided, otherwise fall back to the provider's position
            const toastPosition = toast.position || position;

            setToasts((prevToasts) => {
                // If we have more than maxToasts, remove the oldest ones
                const newToasts = [
                    ...prevToasts,
                    { ...toast, id, position: toastPosition },
                ];
                if (newToasts.length > maxToasts) {
                    return newToasts.slice(newToasts.length - maxToasts);
                }
                return newToasts;
            });
            return id;
        },
        [maxToasts, position]
    );

    // Remove a toast by ID
    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    // Remove all toasts
    const removeAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    // Update a toast by ID
    const updateToast = useCallback(
        (id: string, updatedToast: Partial<Omit<Toast, "id">>) => {
            setToasts((prevToasts) =>
                prevToasts.map((toast) =>
                    toast.id === id ? { ...toast, ...updatedToast } : toast
                )
            );
        },
        []
    );

    // Context value
    const contextValue: ToastContextValue = {
        toasts,
        position,
        onClose: removeToast,
        spacing,
        addToast,
        removeToast,
        removeAllToasts,
        updateToast,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastsList />
        </ToastContext.Provider>
    );
};

export { ToastContext };
