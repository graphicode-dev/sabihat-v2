import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ToastProvider } from "./ToastProvider";

function Providers({ children }: { children: ReactNode }) {
    return (
        <ToastProvider maxToasts={5}>
            <AuthProvider>{children}</AuthProvider>
        </ToastProvider>
    );
}

export default Providers;
