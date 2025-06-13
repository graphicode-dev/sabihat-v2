import { ReactNode } from "react";

interface FormLayoutProps {
    children: ReactNode;
    title?: string;
    className?: string;
    separator?: boolean;
    cols?: string;
}

function FormFieldsLayout({
    children,
    title,
    className,
    separator,
    cols,
}: FormLayoutProps) {
    // Get the appropriate grid columns class based on cols prop
    const getGridColsClass = () => {
        switch (cols) {
            case "1":
                return "grid-cols-1";
            case "2":
                return "grid-cols-2";
            case "3":
                return "grid-cols-3";
            case "4":
                return "grid-cols-4";
            case "5":
                return "grid-cols-5";
            case "6":
                return "grid-cols-6";
            default:
                return "grid-cols-3";
        }
    };

    return (
        <>
            {title && (
                <h1 className="text-xl text-left font-bold px-5">{title}</h1>
            )}
            <div
                className={`grid ${getGridColsClass()} gap-4 my-5 px-5 pb-5 ${className}`}
            >
                {children}
            </div>

            {separator && <div className="my-20 h-px bg-gray-200" />}
        </>
    );
}

export default FormFieldsLayout;
