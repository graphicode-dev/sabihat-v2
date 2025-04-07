import { useState, useRef, useEffect } from "react";
import { ViewMode, TableColumn, FilterConfig } from "../../types/table";
import { TableFilter } from "./TableFilter";
import { FileExportIcon, PDFIcon, VerticalFilter, XFile } from "../ui/icons";
import Pagination from "../ui/Pagination";
import { usePagination } from "../../hooks/usePagination";
import { CheckBox } from ".";

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
    onColumnVisibilityChange?: (visibleColumns: string[]) => void;
    visibleColumns?: string[];
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
    // @ts-expect-error - Prop is required by interface but not used in this component
    onItemsPerPageChange,
    onColumnVisibilityChange,
    visibleColumns = [],
}: TableToolbarProps) => {
    const [searchValue, setSearchValue] = useState("");
    const [showColumnMenu, setShowColumnMenu] = useState(false);
    const [localVisibleColumns, setLocalVisibleColumns] = useState<string[]>(
        visibleColumns.length > 0
            ? visibleColumns
            : columns.map((col) => col.id)
    );
    const columnMenuRef = useRef<HTMLDivElement>(null);

    // Update local state when prop changes
    useEffect(() => {
        if (visibleColumns.length > 0) {
            setLocalVisibleColumns(visibleColumns);
        }
    }, [visibleColumns]);

    useEffect(() => {
        // Close the menu when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                columnMenuRef.current &&
                !columnMenuRef.current.contains(event.target as Node)
            ) {
                setShowColumnMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = (value: string) => {
        onSearch(value);
    };

    const handleColumnToggle = (columnId: string) => {
        let updatedVisibleColumns: string[];

        if (localVisibleColumns.includes(columnId)) {
            // Don't allow removing the last visible column
            if (localVisibleColumns.length === 1) {
                return;
            }
            updatedVisibleColumns = localVisibleColumns.filter(
                (id) => id !== columnId
            );
        } else {
            updatedVisibleColumns = [...localVisibleColumns, columnId];
        }

        setLocalVisibleColumns(updatedVisibleColumns);

        // Notify parent component about column visibility changes
        if (onColumnVisibilityChange) {
            onColumnVisibilityChange(updatedVisibleColumns);
        }
    };

    const {
        currentPage: paginationPage,
        goToNextPage,
        goToPreviousPage,
        setPage,
    } = usePagination(currentPage, onPageChange, totalPages);

    return (
        <div className="flex flex-1 flex-row flex-wrap justify-between items-center gap-4 mt-4">
            {/* Search & Filter */}
            <div className="flex items-center flex-wrap gap-2">
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
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchValue(value);
                            handleSearch(value);
                        }}
                        placeholder="Search..."
                        className="py-3.5 px-10 rounded-[100px] border border-dark-50 placeholder:text-dark-200 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 w-64 md:w-full"
                    />
                </div>

                <TableFilter
                    columns={columns}
                    activeFilters={activeFilters}
                    onApplyFilters={onApplyFilters}
                />
            </div>

            {/* Pagination & Action Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-5">
                {/* Pagination */}
                <Pagination
                    currentPage={paginationPage}
                    totalPages={totalPages}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                />

                <div className="flex items-center justify-center flex-wrap gap-2">
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

                    {/* Export */}
                    <button
                        type="button"
                        onClick={() => {}}
                        className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"
                    >
                        <FileExportIcon width={20} height={20} />
                        <span className="sr-only">Export</span>
                    </button>

                    {/* PDF */}
                    <button
                        type="button"
                        onClick={() => {}}
                        className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"
                    >
                        <PDFIcon width={22} height={22} />
                        <span className="sr-only">PDF</span>
                    </button>

                    {/* X File */}
                    <button
                        type="button"
                        onClick={() => {}}
                        className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"
                    >
                        <XFile width={22} height={22} />
                        <span className="sr-only">X File</span>
                    </button>

                    {/* Vertical Filter */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowColumnMenu(!showColumnMenu)}
                            className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"
                        >
                            <VerticalFilter width={22} height={22} />
                            <span className="sr-only">Column Visibility</span>
                        </button>

                        {/* Column Visibility Menu */}
                        {showColumnMenu && (
                            <div
                                ref={columnMenuRef}
                                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-dark-50 z-10"
                            >
                                <div className="p-3 border-b border-dark-50">
                                    <h3 className="text-sm font-medium text-dark-900">
                                        Show/Hide Columns
                                    </h3>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {columns.map((column) => (
                                        <div
                                            key={column.id}
                                            className="flex items-center px-3 py-2 hover:bg-dark-50"
                                        >
                                            <CheckBox
                                                checked={localVisibleColumns.includes(
                                                    column.id
                                                )}
                                                onChange={() => {
                                                    handleColumnToggle(
                                                        column.id
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor={`column-${column.id}`}
                                                className="ml-2 block text-sm text-dark-900"
                                            >
                                                {column.header}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
