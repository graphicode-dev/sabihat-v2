import { TableHead } from "./TableHead";
import { SortConfig, TableColumn, TableData } from "../../types/table";
import TableRow from "./TableRow";

interface TableGridViewProps {
    data: TableData[];
    columns: TableColumn[];
    onRowSelection?: (rowId: string, selected: boolean) => void;
    onSelectAll: (selected: boolean) => void;
    sortConfig?: SortConfig | null;
    onSort?: (column: string) => void;
    columnWidths: number[];
    onColumnResize: (index: number, width: number) => void;
    onRowClick?: (rowId: string) => void;
}

export const TableGridView = ({
    data,
    columns,
    onRowSelection,
    onSelectAll,
    sortConfig,
    onSort,
    columnWidths,
    onColumnResize,
    onRowClick,
}: TableGridViewProps) => {
    // Check if all rows are selected
    const allSelected = data.length > 0 && data.every((row) => row.selected);

    // Handle row selection
    const handleRowSelection = (rowId: string, selected: boolean) => {
        if (onRowSelection) {
            onRowSelection(rowId, selected);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHead
                    allSelected={allSelected}
                    onSelectAll={onSelectAll}
                    columns={columns}
                    sortConfig={sortConfig}
                    onSort={onSort}
                    columnWidths={columnWidths}
                    onColumnResize={onColumnResize}
                />
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                            >
                                No results.
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <TableRow
                                key={index}
                                row={row}
                                columns={columns}
                                columnWidths={columnWidths}
                                handleRowSelection={handleRowSelection}
                                onRowClick={onRowClick}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
