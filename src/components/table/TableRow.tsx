import { TableColumn, TableData } from "../../types/table";
import { CheckBox } from "../ui/CheckBox";
import { TableAvatar } from "./TableAvatar";
import { useNavigate, useLocation } from "react-router-dom";

interface TableRowProps {
    row: TableData;
    columns: TableColumn[];
    columnWidths: number[];
    handleRowSelection: (rowId: string, selected: boolean) => void;
    onRowClick?: (rowId: string) => void;
    disableRowClick?: boolean;
}

function TableRow({
    row,
    columns,
    columnWidths,
    handleRowSelection,
    onRowClick,
    disableRowClick,
}: TableRowProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRowClick = () => {
        if (onRowClick) {
            // Use the provided click handler if available
            onRowClick(row.id);
        } else {
            // Default behavior: navigate to the view page
            // Check if we're already on a view page to prevent path duplication
            if (location.pathname.includes("/view/")) {
                // Already on a view page, just update the ID parameter
                const basePath = location.pathname.split("/view/")[0];
                navigate(`${basePath}/view/${row.id}`);
            } else {
                // Not on a view page, navigate to the view page
                const currentPath = location.pathname.endsWith("/")
                    ? location.pathname.slice(0, -1)
                    : location.pathname;
                navigate(`${currentPath}/view/${row.id}`);
            }
        }
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        // Stop propagation to prevent row click when checkbox is clicked
        e.stopPropagation();
    };

    return (
        <tr
            className={`text-left ${
                row.selected ? "bg-primary-50" : ""
            } hover:bg-gray-50 cursor-pointer`}
            onClick={disableRowClick ? undefined : handleRowClick}
        >
            <td
                className="px-6 py-4 whitespace-nowrap"
                onClick={handleCheckboxClick}
            >
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
                    {column.cell ? (
                        // Use custom cell renderer if provided
                        column.cell({
                            row: {
                                ...row,
                                original: { ...row, ...row.columns },
                            },
                        })
                    ) : (
                        // Default cell rendering
                        <div className="truncate">
                            {index === 0 && row.avatar ? (
                                <div className="flex items-center gap-2">
                                    <TableAvatar
                                        src={row.avatar}
                                        initials={String(
                                            row.columns[column.accessorKey] ||
                                                ""
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
                    )}
                </td>
            ))}
        </tr>
    );
}

export default TableRow;
