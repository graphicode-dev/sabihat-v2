import { useNavigate } from "react-router-dom";

interface FormButtonProps {
    isLoading?: boolean;
    submitText: string;
    cancelText?: string;
    disabled?: boolean;
}

function FormButtons({
    isLoading,
    submitText,
    cancelText,
    disabled,
}: FormButtonProps) {
    const navigate = useNavigate();
    const submitButtonText =
        submitText.charAt(0).toUpperCase() + submitText.slice(1) || "Submit";
    return (
        <div className="ps-5 flex justify-start items-center gap-2">
            {/* Cancel Button */}
            <button
                type="button"
                disabled={isLoading}
                onClick={() => navigate(-1)}
                className="form-button-cancel disabled:opacity-50 "
            >
                {cancelText || "Cancel"}
            </button>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading || disabled}
                className="form-button-submit disabled:opacity-50 "
            >
                {isLoading
                    ? `${
                          submitButtonText.endsWith("e")
                              ? submitButtonText.slice(
                                    0,
                                    submitButtonText.length - 1
                                ) + "ing..."
                              : submitButtonText + "ing..."
                      }`
                    : submitButtonText}
            </button>
        </div>
    );
}

export default FormButtons;
