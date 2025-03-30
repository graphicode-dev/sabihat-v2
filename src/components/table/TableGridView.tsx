import { FC } from "react";
import { TableData, TableColumn, SortConfig } from "../../types/table";
import { TableCheckbox } from "./TableCheckbox";
import { TableAvatar } from "./TableAvatar";
import { SortableHeader } from "./SortableHeader";

interface TableGridViewProps {
    data: TableData[];
    columns: TableColumn[];
    onRowSelection: (id: string) => void;
    onSelectAll: (selected: boolean) => void;
    sortConfig?: SortConfig | null;
    onSort?: (column: string) => void;
}

export const TableGridView: FC<TableGridViewProps> = ({
    data,
    columns,
    onRowSelection,
    onSelectAll,
    sortConfig,
    onSort,
}) => {
    const allSelected = data.length > 0 && data.every((item) => item.selected);

    return (
        <div className="overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="w-12 px-6 py-3 text-left"
                            >
                                <TableCheckbox
                                    checked={allSelected}
                                    onChange={() => onSelectAll(!allSelected)}
                                />
                            </th>

                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-dark-200 uppercase tracking-wider"
                                >
                                    <SortableHeader
                                        column={column.accessorKey}
                                        sortable={column.sortable !== false}
                                        sortConfig={sortConfig || null}
                                        onSort={onSort}
                                    >
                                        {column.header}
                                    </SortableHeader>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
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
                            data.map((item) => (
                                <tr
                                    key={item.id}
                                    className={
                                        item.selected
                                            ? "bg-green-50"
                                            : "hover:bg-green-50"
                                    }
                                >
                                    <td className="px-6 py-4 whitespace-nowrap rounded-l-xl">
                                        <TableCheckbox
                                            checked={!!item.selected}
                                            onChange={() =>
                                                onRowSelection(item.id)
                                            }
                                        />
                                    </td>

                                    {columns.map((column, index) => (
                                        <td
                                            key={column.id}
                                            className={`px-6 py-4 whitespace-nowrap text-dark-200 ${
                                                index === columns.length - 1 ? "rounded-r-xl" : ""
                                            }`}
                                        >
                                            {index === 0 &&
                                            item.avatar ? (
                                                <div className="flex items-center gap-2">
                                                    <TableAvatar
                                                        src={item.avatar}
                                                        initials={String(
                                                            item.columns[
                                                                column
                                                                    .accessorKey
                                                            ] || ""
                                                        ).substring(0, 2)}
                                                    />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {
                                                            item.columns[
                                                                column
                                                                    .accessorKey
                                                            ]
                                                        }
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-dark-500">
                                                    {
                                                        item.columns[
                                                            column.accessorKey
                                                        ]
                                                    }
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
