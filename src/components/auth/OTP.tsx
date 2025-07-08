import React, {
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    KeyboardEvent,
    ClipboardEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
    selectResetPhoneNumber,
    sendVerificationCode,
} from "../../store/slices/auth/authSlice";
import { useToast } from "../../hooks/useToast";

interface OTPProps {
    onComplete?: (code: string) => void;
    value?: string;
    onChange?: (value: string) => void;
    name?: string;
}

const OTP: React.FC<OTPProps> = ({
    onComplete,
    value: externalValue,
    onChange: externalOnChange,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { addToast } = useToast();
    const resetPhoneNumber = useSelector(selectResetPhoneNumber);

    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    // We still track if all OTP fields are filled for the parent form's submit button
    const [, setConfirmDisabled] = useState(true);
    const [internalOtp, setInternalOtp] = useState<string>("");

    // Use external value if provided, otherwise use internal state
    const otp = externalValue !== undefined ? externalValue : internalOtp;

    // Update function that handles both internal state and external onChange
    const updateOtp = (newOtp: string) => {
        setInternalOtp(newOtp);
        if (externalOnChange) {
            externalOnChange(newOtp);
        }
    };

    const otpNum = 5;

    // Create refs for each input field
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    // Track timer for resend functionality
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Track OTP state to enable/disable confirm button
    useEffect(() => {
        // Check if OTP is complete with exactly the right number of digits
        const isComplete =
            otp.length === otpNum && ![...otp].some((digit) => !digit);
        setConfirmDisabled(!isComplete);

        // Call onComplete if provided and OTP is complete
        if (isComplete && onComplete) {
            onComplete(otp);
        }
    }, [otp, otpNum, onComplete]);

    const handleResend = async () => {
        if (!canResend || !resetPhoneNumber) return;

        try {
            const result = await dispatch(
                sendVerificationCode({ phone: resetPhoneNumber })
            );
            if (result.meta.requestStatus === "fulfilled") {
                setTimer(60);
                setCanResend(false);
                addToast({
                    type: "success",
                    message: "Verification code sent successfully",
                    title: "Success",
                });
            } else {
                addToast({
                    type: "error",
                    message: "Failed to send verification code",
                    title: "Error",
                });
            }
        } catch (error) {
            addToast({
                type: "error",
                message: "Failed to send verification code",
                title: "Error",
            });
        }
    };

    // Handle paste from clipboard directly
    const handlePaste = (
        e: ClipboardEvent<HTMLInputElement>,
        index: number
    ) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text");
        if (!pasteData) return;

        // Extract only digits from pasted content
        const pastedDigits = pasteData.replace(/\D/g, "").slice(0, otpNum);
        if (!pastedDigits) return;

        // Create a new OTP array
        const newOtp = Array(otpNum).fill("");

        // Fill in the current OTP values first
        for (let i = 0; i < otpNum; i++) {
            if (otp[i]) newOtp[i] = otp[i];
        }

        // Distribute pasted digits starting from current index
        for (let i = 0; i < pastedDigits.length; i++) {
            const targetIndex = index + i;
            if (targetIndex < otpNum) {
                newOtp[targetIndex] = pastedDigits[i];
            }
        }

        const updatedOtp = newOtp.join("");
        updateOtp(updatedOtp);

        // Focus on the next empty field or the last field
        const nextEmptyIndex = newOtp.findIndex(
            (digit, idx) => idx >= index && !digit
        );
        if (nextEmptyIndex !== -1 && nextEmptyIndex < otpNum) {
            inputRefs[nextEmptyIndex]?.current?.focus();
        } else {
            // If all filled, focus on last field
            inputRefs[otpNum - 1]?.current?.focus();
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;

        // Handle paste event (detected by longer input)
        if (value.length > 1) {
            // Extract only digits from pasted content
            const pastedDigits = value.replace(/\D/g, "").slice(0, otpNum);

            // Distribute digits across input fields
            const newOtp = Array(otpNum).fill("");
            // Fill in the current OTP values first
            for (let i = 0; i < otpNum; i++) {
                if (otp[i]) newOtp[i] = otp[i];
            }

            // Distribute pasted digits starting from current index
            for (let i = 0; i < pastedDigits.length; i++) {
                const targetIndex = index + i;
                if (targetIndex < otpNum) {
                    newOtp[targetIndex] = pastedDigits[i];
                }
            }

            const updatedOtp = newOtp.join("");
            updateOtp(updatedOtp);

            // Focus on the next empty field or the last field
            const nextEmptyIndex = newOtp.findIndex(
                (digit, idx) => idx >= index && !digit
            );
            if (nextEmptyIndex !== -1 && nextEmptyIndex < otpNum) {
                inputRefs[nextEmptyIndex]?.current?.focus();
            } else {
                // If all filled, focus on last field
                inputRefs[otpNum - 1]?.current?.focus();
            }

            return;
        }

        // Allow only numbers for single character input
        if (!/^\d*$/.test(value)) return;

        // Update the OTP state
        const newOtp = otp.split("");
        newOtp[index] = value;
        const updatedOtp = newOtp.join("");
        updateOtp(updatedOtp);

        // Move focus to next input if current input is filled
        if (value && index < otpNum - 1) {
            inputRefs[index + 1]?.current?.focus();
        }
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1]?.current?.focus();
        }
    };

    // We don't need an internal submit function anymore as the form submission is handled by the parent component

    return (
        <div className="flex flex-col items-center w-full">
            {/* OTP Section */}
            <div className="mb-6 text-center">
                {/* OTP Input */}
                <div className="flex justify-center gap-2 mb-6">
                    {Array.from({ length: otpNum }, (_, index) => index).map(
                        (index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                value={otp[index] || ""}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={(e) => handlePaste(e, index)}
                                onFocus={(e) => {
                                    // Prevent selection of text in other fields
                                    e.target.select();
                                }}
                                onClick={(e) => {
                                    // Ensure cursor is at the end when clicking
                                    const target = e.target as HTMLInputElement;
                                    target.setSelectionRange(1, 1);
                                }}
                            />
                        )
                    )}
                </div>
            </div>

            {/* Resend */}
            <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-sm text-gray-500">
                    Didn't receive code?
                </span>
                {canResend ? (
                    <button
                        type="button" 
                        className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                        onClick={handleResend}
                    >
                        Resend
                    </button>
                ) : (
                    <span className="text-sm text-gray-500">
                        Resend in {formatTime(timer)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default OTP;
