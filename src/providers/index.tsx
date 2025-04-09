import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ToastProvider } from "./ToastProvider";
import QueryProvider from "./QueryProvider";

function Providers({ children }: { children: ReactNode }) {
    return (
        <ToastProvider maxToasts={5}>
            <AuthProvider>
                <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
        </ToastProvider>
    );
}

export default Providers;
