import { useRef, useState } from "react";
import {
    Calendar as CalendarIcon,
    EyeIcon,
    EyeOffIcon,
    PaperclipIcon,
} from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Calendar from "../ui/Calendar";
import { format } from "date-fns";
import FormFieldWrapper from "./FormFieldWrapper";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
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
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    // Determine the actual input type
    const inputType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    return (
        <div className={`w-full text-left ${className}`}>
            <FormFieldWrapper
                label={label}
                required={required}
                error={error}
                activeLabel={showCalendar}
            >
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => {
                        if (type === "textarea") {
                            return (
                                <textarea
                                    {...field}
                                    className={`peer form-input h-auto ${
                                        error ? "form-error" : ""
                                    }`}
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
                        } else if (type === "date") {
                            const handleClickOutside = (e: MouseEvent) => {
                                if (
                                    calendarRef.current &&
                                    !calendarRef.current.contains(
                                        e.target as Node
                                    )
                                ) {
                                    setShowCalendar(false);
                                    document.removeEventListener(
                                        "mousedown",
                                        handleClickOutside
                                    );
                                }
                            };

                            const toggleCalendar = () => {
                                const newState = !showCalendar;
                                setShowCalendar(newState);

                                if (newState) {
                                    // Add event listener when calendar is shown
                                    setTimeout(() => {
                                        document.addEventListener(
                                            "mousedown",
                                            handleClickOutside
                                        );
                                    }, 0);
                                } else {
                                    // Remove event listener when calendar is hidden
                                    document.removeEventListener(
                                        "mousedown",
                                        handleClickOutside
                                    );
                                }
                            };

                            // Handle date selection
                            const handleDateSelect = (date: Date) => {
                                field.onChange(date);
                                setShowCalendar(false);
                            };

                            return (
                                <div className="relative w-full">
                                    <div
                                        className={`peer flex items-center justify-between rounded-full px-4 py-2 cursor-pointer ${
                                            error ? "border-red-500" : ""
                                        }`}
                                        style={{
                                            border: showCalendar
                                                ? "2px solid var(--color-primary-500)"
                                                : "2px solid var(--color-dark-50)",
                                        }}
                                        onClick={toggleCalendar}
                                    >
                                        <span
                                            className={`${
                                                !field.value
                                                    ? "text-gray-400"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {field.value
                                                ? format(
                                                      new Date(field.value),
                                                      "PP"
                                                  )
                                                : placeholder || "Select date"}
                                        </span>
                                        <CalendarIcon className="h-5 w-5 text-green-500" />
                                    </div>

                                    {showCalendar && (
                                        <div
                                            ref={calendarRef}
                                            className="absolute z-50 mt-1"
                                        >
                                            <Calendar
                                                initialDate={
                                                    field.value
                                                        ? new Date(field.value)
                                                        : new Date()
                                                }
                                                onDateSelect={handleDateSelect}
                                            />
                                        </div>
                                    )}

                                    <input
                                        type="hidden"
                                        {...field}
                                        disabled={disabled}
                                    />
                                </div>
                            );
                        } else if (type === "file") {
                            return (
                                <>
                                    <label className="flex items-center gap-2 cursor-pointer text-green-500 hover:text-green-600 transition-colors">
                                        <PaperclipIcon className="h-5 w-5" />
                                        <span>Upload Logo</span>
                                        <input
                                            type={inputType}
                                            className="hidden"
                                            accept="image/*"
                                            disabled={disabled}
                                            required={required}
                                            onChange={(e) => {
                                                if (
                                                    e.target.files &&
                                                    e.target.files.length > 0
                                                ) {
                                                    field.onChange(
                                                        e.target.files[0]
                                                    );
                                                }
                                            }}
                                        />
                                    </label>
                                    {field.value &&
                                        typeof field.value === "object" && (
                                            <span className="ml-3 text-sm text-gray-600">
                                                {(field.value as File).name}
                                            </span>
                                        )}
                                </>
                            );
                        } else {
                            return (
                                <input
                                    {...field}
                                    type={inputType}
                                    className={`peer form-input ${
                                        error ? "form-error" : ""
                                    }`}
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

                {error && (
                    <span className="form-error text-left ml-5">*{error}</span>
                )}
            </FormFieldWrapper>
        </div>
    );
};

export default FormInput;
