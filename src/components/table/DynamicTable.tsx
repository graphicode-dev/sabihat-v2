import { useState, useMemo, useCallback } from "react";
import {
    TableData,
    TableColumn,
    ViewMode,
    SortConfig,
} from "../../types/table";
import { TableToolbar } from "./TableToolbar";
import { TableGridView } from "./TableGridView";
import { TableCardView } from "./TableCardView";
import {
    paginateData,
    toggleSelectRow,
    toggleSelectAll,
    getSelectedCount,
    sortData,
    toggleSort,
} from "../../lib/tableUtils";

interface DynamicTableProps {
    title?: string;
    data: TableData[];
    columns: TableColumn[];
    initialView?: ViewMode;
    itemsPerPage?: number;
    onAddClick?: () => void;
    addLabel?: string;
    onBulkAction?: (selectedIds: string[]) => void;
    bulkActionLabel?: string;
}

export const DynamicTable = ({
    title = "All items",
    data,
    columns,
    initialView = "grid",
    itemsPerPage: initialItemsPerPage = 10,
    onAddClick,
    addLabel = "Add new",
    onBulkAction,
    bulkActionLabel = "Action",
}: DynamicTableProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>(initialView);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
    const [searchQuery, setSearchQuery] = useState("");
    const [tableData, setTableData] = useState<TableData[]>(
        data.map((item) => ({ ...item, selected: false }))
    );
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [columnWidths, setColumnWidths] = useState<number[]>(
        columns.map(() => 200) // Default width of 200px
    );
    const [visibleColumns, setVisibleColumns] = useState<string[]>(
        columns.map((col) => col.id)
    );
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    // Update tableData when data prop changes
    useMemo(() => {
        setTableData((prevTableData) => {
            return data.map((item) => {
                // Preserve selected state if item already exists
                const existingItem = prevTableData.find(
                    (existing) => existing.id === item.id
                );
                return {
                    ...item,
                    selected: existingItem ? existingItem.selected : false,
                };
            });
        });
    }, [data]);

    const handleSort = useCallback((column: string) => {
        setSortConfig((current) => toggleSort(column, current));
    }, []);

    // Handle filter selection
    const handleFilterSelect = useCallback((filterId: string) => {
        setSelectedFilters((prev) => {
            if (prev.includes(filterId)) {
                return prev.filter((id) => id !== filterId);
            } else {
                return [...prev, filterId];
            }
        });
    }, []);

    // Filter data based on selected filters
    const filteredData = useMemo(() => {
        let result = tableData;

        // Apply search query filter
        if (searchQuery) {
            result = result.filter((item) => {
                // Search across all column values
                return Object.values(item.columns).some((value) =>
                    String(value)
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                );
            });
        }

        // Apply column filters - only if filters are selected
        if (selectedFilters.length > 0) {
            // Don't filter the data, just keep all rows
            // This allows the selected filters to be displayed in the UI
            // without affecting the data shown in the table
            console.log("Selected filters:", selectedFilters);
        }

        return result;
    }, [tableData, searchQuery, selectedFilters]);

    const sortedData = useMemo(() => {
        return sortData(filteredData, sortConfig);
    }, [filteredData, sortConfig]);

    const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage));

    // Reset to first page when search changes
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const currentData = useMemo(() => {
        return paginateData(sortedData, currentPage, itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const handleRowSelection = useCallback((rowId: string) => {
        setTableData((currentTableData) =>
            toggleSelectRow(currentTableData, rowId)
        );
    }, []);

    const handleSelectAll = useCallback(
        (selected: boolean) => {
            const currentPageIds = currentData.map((item) => item.id);
            setTableData((currentTableData) =>
                toggleSelectAll(currentTableData, selected, currentPageIds)
            );
        },
        [currentData]
    );

    const selectedCount = useMemo(() => {
        return getSelectedCount(tableData);
    }, [tableData]);

    const selectedIds = useMemo(() => {
        return tableData.filter((item) => item.selected).map((item) => item.id);
    }, [tableData]);

    const handleBulkAction = () => {
        if (onBulkAction && selectedIds.length > 0) {
            onBulkAction(selectedIds);
        }
    };

    // Handle column visibility change
    const handleColumnVisibilityChange = useCallback((columnIds: string[]) => {
        setVisibleColumns(columnIds);
    }, []);

    // Filter columns based on visibility
    const visibleColumnsData = useMemo(() => {
        return columns.filter((column) => visibleColumns.includes(column.id));
    }, [columns, visibleColumns]);

    // Handle column resize
    const handleColumnResize = useCallback((index: number, width: number) => {
        console.log("DynamicTable: Resizing column", index, "to width", width);

        // Update the column widths state
        setColumnWidths((prevWidths) => {
            const newWidths = [...prevWidths];
            newWidths[index] = width;
            return newWidths;
        });

        // Try to update all cells in the column for immediate visual feedback
        try {
            const table = document.querySelector("table");
            if (table) {
                const rows = table.querySelectorAll("tbody tr");
                rows.forEach((row) => {
                    const cells = row.querySelectorAll("td");
                    // +1 because of the checkbox column
                    if (cells.length > index + 1) {
                        const cell = cells[index + 1] as HTMLTableCellElement;
                        cell.style.width = `${width}px`;
                        cell.style.minWidth = `${width}px`;
                    }
                });
            }
        } catch (error) {
            console.error("Error updating table cells:", error);
        }
    }, []);

    const renderTableView = () => {
        const viewProps = {
            data: currentData,
            columns: visibleColumnsData,
            onRowSelection: handleRowSelection,
            onSelectAll: handleSelectAll,
            sortConfig,
            onSort: handleSort,
            columnWidths,
            onColumnResize: handleColumnResize,
        };

        switch (viewMode) {
            case "grid":
                return <TableGridView {...viewProps} />;
            case "cards":
                return <TableCardView {...viewProps} />;
            default:
                return <TableGridView {...viewProps} />;
        }
    };

    return (
        <div className="w-full">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    {/* Title */}
                    <div>
                        <h2 className="text-lg font-bold">{title}</h2>
                        <p className="text-sm text-left text-dark-200">
                            {selectedCount > 0
                                ? `${selectedCount} of ${filteredData.length} selected`
                                : `${filteredData.length} record`}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                        {selectedCount > 0 && onBulkAction && (
                            <button
                                onClick={handleBulkAction}
                                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md"
                            >
                                {bulkActionLabel}
                            </button>
                        )}
                        {onAddClick && (
                            <button
                                onClick={onAddClick}
                                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-4 rounded-[100px] flex items-center"
                            >
                                <div className="w-6 h-6 rounded-full flex justify-center items-center mr-2 border border-white text-white">
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
                                </div>
                                {addLabel}
                            </button>
                        )}
                    </div>
                </div>

                <TableToolbar
                    totalItems={filteredData.length}
                    currentView={viewMode}
                    onViewChange={setViewMode}
                    onSearch={setSearchQuery}
                    columns={columns}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    onColumnVisibilityChange={handleColumnVisibilityChange}
                    visibleColumns={visibleColumns}
                    selectedFilters={selectedFilters}
                    onFilterSelect={handleFilterSelect}
                />

                <div className="mt-2">{renderTableView()}</div>
            </div>
        </div>
    );
};
