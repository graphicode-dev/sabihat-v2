function FormFieldWrapper({
    label,
    required,
    children,
}: {
    label?: string;
    required?: boolean;
    children?: React.ReactNode;
}) {
    return (
        <div className="bg-white p-4">
            <div className="relative w-full">
                {children}

                {label && (
                    <label htmlFor={label} className="form-label">
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
