import { useEffect, useState } from "react";
import DatePicker from "../../ui/Calendar/DatePicker";
import ReportingTable, { ReportingTableColumn } from "../ReportingTable";

function TrialBalance() {
    const columns: ReportingTableColumn[] = [
        {
            id: "record no",
            header: "Record No",
            accessorKey: "record no",
        },
        {
            id: "ledger account",
            header: "Ledger Account",
            accessorKey: "ledger account",
        },
        {
            id: "debit-initial",
            header: "Debit",
            accessorKey: "debit-initial",
            subTitle: "initial",
        },
        {
            id: "credit-initial",
            header: "Credit",
            accessorKey: "credit-initial",
            subTitle: "initial",
        },
        {
            id: "debit-current",
            header: "Debit",
            accessorKey: "debit-current",
            subTitle: "current",
        },
        {
            id: "credit-current",
            header: "Credit",
            accessorKey: "credit-current",
            subTitle: "current",
        },
        {
            id: "debit-end",
            header: "Debit",
            accessorKey: "debit-end",
            subTitle: "end",
        },
        {
            id: "credit-end",
            header: "Credit",
            accessorKey: "credit-end",
            subTitle: "end",
        },
        {
            id: "created at",
            header: "Created At",
            accessorKey: "created at",
            hidden: true,
        },
    ];
    const data = [
        {
            id: "001",
            "record no": "001",
            "ledger account": "Cash",
            "debit-initial": "1000",
            "credit-initial": "200",
            "debit-current": "1500",
            "credit-current": "300",
            "debit-end": "1800",
            "credit-end": "400",
            "created at": "2025-07-01",
        },
        {
            id: "002",
            "record no": "002",
            "ledger account": "Accounts Receivable",
            "debit-initial": "500",
            "credit-initial": "100",
            "debit-current": "800",
            "credit-current": "150",
            "debit-end": "900",
            "credit-end": "200",
            "created at": "2025-07-03",
        },
        {
            id: "003",
            "record no": "003",
            "ledger account": "Inventory",
            "debit-initial": "300",
            "credit-initial": "50",
            "debit-current": "350",
            "credit-current": "75",
            "debit-end": "400",
            "credit-end": "100",
            "created at": "2025-07-06",
        },
        {
            id: "004",
            "record no": "004",
            "ledger account": "Equipment",
            "debit-initial": "2000",
            "credit-initial": "400",
            "debit-current": "2500",
            "credit-current": "500",
            "debit-end": "2800",
            "credit-end": "600",
            "created at": "2025-08-06",
        },
        {
            id: "005",
            "record no": "005",
            "ledger account": "Accounts Payable",
            "debit-initial": "700",
            "credit-initial": "600",
            "debit-current": "750",
            "credit-current": "800",
            "debit-end": "800",
            "credit-end": "900",
            "created at": "2025-09-06",
        },
    ];

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [filteredData, setFilteredData] = useState<typeof data>(data);

    useEffect(() => {
        // Apply filters to data
        const filtered = data.filter((item) => {
            // Filter by date range if both dates are provided
            if (startDate instanceof Date && endDate instanceof Date) {
                const itemDate = new Date(item["created at"]);

                // Set time to beginning of day for start date comparison
                const startDateCopy = new Date(startDate);
                startDateCopy.setHours(0, 0, 0, 0);

                // Set time to end of day for end date comparison
                const endDateCopy = new Date(endDate);
                endDateCopy.setHours(23, 59, 59, 999);

                // Check if item date is within range (inclusive)
                return itemDate >= startDateCopy && itemDate <= endDateCopy;
            }

            // If only one date is provided or no dates provided, include the item
            return true;
        });

        setFilteredData(filtered);
    }, [startDate, endDate]);

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-start items-center gap-5">
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
                </div>

                {/* Table */}
                <div className="mt-6">
                    <ReportingTable
                        columns={columns}
                        data={filteredData}
                        coloredColumns
                    />
                </div>
            </div>
        </div>
    );
}

export default TrialBalance;
