import { TableColumn, TableData } from "../../types/table";
import { CheckBox } from "../ui/CheckBox";
import { TableAvatar } from "./TableAvatar";

function TableRow({
    row,
    columns,
    columnWidths,
    handleRowSelection,
}: {
    row: TableData;
    columns: TableColumn[];
    columnWidths: number[];
    handleRowSelection: (rowId: string, selected: boolean) => void;
}) {
    return (
        <tr
            key={row.id}
            className={`${
                row.selected ? "bg-primary-50" : ""
            } hover:bg-gray-50`}
        >
            <td className="px-6 py-4 whitespace-nowrap">
                <CheckBox
                    checked={!!row.selected}
                    onChange={() => handleRowSelection(row.id, !!row.selected)}
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
                                        row.columns[column.accessorKey] || ""
                                    ).substring(0, 2)}
                                />
                                <span className="text-sm font-medium text-gray-900">
                                    {row.columns[column.accessorKey]}
                                </span>
                            </div>
                        ) : (
                            <span className="text-sm text-dark-500">
                                {row.columns[column.accessorKey]}
                            </span>
                        )}
                    </div>
                </td>
            ))}
        </tr>
    );
}

export default TableRow;
