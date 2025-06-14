function FormFieldWrapper({
    label,
    activeLabel,
    required,
    children,
    error,
}: {
    label?: string;
    activeLabel?: boolean;
    required?: boolean;
    children?: React.ReactNode;
    error?: string;
}) {
    return (
        <div className="bg-white p-4">
            <div className="relative w-full">
                {children}

                {label && (
                    <label
                        htmlFor={label}
                        className={`form-label ${error ? "form-error" : ""}`}
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
