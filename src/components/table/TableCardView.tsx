import { TableData, TableColumn } from "../../types/table";
import { TableAvatar } from "./TableAvatar";
import { getInitials } from "../../lib/tableUtils";
import { TableCheckbox } from "./TableCheckbox";

interface TableCardViewProps {
    data: TableData[];
    columns: TableColumn[];
    onRowSelection: (id: string) => void;
}

export const TableCardView = ({
    data,
    columns,
    onRowSelection,
}: TableCardViewProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.length === 0 ? (
                <div className="col-span-3 p-8 text-center text-gray-500">
                    No data available
                </div>
            ) : (
                data.map((row) => {
                    const name = String(row.columns.name || "");
                    return (
                        <div
                            key={row.id}
                            className={`bg-white rounded-lg border p-4 relative group transition-all ${
                                row.selected
                                    ? "border-emerald-500 bg-emerald-50/30"
                                    : "border-gray-200 hover:border-emerald-200"
                            }`}
                        >
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500 rounded-tr-md" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500 rounded-br-md" />
                            <div className="absolute top-2 left-2">
                                <TableCheckbox
                                    checked={!!row.selected}
                                    onChange={() => onRowSelection(row.id)}
                                />
                            </div>

                            <div className="flex flex-col gap-3 pt-6">
                                <div className="flex items-center gap-3">
                                    <TableAvatar
                                        src={row.avatar}
                                        initials={getInitials(name)}
                                        size="md"
                                    />
                                    <div>
                                        <div className="font-medium">
                                            {name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {row.columns[
                                                columns[2]?.accessorKey
                                            ] || ""}{" "}
                                            •{" "}
                                            {row.columns[
                                                columns[3]?.accessorKey
                                            ] || ""}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-200" />

                                <div className="grid grid-cols-1 gap-2">
                                    {columns.slice(1, 4).map((column) => (
                                        <div
                                            key={column.id}
                                            className="flex flex-col"
                                        >
                                            <div className="text-xs text-gray-500">
                                                {column.header}
                                            </div>
                                            <div className="text-sm truncate">
                                                {String(
                                                    row.columns[
                                                        column.accessorKey
                                                    ] || ""
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};
