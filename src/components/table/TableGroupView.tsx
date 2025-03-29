/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { TableData, TableColumn } from "../../types/table";
import { TableAvatar } from "./TableAvatar";
import { getInitials } from "../../lib/tableUtils";
import { TableCheckbox } from "./TableCheckbox";
import { SortableHeader } from "./SortableHeader";
import { SortConfig } from "../../types/table";

interface TableGroupViewProps {
    data: TableData[];
    columns: TableColumn[];
    onRowSelection: (id: string) => void;
    onSelectAll: (selected: boolean) => void;
    sortConfig?: SortConfig | null;
    onSort?: (column: string) => void;
}

export const TableGroupView = ({
    data,
    columns,
    onRowSelection,
    onSelectAll,
    sortConfig,
    onSort,
}: TableGroupViewProps) => {
    // Group the data by group property
    const groupedData: Record<string, TableData[]> = {};
    const [groupSelectState, setGroupSelectState] = useState<
        Record<string, boolean>
    >({});
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

        setGroupSelectState(newGroupState);
    }, [data]);

    // Handle selection of all rows in a group
    const handleGroupSelect = (groupName: string) => {
        const newState = !groupSelectState[groupName];
        const groupRowIds = groupedData[groupName].map((row) => row.id);

        // Update the group's checkbox state
        setGroupSelectState({
            ...groupSelectState,
            [groupName]: newState,
        });

        // For each row in the group, call the onRowSelection if its state is different
        groupRowIds.forEach((id) => {
            const row = data.find((r) => r.id === id);
            if (row && !!row.selected !== newState) {
                onRowSelection(id);
            }
        });
    };

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
                    <table className="min-w-full">
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
                                            onSort={onSort || (() => {})}
                                        >
                                            {column.header}
                                        </SortableHeader>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupedData).map(([groupName, groupRows]) => (
                                <React.Fragment key={groupName}>
                                    {/* Group Header Row */}
                                    <tr className="hover:bg-green-50 cursor-pointer">
                                        <td colSpan={columns.length + 1} className="px-6 py-3">
                                            <div className="flex items-center gap-3">
                                                <TableCheckbox
                                                    checked={groupSelectState[groupName] || false}
                                                    onChange={() => handleGroupSelect(groupName)}
                                                />
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 h-4 bg-emerald-500 rounded" />
                                                    <div
                                                        className="flex items-center gap-1"
                                                        onClick={() => toggleGroupExpansion(groupName)}
                                                    >
                                                        {expandedGroups[groupName] ? (
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
                                                                    strokeWidth={2}
                                                                    d="M9 5l7 7-7 7"
                                                                />
                                                            </svg>
                                                        )}
                                                        <h3 className="font-medium">
                                                            {groupName}
                                                        </h3>
                                                    </div>
                                                    <span className="text-xs text-dark-200">
                                                        ({groupRows.length})
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Group Data Rows */}
                                    {expandedGroups[groupName] && groupRows.map((row) => {
                                        const name = String(row.columns.name || "");
                                        return (
                                            <tr
                                                key={row.id}
                                                className={
                                                    row.selected
                                                        ? "bg-green-50"
                                                        : "hover:bg-green-50"
                                                }
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <TableCheckbox
                                                        checked={!!row.selected}
                                                        onChange={() => onRowSelection(row.id)}
                                                    />
                                                </td>
                                                {columns.map((column, index) => (
                                                    <td
                                                        key={`${row.id}-${column.id}`}
                                                        className="px-6 py-4 whitespace-nowrap text-dark-200"
                                                    >
                                                        {index === 0 && row.avatar ? (
                                                            <div className="flex items-center gap-2">
                                                                <TableAvatar
                                                                    src={row.avatar}
                                                                    initials={getInitials(name)}
                                                                    size="sm"
                                                                />
                                                                <span className="text-sm text-dark-500">
                                                                    {String(
                                                                        row.columns[column.accessorKey] || ""
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-dark-500">
                                                                {String(
                                                                    row.columns[column.accessorKey] || ""
                                                                )}
                                                            </span>
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
