import { useEffect, useState } from "react";

type ToggleButtonProps = {
    initialChecked?: boolean;
    onToggle?: (checked: boolean) => void;
};

const ToggleButton = ({
    initialChecked = false,
    onToggle,
}: ToggleButtonProps) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    useEffect(() => {
        setIsChecked(initialChecked); // Sync with updated props
    }, [initialChecked]);

    const handleToggle = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        if (onToggle) {
            onToggle(newCheckedState); // Call parent function if provided
        }
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                aria-label="Toggle"
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                className="sr-only peer"
            />
            <div className="peer relative w-9 h-5 rounded-full border border-dark-50 peer-checked:border-primary-500">
                <div
                    className={`absolute top-1 w-2 h-2 border border-gray-300 rounded-full transition-transform ${
                        isChecked
                            ? "left-5 bg-primary-500"
                            : "left-1 bg-dark-100"
                    }`}
                ></div>
            </div>
        </label>
    );
};

export default ToggleButton;
