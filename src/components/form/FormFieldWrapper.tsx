function FormFieldWrapper({
    parentClassName,
    className,
    label,
    activeLabel,
    required,
    disabled,
    children,
    error,
}: {
    parentClassName?: string;
    className?: string;
    label?: string;
    activeLabel?: boolean;
    required?: boolean;
    disabled?: boolean;
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
                        className={`form-label ${error ? "form-error" : ""} ${
                            disabled
                                ? "cursor-not-allowed opacity-50  text-dark-200"
                                : ""
                        } z-0`}
                        style={{
                            color:
                                activeLabel && !disabled
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
