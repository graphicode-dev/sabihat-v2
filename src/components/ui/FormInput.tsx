import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import FormFieldWrapper from "./FormFieldWrapper";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    error?: string;
    className?: string;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    textareaResize?:
        | "none"
        | "both"
        | "horizontal"
        | "vertical"
        | "block"
        | "inline";
}

const FormInput = <T extends FieldValues>({
    name,
    control,
    label,
    type = "text",
    placeholder = "",
    required = false,
    error,
    className = "",
    disabled = false,
    rows = 3,
    cols = 30,
    textareaResize = "vertical",
}: FormInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";

    // Determine the actual input type
    const inputType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    return (
        <div className={`w-full ${className}`}>
            <FormFieldWrapper label={label} required={required}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        if (type === "textarea") {
                            return (
                                <textarea
                                    {...field}
                                    className="peer form-input h-auto"
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    cols={cols}
                                    rows={rows}
                                    style={{
                                        resize: textareaResize,
                                    }}
                                />
                            );
                        } else {
                            return (
                                <input
                                    {...field}
                                    type={inputType}
                                    className="peer form-input"
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                />
                            );
                        }
                    }}
                />

                {/* Show eye icon only for password fields */}
                {isPasswordField && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOffIcon size={18} />
                        ) : (
                            <EyeIcon size={18} />
                        )}
                    </button>
                )}
            </FormFieldWrapper>

            {error && <span className="form-error">{error}</span>}
        </div>
    );
};

export default FormInput;
