import React from "react";

// Define TypeScript interfaces for the component
export interface TableItem {
    name: string;
    [key: string]: string | number; // Dynamic values for different years/columns
}

export interface TableCategory {
    title?: string;
    items: TableItem[];
    totals?: { [key: string]: string | number };
}

export interface ColumnDefinition {
    key: string;
    header: string;
    className?: string;
}

export interface ReportingTableProps {
    data: TableCategory[];
    columns: ColumnDefinition[];
    showTotals?: boolean;
    totalRowLabel?: string;
    className?: string;
    balance?: { [key: string]: string | number };
    balanceLabel?: string;
}

const BalanceSheetTable: React.FC<ReportingTableProps> = ({
    data,
    columns,
    showTotals = true,
    totalRowLabel = "Total",
    className = "",
    balance,
    balanceLabel = "Balance",
}) => {
    // Calculate the grid template columns based on the number of columns
    const gridTemplateColumns = `minmax(200px, 1fr) ${Array(columns.length - 1)
        .fill("minmax(100px, 1fr)")
        .join(" ")}`;

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Column Headers - Only shown once at the top */}
            <div className="overflow-x-auto">
                <div
                    className="w-full grid gap-x-4"
                    style={{ gridTemplateColumns }}
                >
                    {columns.map((column, colIndex) => (
                        <div
                            key={colIndex}
                            className={`text-xl py-3 px-5 font-bold text-primary-500 ${
                                colIndex === 0 ? "text-left" : "text-right"
                            }`}
                        >
                            {column.header}
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            {data.map((category, categoryIndex) => {
                return (
                    <div key={categoryIndex} className="overflow-x-auto">
                        {/* Category Title */}
                        {category.title && (
                            <div className="text-xl text-left py-3 px-4 font-bold text-primary-500">
                                {category.title}
                            </div>
                        )}

                        {/* Category Items */}
                        {category.items.map((item, itemIndex) => (
                            <div
                                key={itemIndex}
                                className="w-full grid gap-x-4 border-b border-gray-100"
                                style={{ gridTemplateColumns }}
                            >
                                <div className="py-3 px-4 text-left">
                                    {item.name}
                                </div>
                                {columns.slice(1).map((column, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="py-3 px-4 text-right"
                                    >
                                        {item[column.key] || 0}
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Category Total */}
                        {showTotals && (
                            <div
                                className="w-full grid gap-x-4 bg-green-50 rounded-3xl"
                                style={{ gridTemplateColumns }}
                            >
                                <div className="py-3 px-4 text-primary-500 text-left font-bold">
                                    {totalRowLabel} {category.title}
                                </div>
                                {columns.slice(1).map((column, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="py-3 px-4 text-right text-primary-500 font-bold"
                                    >
                                        {category.totals &&
                                        category.totals[column.key] !==
                                            undefined
                                            ? category.totals[column.key]
                                            : column.key || 0}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            {/* Balance Row */}
            {balance && (
                <div className="overflow-x-auto">
                    <div
                        className="w-full grid gap-x-4"
                        style={{ gridTemplateColumns }}
                    >
                        <div className="text-xl py-3 px-4 text-primary-500 underline text-left">
                            {balanceLabel}
                        </div>
                        {columns.slice(1).map((column, colIndex) => (
                            <div
                                key={colIndex}
                                className="text-xl py-3 px-4 text-right text-primary-500 underline"
                            >
                                {balance[column.key] !== undefined
                                    ? balance[column.key]
                                    : "0"}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BalanceSheetTable;
