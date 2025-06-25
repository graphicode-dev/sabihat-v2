import { CheckBox } from "../ui/CheckBox";

function FormCheckBoxWrapper({
    parentClassName,
    labelClassName,
    label,
    isChecked,
    handleCheck,
    children,
    labelWidth,
}: {
    parentClassName?: string;
    labelClassName?: string;
    label?: string;
    isChecked: boolean;
    handleCheck: () => void;
    children: React.ReactNode;
    labelWidth?: string;
}) {
    return (
        <div className={`w-full flex items-center ${parentClassName}`}>
            <div className="flex items-center">
                <div className="w-[20px]">
                    <CheckBox checked={isChecked} onChange={handleCheck} />
                </div>
                {label && (
                    <label
                        className={`cursor-pointer text-left text-sm text-primary-500 ${labelClassName}`}
                        style={{
                            width: labelWidth ? `${labelWidth}px` : "200px",
                        }}
                        onClick={handleCheck}
                    >
                        {label}
                    </label>
                )}
            </div>

            {children}
        </div>
    );
}

export default FormCheckBoxWrapper;
