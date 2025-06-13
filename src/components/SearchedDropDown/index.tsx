import { useState, useRef, useEffect } from "react";
import { Input } from "./Input";
import { ChevronDown } from "lucide-react";
import FormFieldWrapper from "../ui/FormFieldWrapper";
import { Control, Controller } from "react-hook-form";

interface SearchedDropDownProps {
    options: { key: string; value: string }[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    emptyText?: string;
    disabled?: boolean;
    className?: string;
    width?: "full" | "fit";
    label?: string;
    required?: boolean;
    control: Control<any>;
    name: string;
}

export function SearchedDropDown({
    options,
    value,
    onChange,
    placeholder = "Search...",
    emptyText = "No results found",
    disabled = false,
    className = "",
    width = "full",
    label,
    required,
    control,
    name,
}: SearchedDropDownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const filteredOptions = options.filter((option) =>
        option?.value?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div
                    {...field}
                    ref={dropdownRef}
                    className={`relative group ${
                        width === "full" ? "w-full" : "w-fit"
                    } ${className}`}
                >
                    <FormFieldWrapper label={label} required={required}>
                        <button
                            type="button"
                            className={`peer form-input overflow-hidden`}
                            onClick={() => !disabled && setIsOpen(!isOpen)}
                            disabled={disabled}
                        >
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500" />
                            <span className="mr-2 block text-left truncate">
                                {value
                                    ? options.find(
                                          (o) => String(o.key) === String(value)
                                      )?.value
                                    : placeholder}
                            </span>
                        </button>

                        {isOpen && !disabled && (
                            <div
                                className={`absolute right-0 z-10 w-full mt-2 rounded-2xl shadow-lg bg-primary-50 p-3 transition-all duration-200 ease-in-out ${
                                    isOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-2 pointer-events-none"
                                }`}
                            >
                                <Input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder={placeholder}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-primary-50 text-gray-900 rounded-2xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />

                                <div className="max-h-48 overflow-y-auto">
                                    {filteredOptions.length > 0 ? (
                                        filteredOptions.map((option) => (
                                            <div
                                                key={option.key}
                                                className="block px-4 py-2 text-gray-900 hover:bg-primary-100 active:bg-primary-200 cursor-pointer rounded-2xl"
                                                onClick={() => {
                                                    onChange(option.key);
                                                    field.onChange(option.key);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                {option.value}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="block px-4 py-2 text-gray-500">
                                            {emptyText}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </FormFieldWrapper>
                </div>
            )}
        />
    );
}
