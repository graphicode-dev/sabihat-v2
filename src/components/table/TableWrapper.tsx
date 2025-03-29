import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
    recordCount?: number;
    onAddClick?: () => void;
    addButtonText?: string;
    showAddButton?: boolean;
    width?: string | number;
    height?: string | number;
    showSearch?: boolean;
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    showFilters?: boolean;
    onFilterClick?: () => void;
    paginationControls?: React.ReactNode;
    actionButtons?: React.ReactNode;
};

function TableWrapper({
    children,
    className = "",
    title = "All companies",
    recordCount,
    onAddClick,
    addButtonText = "companies",
    showAddButton = true,
    width = "100%",
    height = "auto",
    showSearch = true,
    onSearch,
    searchPlaceholder = "search here...",
    showFilters = true,
    onFilterClick,
    paginationControls,
    actionButtons,
}: Props) {
    return (
        <div
            className={`w-full ${className}`}
            style={{
                width,
                height,
                display: "block",
                position: "relative",
            }}
        >
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-lg font-medium">{title}</h2>
                    {recordCount !== undefined && (
                        <p className="text-sm text-gray-500">
                            {recordCount.toLocaleString()} record
                            {recordCount !== 1 ? "s" : ""}
                        </p>
                    )}
                </div>
                {showAddButton && (
                    <button
                        onClick={onAddClick}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 flex items-center"
                        title={`Add ${addButtonText}`}
                    >
                        <span className="mr-1">+</span>
                        {addButtonText}
                    </button>
                )}
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    {showSearch && (
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
                                placeholder={searchPlaceholder}
                                onChange={(e) =>
                                    onSearch && onSearch(e.target.value)
                                }
                                aria-label="Search"
                            />
                        </div>
                    )}

                    {showFilters && (
                        <button
                            onClick={onFilterClick}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                            title="Filter"
                        >
                            <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {actionButtons}

                    {paginationControls || (
                        <div className="flex items-center space-x-1">
                            <button
                                className="p-1 rounded-md hover:bg-gray-100"
                                title="Previous page"
                            >
                                <svg
                                    className="h-5 w-5 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                01
                            </span>
                            <span className="text-gray-500">02</span>
                            <span className="text-gray-500">...</span>
                            <span className="text-gray-500">24</span>
                            <button
                                className="p-1 rounded-md hover:bg-gray-100"
                                title="Next page"
                            >
                                <svg
                                    className="h-5 w-5 text-gray-500"
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
                            </button>
                        </div>
                    )}

                    <div className="flex items-center space-x-1">
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            title="List view"
                        >
                            <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            title="Grid view"
                        >
                            <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            title="Copy"
                        >
                            <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                                />
                            </svg>
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            title="Download"
                        >
                            <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full overflow-x-auto">{children}</div>
        </div>
    );
}

export default TableWrapper;
