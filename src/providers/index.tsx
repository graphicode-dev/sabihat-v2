import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

function Providers({ children }: { children: ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
