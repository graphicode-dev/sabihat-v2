import React from "react";

export interface ReportingTableColumn {
    id: string;
    header: string;
    accessorKey: string;
    className?: string;
    align?: "left" | "right" | "center";
    isNumeric?: boolean;
    subTitle?: string;
    hidden?: boolean;
}

export interface ReportingTableRow {
    id: string;
    [key: string]: any;
}

export interface ReportingTableProps {
    columns: ReportingTableColumn[];
    data: ReportingTableRow[];
    className?: string;
    visibleColumns?: string[];
    onRowClick?: (row: ReportingTableRow) => void;
    emptyMessage?: string;
    coloredColumns?: boolean;
}

const ReportingTable: React.FC<ReportingTableProps> = ({
    columns,
    data,
    className = "",
    visibleColumns,
    onRowClick,
    emptyMessage = "No data available",
    coloredColumns = false,
}) => {
    const filteredColumns = visibleColumns
        ? columns.filter((col) => visibleColumns.includes(col.id))
        : columns.filter((col) => !col.hidden);

    const filteredData = data.filter((row) => {
        return filteredColumns.every((col) => row[col.accessorKey]);
    });

    // Generate grid template columns based on number of columns
    const gridTemplateColumns = `repeat(${filteredColumns.length}, minmax(120px, 1fr))`;

    return (
        <div className={`w-full ${className}`}>
            {data.length === 0 ? (
                <div className="flex justify-center items-center h-40 text-dark-200">
                    {emptyMessage}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    {/* Header */}
                    <div
                        className="grid gap-x-4 font-medium mb-5"
                        style={{ gridTemplateColumns }}
                    >
                        {filteredColumns.map((column) => (
                            <div
                                key={column.id}
                                className={`py-3 px-4 ${
                                    coloredColumns
                                        ? "text-primary-500"
                                        : "text-dark-200"
                                } ${
                                    column.align === "right" || column.isNumeric
                                        ? "text-right"
                                        : column.align === "center"
                                        ? "text-center"
                                        : "text-left"
                                } ${column.className || ""}`}
                            >
                                {column.header}{" "}
                                {column.subTitle && (
                                    <span className="text-xs text-dark-200 capitalize">
                                        ({column.subTitle})
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {filteredData.map((row) => (
                        <div
                            key={row.id}
                            className={`grid gap-x-4 border-b border-gray-100 hover:bg-gray-50 ${
                                Number(row.id) % 2 === 0 ? "bg-gray-50" : ""
                            } ${onRowClick ? "cursor-pointer" : ""}`}
                            style={{ gridTemplateColumns }}
                            onClick={() => onRowClick && onRowClick(row)}
                        >
                            {filteredColumns.map((column) => (
                                <div
                                    key={`${row.id}-${column.id}`}
                                    className={`py-3 px-4 ${
                                        column.align === "right" ||
                                        column.isNumeric
                                            ? "text-right"
                                            : column.align === "center"
                                            ? "text-center"
                                            : "text-left"
                                    } ${column.className || ""}`}
                                >
                                    {row[column.accessorKey] || "-"}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportingTable;
