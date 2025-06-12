import { ReactNode } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

interface FormLayoutProps {
    children: ReactNode;
    className?: string;
    handleFormSubmit: (formData: any) => Promise<void>;
    handleSubmit: (
        onValid: SubmitHandler<any>,
        onInvalid?: SubmitErrorHandler<any> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function FormLayout({
    children,
    className,
    handleSubmit,
    handleFormSubmit,
}: FormLayoutProps) {
    return (
        <div className={`border-wrapper py-5 ${className}`}>
            <form onSubmit={handleSubmit(handleFormSubmit)}>{children}</form>
        </div>
    );
}

export default FormLayout;
