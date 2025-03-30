/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useCallback } from "react";
import {
    TableData,
    TableColumn,
    ViewMode,
    FilterConfig,
    SortConfig,
} from "../../types/table";
import { TableToolbar } from "./TableToolbar";
import { TableGridView } from "./TableGridView";
import { TableCardView } from "./TableCardView";
import { TableGroupView } from "./TableGroupView";
import {
    filterData,
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
    const [activeFilters, setActiveFilters] = useState<FilterConfig[]>([]);
    const [tableData, setTableData] = useState<TableData[]>(
        data.map((item) => ({ ...item, selected: false }))
    );
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const [columnWidths, setColumnWidths] = useState<number[]>(
        columns.map(() => 200) // Default width of 200px
    );

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

    const handleApplyFilters = useCallback((filters: FilterConfig[]) => {
        setActiveFilters(filters);
        setCurrentPage(1); // Reset to first page when filters change
    }, []);

    const handleSort = useCallback((column: string) => {
        setSortConfig((current) => toggleSort(column, current));
    }, []);

    const filteredData = useMemo(() => {
        return filterData(tableData, searchQuery, activeFilters);
    }, [tableData, searchQuery, activeFilters]);

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

    // Handle column resize
    const handleColumnResize = useCallback((index: number, width: number) => {
        console.log('DynamicTable: Resizing column', index, 'to width', width);
        
        // Update the column widths state
        setColumnWidths(prevWidths => {
            const newWidths = [...prevWidths];
            newWidths[index] = width;
            return newWidths;
        });
        
        // Try to update all cells in the column for immediate visual feedback
        try {
            const table = document.querySelector('table');
            if (table) {
                const rows = table.querySelectorAll('tbody tr');
                rows.forEach(row => {
                    const cells = row.querySelectorAll('td');
                    // +1 because of the checkbox column
                    if (cells.length > index + 1) {
                        const cell = cells[index + 1] as HTMLTableCellElement;
                        cell.style.width = `${width}px`;
                        cell.style.minWidth = `${width}px`;
                    }
                });
            }
        } catch (error) {
            console.error('Error updating table cells:', error);
        }
    }, []);

    const renderTableView = () => {
        const viewProps = {
            data: currentData,
            columns,
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
            case "group":
                return <TableGroupView {...viewProps} />;
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
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                            >
                                {bulkActionLabel}
                            </button>
                        )}
                        {onAddClick && (
                            <button
                                onClick={onAddClick}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-4 rounded-[100px] flex items-center"
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
                    onApplyFilters={handleApplyFilters}
                    activeFilters={activeFilters}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                />

                <div className="mt-2">{renderTableView()}</div>
            </div>
        </div>
    );
};
