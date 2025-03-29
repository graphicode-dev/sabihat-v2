import React, { useState, ReactNode } from "react";

interface TableGroupRowsWrapperProps {
    children: ReactNode;
    groupTitle: string;
    groupValue?: string;
    isOpen?: boolean;
    onToggle?: () => void;
    isSelectable?: boolean;
    isSelected?: boolean;
    onSelect?: (selected: boolean) => void;
}

function TableGroupRowsWrapper({
    children,
    groupTitle,
    groupValue,
    isOpen: initialIsOpen = false,
    onToggle,
    isSelectable = false,
    isSelected = false,
    onSelect,
}: TableGroupRowsWrapperProps) {
    const [isOpenInternal, setIsOpenInternal] = useState(initialIsOpen);
    
    // Use either controlled or uncontrolled state
    const isOpen = onToggle ? initialIsOpen : isOpenInternal;
    
    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setIsOpenInternal(!isOpenInternal);
        }
    };
    
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="border-b border-gray-200">
            <div 
                className={`flex items-center py-3 px-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors ${isSelected ? 'bg-green-50' : ''}`}
                onClick={handleToggle}
            >
                {isSelectable && (
                    <div className="pr-3">
                        <label className="inline-flex items-center cursor-pointer">
                            <span className="sr-only">Select group</span>
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-green-500"
                                checked={isSelected}
                                onChange={(e) => onSelect && onSelect(e.target.checked)}
                                onClick={handleCheckboxClick}
                                aria-label="Select group"
                            />
                        </label>
                    </div>
                )}
                
                <div className="flex items-center flex-1">
                    <div className="mr-2">
                        <svg 
                            className={`h-5 w-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                    <div className="font-medium">{groupTitle}</div>
                </div>
                
                {groupValue && (
                    <div className="text-gray-500 text-sm">{groupValue}</div>
                )}
            </div>
            
            {isOpen && (
                <div className="pl-6">
                    {children}
                </div>
            )}
        </div>
    );
}

export default TableGroupRowsWrapper;
