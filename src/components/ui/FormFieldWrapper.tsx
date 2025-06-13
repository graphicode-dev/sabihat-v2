function FormFieldWrapper({
    label,
    required,
    children,
    error,
}: {
    label?: string;
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
