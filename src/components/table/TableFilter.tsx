import { useState } from "react";
import { TableColumn, FilterConfig, FilterOperator } from "../../types/table";

interface TableFilterProps {
    columns: TableColumn[];
    activeFilters: FilterConfig[];
    onApplyFilters: (filters: FilterConfig[]) => void;
}

export const TableFilter = ({
    columns,
    activeFilters,
    onApplyFilters,
}: TableFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterConfig[]>(activeFilters);

    const operators: { value: FilterOperator; label: string }[] = [
        { value: "equals", label: "Equals" },
        { value: "contains", label: "Contains" },
        { value: "startsWith", label: "Starts with" },
        { value: "endsWith", label: "Ends with" },
        { value: "greaterThan", label: "Greater than" },
        { value: "lessThan", label: "Less than" },
    ];

    const addFilter = () => {
        if (columns.length === 0) return;

        const newFilter: FilterConfig = {
            column: columns[0].accessorKey,
            operator: "contains",
            value: "",
        };

        setFilters([...filters, newFilter]);
    };

    const removeFilter = (index: number) => {
        const newFilters = [...filters];
        newFilters.splice(index, 1);
        setFilters(newFilters);
    };

    const updateFilter = (
        index: number,
        field: keyof FilterConfig,
        value: string
    ) => {
        const newFilters = [...filters];
        newFilters[index] = {
            ...newFilters[index],
            [field]: value,
        };
        setFilters(newFilters);
    };

    const handleApply = () => {
        // Filter out incomplete filters
        const validFilters = filters.filter(
            (filter) =>
                filter.column && filter.operator && filter.value.trim() !== ""
        );
        onApplyFilters(validFilters);
        setIsOpen(false);
    };

    const handleClear = () => {
        setFilters([]);
        onApplyFilters([]);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex justify-center items-center gap-1 p-3 w-12 h-12 text-sm font-medium rounded-full ${
                    activeFilters.length > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white border border-dark-50 text-dark-200 hover:bg-gray-50"
                }`}
                aria-expanded={isOpen}
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
                <span className="sr-only">Filter</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-96 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium">Filter data</h3>
                        <button
                            type="button"
                            title="Close"
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-500"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {filters.length === 0 ? (
                            <div className="text-center py-4 text-sm text-gray-500">
                                No filters applied. Add a filter to narrow down
                                results.
                            </div>
                        ) : (
                            filters.map((filter, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 pb-4 border-b"
                                >
                                    <div className="flex justify-between">
                                        <span className="text-xs font-medium text-gray-500">
                                            Filter {index + 1}
                                        </span>
                                        <button
                                            type="button"
                                            title="Remove filter"
                                            onClick={() => removeFilter(index)}
                                            className="text-gray-400 hover:text-red-500"
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
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2">
                                        <select
                                            title="Select column"
                                            value={filter.column}
                                            onChange={(e) =>
                                                updateFilter(
                                                    index,
                                                    "column",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                        >
                                            {columns.map((column) => (
                                                <option
                                                    key={column.id}
                                                    value={column.accessorKey}
                                                >
                                                    {column.header}
                                                </option>
                                            ))}
                                        </select>

                                        <select
                                            title="Select operator"
                                            value={filter.operator}
                                            onChange={(e) =>
                                                updateFilter(
                                                    index,
                                                    "operator",
                                                    e.target
                                                        .value as FilterOperator
                                                )
                                            }
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                        >
                                            {operators.map((op) => (
                                                <option
                                                    key={op.value}
                                                    value={op.value}
                                                >
                                                    {op.label}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="text"
                                            value={filter.value}
                                            onChange={(e) =>
                                                updateFilter(
                                                    index,
                                                    "value",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Filter value"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={addFilter}
                            className="inline-flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 border border-emerald-200"
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
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add filter
                        </button>

                        <div className="flex gap-2">
                            <button
                                onClick={handleClear}
                                className="rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300"
                            >
                                Clear all
                            </button>
                            <button
                                onClick={handleApply}
                                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                            >
                                Apply filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
