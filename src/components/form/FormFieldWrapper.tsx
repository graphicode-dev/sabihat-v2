function FormFieldWrapper({
    parentClassName,
    className,
    label,
    activeLabel,
    required,
    children,
    error,
}: {
    parentClassName?: string;
    className?: string;
    label?: string;
    activeLabel?: boolean;
    required?: boolean;
    children?: React.ReactNode;
    error?: string;
}) {
    return (
        <div className={`bg-white p-4 ${parentClassName}`}>
            <div className={`relative w-full ${className}`}>
                {children}

                {label && (
                    <label
                        htmlFor={label}
                        className={`form-label ${
                            error ? "form-error" : ""
                        } z-0`}
                        style={{
                            color: activeLabel
                                ? "var(--color-primary-500)"
                                : "",
                        }}
                    >
                        {label}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
}

export default FormFieldWrapper;
