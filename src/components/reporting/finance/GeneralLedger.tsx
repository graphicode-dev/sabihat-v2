import { useEffect, useRef, useState } from "react";
import DatePicker from "../../ui/Calendar/DatePicker";
import ReportingDropDown from "../ReportingDropDown";
import { VerticalFilter } from "../../ui/icons";
import { CheckBox } from "../../ui/CheckBox";
import ReportingTable, { ReportingTableColumn } from "../ReportingTable";

function GeneralLedger() {
    const columns: ReportingTableColumn[] = [
        {
            id: "date",
            header: "Date",
            accessorKey: "date",
        },
        {
            id: "Doc-Reference",
            header: "Doc Reference",
            accessorKey: "Doc-Reference",
        },
        {
            id: "Journal No",
            header: "Journal No",
            accessorKey: "Journal No",
        },
        {
            id: "account",
            header: "Account",
            accessorKey: "account",
        },
        {
            id: "userName",
            header: "User Name",
            accessorKey: "userName",
        },
        {
            id: "debit",
            header: "Debit",
            accessorKey: "debit",
        },
        {
            id: "credit",
            header: "Credit",
            accessorKey: "credit",
        },
        {
            id: "note",
            header: "Note",
            accessorKey: "note",
        },
        {
            id: "serviceType",
            header: "Service Type",
            accessorKey: "serviceType",
        },
    ];
    const data = [
        {
            id: "1",
            date: "2023-05-27",
            "Doc-Reference": "Doc-001",
            "Journal No": "JN-001",
            account: "Account-001",
            userName: "User A",
            debit: "100.00",
            credit: "0.00",
            note: "Payment received",
            serviceType: "Type A",
        },
        {
            id: "2",
            date: "2023-05-28",
            "Doc-Reference": "Doc-002",
            "Journal No": "JN-002",
            account: "Account-002",
            userName: "User B",
            debit: "200.00",
            credit: "0.00",
            note: "Service fee",
            serviceType: "Type B",
        },
    ];

    // State for filter functionality
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [pendingFilters, setPendingFilters] = useState<string[]>([]);
    const [localVisibleColumns, setLocalVisibleColumns] = useState<string[]>(
        columns.map((col) => col.id)
    );
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [accounts] = useState<{ key: string; value: string }[]>([
        {
            key: "All Accounts",
            value: "All Accounts",
        },
        {
            key: "Cash",
            value: "Cash",
        },
        {
            key: "Bank",
            value: "Bank",
        },
        {
            key: "Accounts Receivable",
            value: "Accounts Receivable",
        },
        {
            key: "Accounts Payable",
            value: "Accounts Payable",
        },
        {
            key: "Inventory",
            value: "Inventory",
        },
        {
            key: "Fixed Assets",
            value: "Fixed Assets",
        },
        {
            key: "Current Liabilities",
            value: "Current Liabilities",
        },
        {
            key: "Long-Term Liabilities",
            value: "Long-Term Liabilities",
        },
        {
            key: "Equity",
            value: "Equity",
        },
    ]);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
    const [users] = useState<{ key: string; value: string }[]>([
        {
            key: "All Users",
            value: "All Users",
        },
        {
            key: "User 1",
            value: "User 1",
        },
        {
            key: "User 2",
            value: "User 2",
        },
    ]);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [serviceTypes] = useState<{ key: string; value: string }[]>([
        {
            key: "All Service Types",
            value: "All Service Types",
        },
        {
            key: "Service Type 1",
            value: "Service Type 1",
        },
        {
            key: "Service Type 2",
            value: "Service Type 2",
        },
    ]);
    const [selectedServiceType, setSelectedServiceType] = useState<
        string | null
    >(null);
    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const columnMenuRef = useRef<HTMLDivElement>(null);
    const filterMenuRef = useRef<HTMLDivElement>(null);

    const onFilterSelect = (filterId: string) => {
        setPendingFilters((prevFilters) => {
            if (prevFilters.includes(filterId)) {
                return prevFilters.filter((id) => id !== filterId);
            } else {
                return [...prevFilters, filterId];
            }
        });
    };

    const handleColumnToggle = (columnId: string) => {
        let updatedVisibleColumns: string[];

        if (localVisibleColumns.includes(columnId)) {
            // Don't allow removing the last visible column
            if (localVisibleColumns.length === 1) {
                return;
            }
            updatedVisibleColumns = localVisibleColumns.filter(
                (id) => id !== columnId
            );
        } else {
            updatedVisibleColumns = [...localVisibleColumns, columnId];
        }

        setLocalVisibleColumns(updatedVisibleColumns);
    };

    // Filter data based on active filters, date range, and dropdown selections
    const [filteredData, setFilteredData] = useState<typeof data>(data);

    useEffect(() => {
        // Apply filters to data
        const filtered = data.filter((item) => {
            // If there are active column filters, check if this row should be included
            if (activeFilters.length > 0) {
                let shouldInclude = false;
                for (const columnId of activeFilters) {
                    const column = columns.find((col) => col.id === columnId);
                    if (
                        column &&
                        item[column.accessorKey as keyof typeof item]
                    ) {
                        shouldInclude = true;
                        break;
                    }
                }

                if (!shouldInclude) {
                    return false;
                }
            }
            // If no column filters are active, continue with other filters

            // Filter by date range
            const itemDate = new Date(item.date);
            if (startDate instanceof Date && endDate instanceof Date) {
                if (itemDate < startDate || itemDate > endDate) {
                    return false;
                }
            } else if (startDate instanceof Date) {
                if (itemDate < startDate) {
                    return false;
                }
            } else if (endDate instanceof Date) {
                if (itemDate > endDate) {
                    return false;
                }
            }

            // Filter by account
            if (
                selectedAccount &&
                selectedAccount !== "All Accounts" &&
                item.account !== selectedAccount
            ) {
                return false;
            }

            // Filter by user
            if (
                selectedUser &&
                selectedUser !== "All Users" &&
                item.userName !== selectedUser
            ) {
                return false;
            }

            // Filter by service type
            if (
                selectedServiceType &&
                selectedServiceType !== "All Service Types" &&
                item.serviceType !== selectedServiceType
            ) {
                return false;
            }

            return true;
        });

        setFilteredData(filtered);
    }, [
        activeFilters,
        startDate,
        endDate,
        selectedAccount,
        selectedUser,
        selectedServiceType,
    ]);

    useEffect(() => {
        // Close the menus when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (
                columnMenuRef.current &&
                !columnMenuRef.current.contains(event.target as Node)
            ) {
                setShowColumnMenu(false);
            }

            if (
                filterMenuRef.current &&
                !filterMenuRef.current.contains(event.target as Node)
            ) {
                setShowFilterMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-start items-center gap-5">
                    {/* Filter */}
                    <div className="relative" ref={filterMenuRef}>
                        <button
                            type="button"
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                            className={`flex justify-center items-center gap-1 p-3 w-12 h-12 text-sm font-medium rounded-full ${
                                activeFilters.length > 0
                                    ? "bg-primary-100 text-primary-800"
                                    : "bg-white border border-dark-50 text-dark-200 hover:bg-gray-50"
                            }`}
                            aria-expanded={showFilterMenu}
                        >
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
                                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                />
                            </svg>
                            {activeFilters.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {activeFilters.length}
                                </span>
                            )}
                            <span className="sr-only">Filter</span>
                        </button>

                        {showFilterMenu && (
                            <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-dark-50 z-50">
                                <div className="p-4">
                                    <h3 className="text-base font-medium mb-3">
                                        Column Filters
                                    </h3>
                                    <div className="flex flex-col w-full space-y-2">
                                        {columns.map((column) => (
                                            <div
                                                key={column.id}
                                                className="flex items-start py-2 hover:bg-dark-50"
                                            >
                                                <CheckBox
                                                    checked={pendingFilters.includes(
                                                        column.id
                                                    )}
                                                    onChange={() =>
                                                        onFilterSelect(
                                                            column.id
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor={`filter-${column.id}`}
                                                    className="ml-2 block text-sm text-dark-900"
                                                >
                                                    {column.header}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="p-3 border-t border-dark-50 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Clear all filters
                                            setPendingFilters([]);
                                        }}
                                        className="px-3 py-1 text-sm text-dark-700 hover:text-dark-900 border border-dark-200 rounded-md hover:bg-gray-50"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Apply the pending filters
                                            setActiveFilters([
                                                ...pendingFilters,
                                            ]);
                                            setShowFilterMenu(false);
                                        }}
                                        className="px-3 py-1 text-sm text-white bg-primary-500 rounded-md hover:bg-primary-600"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Start Date */}
                    <div>
                        <DatePicker
                            value={startDate}
                            onChange={setStartDate}
                            label="Start Date"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <DatePicker
                            value={endDate}
                            onChange={setEndDate}
                            label="End Date"
                        />
                    </div>

                    {/* Accounts */}
                    <div className="w-1/7">
                        <ReportingDropDown
                            options={accounts}
                            value={selectedAccount}
                            onChange={(value) => setSelectedAccount(value)}
                            placeholder="Select Account"
                        />
                    </div>

                    {/* User */}
                    <div className="w-1/7">
                        <ReportingDropDown
                            options={users}
                            value={selectedUser}
                            onChange={(value) => setSelectedUser(value)}
                            placeholder="Select User"
                        />
                    </div>

                    {/* Service Type */}
                    <div className="w-1/7">
                        <ReportingDropDown
                            options={serviceTypes}
                            value={selectedServiceType}
                            onChange={(value) => setSelectedServiceType(value)}
                            placeholder="Select Service Type"
                        />
                    </div>

                    {/* Vertical Filter */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowColumnMenu(!showColumnMenu)}
                            className="w-10 h-10 rounded-full flex justify-center items-center border border-dark-50 text-dark-200 hover:bg-dark-50"
                        >
                            <VerticalFilter width={22} height={22} />
                            <span className="sr-only">Column Visibility</span>
                        </button>

                        {/* Column Visibility Menu */}
                        {showColumnMenu && (
                            <div
                                ref={columnMenuRef}
                                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-dark-50 z-50"
                            >
                                <div className="p-3 border-b border-dark-50">
                                    <h3 className="text-sm font-medium text-dark-900">
                                        Show/Hide Columns
                                    </h3>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {columns.map((column) => (
                                        <div
                                            key={column.id}
                                            className="flex items-center px-3 py-2 hover:bg-dark-50"
                                        >
                                            <CheckBox
                                                checked={localVisibleColumns.includes(
                                                    column.id
                                                )}
                                                onChange={() => {
                                                    handleColumnToggle(
                                                        column.id
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor={`column-${column.id}`}
                                                className="ml-2 block text-sm text-dark-900"
                                            >
                                                {column.header}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6">
                    <ReportingTable
                        columns={columns}
                        data={filteredData}
                        visibleColumns={localVisibleColumns}
                    />
                </div>
            </div>
        </div>
    );
}

export default GeneralLedger;
