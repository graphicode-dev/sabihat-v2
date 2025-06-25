import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
    showBorder?: boolean;
    noPadding?: boolean;
}

function PageLayout({
    children,
    className,
    showBorder = false,
    noPadding = false,
}: PageLayoutProps) {
    return (
        <div
            className={`page-wrapper print:shadow-none print:border-none ${
                showBorder ? "border-wrapper" : ""
            }   ${className} ${noPadding ? "p-0" : "p-5"}`}
        >
            {children}
        </div>
    );
}

export default PageLayout;
