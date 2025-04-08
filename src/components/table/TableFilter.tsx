import { useState } from "react";
import { TableColumn } from "../../types/table";
import { CheckBox } from "../ui/CheckBox";

interface TableFilterProps {
    columns: TableColumn[];
    activeFilters: string[];
    onFilterSelect: (filterId: string) => void;
    selectedGroups?: string[];
    onGroupSelect?: (groupId: string) => void;
}

export const TableFilter = ({
    columns,
    activeFilters,
    onFilterSelect,
    selectedGroups = [],
    onGroupSelect,
}: TableFilterProps) => {
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    
    // Group columns by their category for better organization
    const groupableColumns = columns.filter(col => 
        // You can customize this logic based on which columns should be groupable
        col.id !== 'actions' && col.id !== 'avatar'
    );
    
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className={`flex justify-center items-center gap-1 p-3 w-12 h-12 text-sm font-medium rounded-full ${
                    activeFilters.length > 0 || selectedGroups.length > 0
                        ? "bg-primary-100 text-primary-800"
                        : "bg-white border border-dark-50 text-dark-200 hover:bg-gray-50"
                }`}
                aria-expanded={showFilterMenu}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                </svg>
                {(activeFilters.length > 0 || selectedGroups.length > 0) && (
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {activeFilters.length + selectedGroups.length}
                    </span>
                )}
                <span className="sr-only">Filter</span>
            </button>

            {showFilterMenu && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-dark-50 z-50">
                    <div className="flex justify-between items-center">
                        {/* Filters */}
                        <div className="w-1/2 flex flex-col justify-center items-center">
                            <h3 className="p-3">Filters</h3>
                            <div className="flex flex-col">
                                {columns.map((column) => (
                                    <div
                                        key={column.id}
                                        className="flex items-start py-2 hover:bg-dark-50"
                                    >
                                        <CheckBox
                                            checked={activeFilters.includes(
                                                column.id
                                            )}
                                            onChange={() => {
                                                onFilterSelect(column.id);
                                            }}
                                        />
                                        <label
                                            htmlFor={`filter-${column.id}`}
                                            className="ml-2 block text-sm text-dark-900"
                                        >
                                            {column.header}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Group by */}
                        {onGroupSelect && (
                            <div className="w-1/2 flex flex-col justify-center items-center">
                                <h3 className="p-3">Group by</h3>
                                <div className="flex flex-col">
                                    {/* Option to clear all groups */}
                                    {selectedGroups.length > 0 && (
                                        <div
                                            className="flex items-center px-3 py-2 hover:bg-dark-50 cursor-pointer"
                                            onClick={() => {
                                                // Clear all groups
                                                selectedGroups.forEach(
                                                    (groupId) => {
                                                        onGroupSelect(groupId);
                                                    }
                                                );
                                            }}
                                        >
                                            <span className="text-sm text-dark-900">
                                                Clear all groups
                                            </span>
                                        </div>
                                    )}

                                    {groupableColumns.map((column) => (
                                        <div
                                            key={column.id}
                                            className="flex items-center px-3 py-2 hover:bg-dark-50"
                                        >
                                            <CheckBox
                                                checked={selectedGroups.includes(
                                                    column.id
                                                )}
                                                onChange={() => {
                                                    onGroupSelect(column.id);
                                                }}
                                            />
                                            <label
                                                htmlFor={`group-${column.id}`}
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

                    {/* Close Button */}
                    <div className="p-3 border-t border-dark-50 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowFilterMenu(false)}
                            className="px-3 py-1 text-sm text-dark-900 hover:text-primary-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
