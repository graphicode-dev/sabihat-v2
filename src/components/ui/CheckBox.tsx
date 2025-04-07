import { FC } from "react";

interface CheckBoxProps {
    checked: boolean;
    onChange: () => void;
    className?: string;
}

export const CheckBox: FC<CheckBoxProps> = ({
    checked,
    onChange,
    className = "",
}: CheckBoxProps) => {
    return (
        <div
            className={`flex h-4 w-4 items-center justify-center rounded border cursor-pointer ${
                checked
                    ? "border-primary-500 bg-primary-500"
                    : "border-dark-200 bg-white"
            } ${className}`}
            onClick={onChange}
            role="checkbox"
            aria-checked={checked}
            aria-label="Select row"
            title="Select row"
        >
            {checked && (
                <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </div>
    );
};
