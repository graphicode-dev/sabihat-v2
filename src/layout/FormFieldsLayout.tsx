import { ReactNode } from "react";

interface FormLayoutProps {
    children: ReactNode;
    title?: string;
    className?: string;
    separator?: boolean;
}

function FormFieldsLayout({
    children,
    title,
    className,
    separator,
}: FormLayoutProps) {
    return (
        <>
            {title && (
                <h1 className="text-xl text-left font-bold px-5">{title}</h1>
            )}
            <div className={`form-fields-wrapper px-5 pb-5 ${className}`}>
                {children}
            </div>

            {separator && <div className="my-20 h-px bg-gray-200" />}
        </>
    );
}

export default FormFieldsLayout;
