import React from "react";

interface TableContentWrapperProps {
    children: React.ReactNode;
    headers?: {
        id: string;
        label: string;
        sortable?: boolean;
    }[];
    onSort?: (headerId: string) => void;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
}

function TableContentWrapper({ 
    children, 
    headers = [],
    onSort,
    sortField,
    sortDirection = 'asc'
}: TableContentWrapperProps) {
    return (
        <div className="w-full">
            {headers.length > 0 && (
                <div className="flex border-b border-gray-200 py-3 bg-gray-50 px-4">
                    {headers.map((header) => (
                        <div 
                            key={header.id}
                            className="flex-1 flex items-center font-medium text-gray-500 text-sm"
                        >
                            <span>{header.label}</span>
                            {header.sortable && (
                                <button
                                    onClick={() => onSort && onSort(header.id)}
                                    className="ml-1 focus:outline-none"
                                    title={`Sort by ${header.label}`}
                                >
                                    {sortField === header.id ? (
                                        <span className="inline-block">
                                            {sortDirection === 'asc' ? (
                                                <svg 
                                                    className="h-4 w-4 text-gray-500" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M5 15l7-7 7 7" 
                                                    />
                                                </svg>
                                            ) : (
                                                <svg 
                                                    className="h-4 w-4 text-gray-500" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M19 9l-7 7-7-7" 
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                    ) : (
                                        <svg 
                                            className="h-4 w-4 text-gray-300" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" 
                                            />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {children}
        </div>
    );
}

export default TableContentWrapper;
