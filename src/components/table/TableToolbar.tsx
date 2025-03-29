import { useState } from "react";
import { ViewMode, TableColumn, FilterConfig } from "../../types/table";
import { TableFilter } from "./TableFilter";

interface TableToolbarProps {
    totalItems: number;
    currentView: ViewMode;
    onViewChange: (view: ViewMode) => void;
    onSearch: (query: string) => void;
    columns: TableColumn[];
    onApplyFilters: (filters: FilterConfig[]) => void;
    activeFilters: FilterConfig[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    itemsPerPage: number;
    onItemsPerPageChange: (count: number) => void;
}

export const TableToolbar = ({
    totalItems,
    currentView,
    onViewChange,
    onSearch,
    columns,
    onApplyFilters,
    activeFilters,
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    onItemsPerPageChange,
}: TableToolbarProps) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex flex-1 flex-row justify-between items-center gap-4 mt-4 space-y-4">
            {/* Search & Filter */}
            <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                    {/* Search Icon */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-dark-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Search Input */}
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="py-3.5 px-10 rounded-[100px] border border-dark-50 placeholder:text-dark-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 w-full sm:w-64"
                    />
                </div>

                <TableFilter
                    columns={columns}
                    activeFilters={activeFilters}
                    onApplyFilters={onApplyFilters}
                />
            </div>

            {/* Pagination & Action Buttons */}
            <div className="flex items-center gap-5">
                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        {/* Page Navigation */}
                        <div className="flex items-center">
                            {/* Previous Button */}
                            <div
                                className={`w-10 h-10 rounded-full flex justify-center items-center border ${
                                    currentPage === 1
                                        ? "border-dark-50 text-dark-200 cursor-not-allowed"
                                        : "border-dark-200 hover:bg-dark-50 text-dark-200"
                                }`}
                            >
                                <button
                                    type="button"
                                    title="Previous page"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        currentPage === 1
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "hover:bg-dark-50 text-dark-200"
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Page Numbers */}
                            <div className="flex items-center">
                                {/* First Page */}
                                <div
                                    className={`w-10 h-10 rounded-full flex justify-center items-center mx-1 ${
                                        currentPage === 1
                                            ? "bg-emerald-500 text-white"
                                            : "border border-dark-50 text-dark-200 hover:bg-dark-50"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => onPageChange(1)}
                                        className={`flex items-center justify-center w-full h-full rounded-full font-bold`}
                                    >
                                        01
                                    </button>
                                </div>

                                {/* Show second page or ellipsis */}
                                {totalPages > 1 && (
                                    <div
                                        className={`w-10 h-10 rounded-full flex justify-center items-center mx-1 ${
                                            currentPage === 2
                                                ? "bg-emerald-500 text-white"
                                                : "border border-dark-50 text-dark-200 hover:bg-dark-50"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onPageChange(2)}
                                            className={`flex items-center justify-center w-full h-full rounded-full font-bold`}
                                        >
                                            02
                                        </button>
                                    </div>
                                )}

                                {/* Ellipsis if many pages */}
                                {totalPages > 3 && (
                                    <div className="w-10 h-10 rounded-full flex justify-center items-center mx-1 border border-dark-50 text-dark-200 hover:bg-dark-50">
                                        <button
                                            type="button"
                                            className={`flex items-center justify-center w-full h-full rounded-full font-bold`}
                                            disabled
                                        >
                                            ...
                                        </button>
                                    </div>
                                )}

                                {/* Last page if not already shown */}
                                {totalPages > 2 && (
                                    <div
                                        className={`w-10 h-10 rounded-full flex justify-center items-center mx-1 ${
                                            currentPage === totalPages
                                                ? "bg-emerald-500 text-white"
                                                : "border border-dark-50 text-dark-200 hover:bg-dark-50"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onPageChange(totalPages)
                                            }
                                            className={`flex items-center justify-center w-full h-full rounded-full font-bold`}
                                        >
                                            {totalPages < 10
                                                ? `0${totalPages}`
                                                : totalPages}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Next Button */}
                            <div
                                className={`w-10 h-10 rounded-full flex justify-center items-center border ${
                                    currentPage === totalPages
                                        ? "border-dark-50 text-dark-200 cursor-not-allowed"
                                        : "border-dark-200 hover:bg-dark-50 text-dark-200"
                                }`}
                            >
                                <button
                                    type="button"
                                    title="Next page"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        currentPage === totalPages
                                            ? "text-gray-300 cursor-not-allowed"
                                            : "hover:bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
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
                        </div>
                    </div>
                </div>

                {/* View Mode */}
                <button
                    type="button"
                    onClick={() => {
                        // Cycle through view modes: grid -> cards -> group -> grid
                        const nextView =
                            currentView === "grid"
                                ? "cards"
                                : currentView === "cards"
                                ? "group"
                                : "grid";
                        onViewChange(nextView);
                    }}
                    className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"
                    title={`Current: ${currentView} view (click to change)`}
                >
                    {currentView === "grid" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    )}
                    {currentView === "cards" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                            />
                        </svg>
                    )}
                    {currentView === "group" && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                    )}
                </button>

                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"></div>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"></div>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"></div>
                <div className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"></div>
            </div>
        </div>
    );
};
