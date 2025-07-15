import { useRef, useState } from "react";
import {
    Calendar as CalendarIcon,
    EyeIcon,
    EyeOffIcon,
    PaperclipIcon,
} from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Calendar from "../ui/Calendar";
import { formatDate } from "../ui/Calendar";
import FormFieldWrapper from "./FormFieldWrapper";
import PhoneInput from "react-phone-input-2";
import OTP from "../auth/OTP";

interface PhoneData {
    fullNumber: string;
    phoneCode: string;
    phoneNumber: string;
}

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    type?: React.HTMLInputTypeAttribute | "otp";
    fileIcon?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    requiredLabel?: string;
    error?: string;
    className?: string;
    inputClassName?: string;
    formFieldWrapperParentClassName?: string;
    disabled?: boolean;
    rows?: number;
    cols?: number;
    colSpan?: number;
    textareaResize?:
        | "none"
        | "both"
        | "horizontal"
        | "vertical"
        | "block"
        | "inline";
    fileLabel?: string;
    readOnly?: boolean;
    onPhoneExtracted?: (phoneData: PhoneData) => void;
}

const FormInput = <T extends FieldValues>({
    name,
    control,
    label,
    type = "text",
    placeholder = "",
    required = false,
    requiredLabel,
    error,
    className = "",
    inputClassName = "",
    formFieldWrapperParentClassName = "",
    disabled = false,
    rows = 3,
    cols = 30,
    colSpan = 1,
    textareaResize = "vertical",
    fileLabel = "Upload File",
    fileIcon,
    readOnly = false,
    onPhoneExtracted,
}: FormInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [phone, setPhone] = useState("20");

    // Determine the actual input type
    const inputType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    return (
        <div className={`w-full text-left ${className} col-span-${colSpan}`}>
            <FormFieldWrapper
                label={label}
                required={required}
                error={error}
                activeLabel={showCalendar}
                disabled={disabled}
                parentClassName={formFieldWrapperParentClassName}
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
                                    } ${
                                        disabled ? "form-input-disabled" : ""
                                    } ${inputClassName}`}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    cols={cols}
                                    rows={rows}
                                    style={{
                                        resize: disabled
                                            ? "none"
                                            : textareaResize,
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
                                        className={`peer flex items-center justify-between rounded-full px-4 py-2 ${
                                            error
                                                ? "form-error cursor-pointer"
                                                : disabled
                                                ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                                                : "cursor-pointer"
                                        }`}
                                        style={{
                                            border:
                                                showCalendar && !disabled
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
                                            } ${error ? "text-red-500" : ""}`}
                                        >
                                            {field.value
                                                ? formatDate.dateTime(
                                                      new Date(field.value)
                                                  )
                                                : placeholder || "Select date"}
                                        </span>
                                        <CalendarIcon
                                            className={`h-5 w-5 ${
                                                error
                                                    ? "text-red-500"
                                                    : disabled
                                                    ? "text-gray-400"
                                                    : "text-primary-500"
                                            }`}
                                        />
                                    </div>

                                    {showCalendar && !disabled && (
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
                                        className={`peer form-input ${
                                            error ? "form-error" : ""
                                        } ${
                                            disabled
                                                ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                                                : ""
                                        } ${inputClassName}`}
                                        disabled={disabled}
                                    />
                                </div>
                            );
                        } else if (type === "otp") {
                            return (
                                <OTP
                                    value={field.value}
                                    onChange={field.onChange}
                                    name={field.name}
                                    onComplete={(code) => {
                                        field.onChange(code);
                                    }}
                                />
                            );
                        } else if (type === "tel") {
                            return (
                                <PhoneInput
                                    country={"eg"}
                                    countryCodeEditable={false}
                                    enableSearch={true}
                                    value={field.value || phone}
                                    onChange={(phoneValue, country) => {
                                        // Update local state with the full phone number
                                        setPhone(phoneValue);

                                        // Extract phone code and phone number
                                        const selectedCountry = country as any;
                                        const phoneCode =
                                            selectedCountry.dialCode;
                                        const phoneNumberOnly =
                                            phoneValue.substring(
                                                selectedCountry.dialCode.length
                                            );

                                        console.log("Phone Extraction:", {
                                            fullNumber: phoneValue,
                                            phoneCode,
                                            phoneNumber: phoneNumberOnly,
                                        });

                                        // Update React Hook Form field value with full number
                                        // This is important - we need to keep the full number in the field
                                        field.onChange(phoneValue);

                                        // If onPhoneExtracted callback exists, provide separated values
                                        if (onPhoneExtracted) {
                                            onPhoneExtracted({
                                                fullNumber: phoneValue,
                                                phoneCode,
                                                phoneNumber: phoneNumberOnly,
                                            });
                                        }
                                    }}
                                    inputClass="w-full! rounded-3xl! h-11! focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
                                    buttonClass="focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
                                    dropdownClass="border border-primary-500!"
                                    disabled={disabled}
                                />
                            );
                        } else if (type === "file") {
                            return (
                                <>
                                    <label className="w-fit flex items-center gap-2 cursor-pointer text-green-500 hover:text-green-600 transition-colors disabled:cursor-not-allowed">
                                        <div
                                            className={`flex items-center gap-2 border-b-2 border-primary-500 ${
                                                disabled
                                                    ? "cursor-not-allowed opacity-50"
                                                    : ""
                                            }`}
                                        >
                                            {fileIcon ? (
                                                fileIcon
                                            ) : (
                                                <PaperclipIcon className="h-5 w-5" />
                                            )}
                                            <span>{fileLabel}</span>
                                            <input
                                                type={inputType}
                                                className="hidden"
                                                accept="image/*"
                                                disabled={disabled}
                                                required={required}
                                                onChange={(e) => {
                                                    if (
                                                        e.target.files &&
                                                        e.target.files.length >
                                                            0
                                                    ) {
                                                        field.onChange(
                                                            e.target.files[0]
                                                        );
                                                    }
                                                }}
                                            />
                                        </div>
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
                                    } ${
                                        disabled ? "form-input-disabled" : ""
                                    } ${inputClassName}`}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    readOnly={readOnly}
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

                {requiredLabel && (
                    <span className="form-error text-left ml-5 text-primary-500">
                        *{requiredLabel}
                    </span>
                )}
            </FormFieldWrapper>
        </div>
    );
};

export default FormInput;
