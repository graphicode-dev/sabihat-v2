import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../SearchedDropDown/Input";

interface ReportingDropDownProps {
    options: { key: string; value: string }[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    disabled?: boolean;
}

function ReportingDropDown({
    options,
    value,
    onChange,
    placeholder,
    searchPlaceholder = "Search...",
    emptyText = "No results found",
    disabled = false,
}: ReportingDropDownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const selectedOption = options.find((option) => option.value === value);
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

    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };
    return (
        <div className="relative w-full">
            <button
                type="button"
                className={`peer form-input overflow-hidden px-2 py-0 ${
                    selectedOption ? "ring-primary-500" : ""
                }`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
            >
                <span
                    className={`truncate ${
                        selectedOption ? "text-primary-500" : "text-dark-100"
                    }`}
                >
                    {selectedOption?.value
                        ? selectedOption?.value
                        : placeholder}
                </span>
            </button>

            {isOpen && !disabled && (
                <div
                    ref={dropdownRef}
                    className={`absolute right-0 z-10 w-full mt-2 rounded-3xl shadow-lg bg-white py-5 px-6 transition-all duration-200 ease-in-out ${
                        isOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                >
                    {/* Corners */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary-500 rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary-500 rounded-bl-3xl" />

                    {/* Search */}

                    {isSearchOpen ? (
                        <div className="w-[97%] relative transition-all duration-300 ease-in-out">
                            <Input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-primary-50 text-gray-900 rounded-2xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />

                            <X
                                onClick={handleSearchClick}
                                className="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                            />
                        </div>
                    ) : (
                        <div
                            className="group cursor-pointer bg-dark-50 hover:bg-dark-100 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
                            onClick={handleSearchClick}
                        >
                            <Search
                                className="text-dark-100 group-hover:text-white"
                                width={20}
                                height={20}
                            />
                        </div>
                    )}

                    {/* Options */}
                    <div className="max-h-48 mt-2 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.key}
                                    className="block px-4 py-2 text-gray-900 hover:bg-primary-100 active:bg-primary-200 cursor-pointer rounded-2xl"
                                    onClick={() => {
                                        onChange(option.key);
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
        </div>
    );
}

export default ReportingDropDown;
