import { TableHead } from "./TableHead";
import { SortConfig, TableColumn, TableData } from "../../types/table";
import { TableAvatar } from "./TableAvatar";

interface TableGridViewProps {
    data: TableData[];
    columns: TableColumn[];
    onRowSelection?: (rowId: string, selected: boolean) => void;
    onSelectAll: (selected: boolean) => void;
    sortConfig?: SortConfig | null;
    onSort?: (column: string) => void;
    columnWidths: number[];
    onColumnResize: (index: number, width: number) => void;
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
                        data.map((row) => (
                            <tr
                                key={row.id}
                                className={`${
                                    row.selected ? "bg-primary-50" : ""
                                } hover:bg-gray-50`}
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                        checked={row.selected || false}
                                        onChange={(e) =>
                                            handleRowSelection(
                                                row.id,
                                                e.target.checked
                                            )
                                        }
                                        aria-label={`Select row ${row.id}`}
                                        title={`Select row ${row.id}`}
                                    />
                                </td>
                                {columns.map((column, index) => (
                                    <td
                                        key={`${row.id}-${column.id}`}
                                        className="px-6 py-4 text-sm text-gray-500"
                                        style={{
                                            width: columnWidths[index]
                                                ? `${columnWidths[index]}px`
                                                : "200px",
                                            minWidth: "50px",
                                            maxWidth: columnWidths[index]
                                                ? `${columnWidths[index]}px`
                                                : "200px",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <div className="truncate">
                                            {index === 0 && row.avatar ? (
                                                <div className="flex items-center gap-2">
                                                    <TableAvatar
                                                        src={row.avatar}
                                                        initials={String(
                                                            row.columns[
                                                                column
                                                                    .accessorKey
                                                            ] || ""
                                                        ).substring(0, 2)}
                                                    />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {
                                                            row.columns[
                                                                column
                                                                    .accessorKey
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-dark-500">
                                                    {
                                                        row.columns[
                                                            column.accessorKey
                                                        ]
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
