import React from "react";

interface TableRowProps {
    data?: {
        [key: string]: React.ReactNode;
    };
    isSelected?: boolean;
    onSelect?: (selected: boolean) => void;
    onRowClick?: () => void;
    className?: string;
}

function TableRow({
    data = {},
    isSelected = false,
    onSelect,
    onRowClick,
    className = "",
}: TableRowProps) {
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div 
            className={`flex items-center py-4 px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-green-50' : ''} ${className}`}
            onClick={onRowClick}
        >
            <div className="pr-4">
                <label className="inline-flex items-center cursor-pointer">
                    <span className="sr-only">Select row</span>
                    <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-green-500"
                        checked={isSelected}
                        onChange={(e) => onSelect && onSelect(e.target.checked)}
                        onClick={handleCheckboxClick}
                        aria-label="Select row"
                    />
                </label>
            </div>
            
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex-1 truncate">
                    {value}
                </div>
            ))}
        </div>
    );
}

export default TableRow;
