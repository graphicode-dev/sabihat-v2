import { ReactNode } from "react";
import { ToastProvider } from "./ToastProvider";
import QueryProvider from "./QueryProvider";
import { Provider } from "react-redux";
import { store } from "../store";

function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <ToastProvider maxToasts={5}>
                <QueryProvider>{children}</QueryProvider>
            </ToastProvider>
        </Provider>
    );
}

export default Providers;
