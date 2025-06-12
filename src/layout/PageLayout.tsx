import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
}

function PageLayout({ children, className }: PageLayoutProps) {
    return <div className={`page-wrapper p-5  ${className}`}>{children}</div>;
}

export default PageLayout;
