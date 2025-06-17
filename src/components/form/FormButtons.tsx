import { useNavigate, useLocation } from "react-router-dom";

interface FormButtonProps {
    className?: string;
    isLoading?: boolean;
    submitText?: string;
    cancelText?: string;
    disabled?: boolean;
    removeCancel?: boolean;
    onCancel?: () => void;
}

function FormButtons({
    className,
    isLoading,
    submitText = "Submit",
    cancelText,
    disabled,
    removeCancel,
    onCancel,
}: FormButtonProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const submitButtonText =
        submitText.charAt(0).toUpperCase() + submitText.slice(1) || "Submit";

    // Handle cancel with proper navigation that preserves the tab parameter
    const handleCancel = () => {
        if (onCancel) {
            // Use custom cancel handler if provided
            onCancel();
        } else {
            // Default navigation behavior with tab parameter preservation
            const searchParams = new URLSearchParams(location.search);
            const tabParam = searchParams.get("tab");

            // If we're on a page with a tab parameter, we need to navigate to the parent route
            // This handles the case where we're on a route like /path/to/edit/1?tab=something
            if (tabParam) {
                // Get the current path parts
                const pathParts = location.pathname.split("/");

                // Remove the last part (typically 'edit/id') to go back to the parent route
                pathParts.pop(); // Remove id
                if (pathParts[pathParts.length - 1] === "edit") {
                    pathParts.pop(); // Remove edit if present
                }

                // Navigate to the parent route
                navigate(pathParts.join("/"));
            } else {
                // Standard back navigation if no tab parameter
                navigate(-1);
            }
        }
    };
    return (
        <div
            className={`ps-5 flex justify-start items-center gap-2 ${className}`}
        >
            {/* Cancel Button */}
            {!removeCancel && (
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleCancel}
                    className="form-button-cancel disabled:opacity-50 "
                >
                    {cancelText || "Cancel"}
                </button>
            )}

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
