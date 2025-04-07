/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { TableHead } from "./TableHead";
import { SortConfig, TableColumn, TableData } from "../../types/table";
import { CheckBox } from "../ui/CheckBox";
import { TableAvatar } from "./TableAvatar";
import { getInitials } from "../../lib/tableUtils";

interface TableGroupViewProps {
    data: TableData[];
    columns: TableColumn[];
    onRowSelection?: (rowId: string, selected: boolean) => void;
    onSelectAll: (selected: boolean) => void;
    sortConfig?: SortConfig | null;
    onSort?: (column: string) => void;
    columnWidths: number[];
    onColumnResize: (index: number, width: number) => void;
}

export const TableGroupView = ({
    data,
    columns,
    onRowSelection,
    onSelectAll,
    sortConfig,
    onSort,
    columnWidths,
    onColumnResize,
}: TableGroupViewProps) => {
    // Group the data by group property
    const groupedData: Record<string, TableData[]> = {};
    const [expandedGroups, setExpandedGroups] = useState<
        Record<string, boolean>
    >({});

    // Check if all data is selected
    const allSelected = data.length > 0 && data.every((item) => item.selected);

    data.forEach((row) => {
        const groupName = row.group || "Ungrouped";
        if (!groupedData[groupName]) {
            groupedData[groupName] = [];
        }
        groupedData[groupName].push(row);
    });

    // Initialize expanded state for all groups
    useEffect(() => {
        const initialExpandedState: Record<string, boolean> = {};
        Object.keys(groupedData).forEach((groupName, index) => {
            // Only expand the second group by default (for demo purposes)
            initialExpandedState[groupName] = index === 1;
        });
        setExpandedGroups(initialExpandedState);
    }, []);

    // Update group checkbox states based on their items
    useEffect(() => {
        const newGroupState: Record<string, boolean> = {};

        Object.entries(groupedData).forEach(([groupName, groupRows]) => {
            if (groupRows.length === 0) {
                newGroupState[groupName] = false;
            } else {
                newGroupState[groupName] = groupRows.every(
                    (row) => row.selected
                );
            }
        });
    }, [data]);

    // Handle toggling group expansion

    const toggleGroupExpansion = (groupName: string) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupName]: !prev[groupName],
        }));
    };

    return (
        <div className="space-y-6">
            {Object.entries(groupedData).length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                    No data available
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-2">
                        <TableHead
                            allSelected={allSelected}
                            onSelectAll={onSelectAll}
                            columns={columns}
                            sortConfig={sortConfig}
                            onSort={onSort}
                            columnWidths={columnWidths}
                            onColumnResize={onColumnResize}
                        />

                        <tbody>
                            {Object.entries(groupedData).map(
                                ([groupName, groupRows]) => (
                                    <React.Fragment key={groupName}>
                                        {/* Group Header Row */}
                                        <tr
                                            className={`${
                                                expandedGroups[groupName]
                                                    ? "bg-primary-50"
                                                    : ""
                                            } hover:bg-primary-50 cursor-pointer`}
                                        >
                                            <td
                                                colSpan={columns.length + 1}
                                                className="py-3 px-2 rounded-xl"
                                            >
                                                <div className="flex justify-between items-center gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="flex items-center gap-1"
                                                            onClick={() =>
                                                                toggleGroupExpansion(
                                                                    groupName
                                                                )
                                                            }
                                                        >
                                                            {expandedGroups[
                                                                groupName
                                                            ] ? (
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
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 9l-7 7-7-7"
                                                                    />
                                                                </svg>
                                                            ) : (
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
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M9 5l7 7-7 7"
                                                                    />
                                                                </svg>
                                                            )}
                                                            <h3 className="font-medium">
                                                                {groupName}
                                                            </h3>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <p>
                                                            {groupRows.length}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Group Data Rows */}
                                        {expandedGroups[groupName] &&
                                            groupRows.map((row) => {
                                                const name = String(
                                                    row.columns.name || ""
                                                );
                                                return (
                                                    <tr
                                                        key={row.id}
                                                        className={`${
                                                            row.selected
                                                                ? "bg-primary-50"
                                                                : "hover:bg-primary-50"
                                                        }`}
                                                    >
                                                        <td className="px-2 py-4 whitespace-nowrap rounded-l-xl">
                                                            <CheckBox
                                                                checked={
                                                                    !!row.selected
                                                                }
                                                                onChange={() =>
                                                                    onRowSelection &&
                                                                    onRowSelection(
                                                                        row.id,
                                                                        !!row.selected
                                                                    )
                                                                }
                                                            />
                                                        </td>

                                                        {columns.map(
                                                            (column, index) => (
                                                                <td
                                                                    key={`${row.id}-${column.id}`}
                                                                    className={`py-4 text-dark-200 text-left ${
                                                                        index ===
                                                                        columns.length -
                                                                            1
                                                                            ? "rounded-r-xl"
                                                                            : ""
                                                                    }`}
                                                                    style={{
                                                                        width: columnWidths[
                                                                            index
                                                                        ]
                                                                            ? `${columnWidths[index]}px`
                                                                            : "200px",
                                                                        minWidth:
                                                                            "50px",
                                                                        maxWidth:
                                                                            columnWidths[
                                                                                index
                                                                            ]
                                                                                ? `${columnWidths[index]}px`
                                                                                : "200px",
                                                                        overflow:
                                                                            "hidden",
                                                                        whiteSpace:
                                                                            "nowrap",
                                                                        textOverflow:
                                                                            "ellipsis",
                                                                        padding:
                                                                            "0 16px",
                                                                    }}
                                                                >
                                                                    <div className="truncate">
                                                                        {index ===
                                                                        0 ? (
                                                                            <div className="flex items-center gap-2">
                                                                                {row.avatar && (
                                                                                    <TableAvatar
                                                                                        src={
                                                                                            row.avatar
                                                                                        }
                                                                                        initials={getInitials(
                                                                                            name
                                                                                        )}
                                                                                    />
                                                                                )}
                                                                                <span className="text-sm font-medium text-gray-900">
                                                                                    {
                                                                                        row
                                                                                            .columns[
                                                                                            column
                                                                                                .accessorKey
                                                                                        ]
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-sm text-dark-500">
                                                                                {
                                                                                    row
                                                                                        .columns[
                                                                                        column
                                                                                            .accessorKey
                                                                                    ]
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                );
                                            })}
                                    </React.Fragment>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
