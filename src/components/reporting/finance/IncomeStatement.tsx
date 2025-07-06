import { useEffect, useState } from "react";
import DatePicker from "../../ui/Calendar/DatePicker";

function IncomeStatement() {
    const data = [
        {
            "created at": "2023-01-01",
            hidden: true,
        },
        {
            "cost of income": 100,
        },
        {
            "gross income": 200,
        },
        {
            "selling expenses": 300,
        },
        {
            "general & admin expenses": 400,
        },
        {
            "net income before tax": 500,
        },
        {
            total: 600,
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
                // Skip items without a date
                if (!item["created at"]) {
                    return true; // Include items without dates
                }
                
                const itemDate = new Date(item["created at"] as string);

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

                {/* Income Statement Table */}
                {filteredData.length > 0 ? (
                    <div className="mt-6 overflow-hidden">
                        <div className="bg-white">
                            {/* Title */}
                            <div className="px-4 py-3">
                                <h3 className="text-xl text-green-600 font-medium text-left">
                                    Income
                                </h3>
                            </div>

                            {/* Data */}
                            {filteredData
                                .filter((item) => !item.hidden && !item.total)
                                .map((item, index) => {
                                    const key = Object.keys(item)[0];
                                    const value =
                                        item[key as keyof typeof item];
                                    return (
                                        <div key={index}>
                                            <div className="flex justify-between px-4 py-3">
                                                <span className="text-gray-700">
                                                    {key
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        key
                                                            .slice(1)
                                                            .replace(/_/g, " ")}
                                                </span>
                                                <span className="text-gray-700">
                                                    {value}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}

                            {/* Total Row */}
                            {filteredData
                                .filter((item) => "total" in item)
                                .map((item, index) => (
                                    <div
                                        key={`total-${index}`}
                                        className="bg-green-50"
                                    >
                                        <div className="flex justify-between px-4 py-3">
                                            <span className="text-green-600 font-medium">
                                                Total
                                            </span>
                                            <span className="text-green-600 font-medium">
                                                {item.total}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-6">
                        <span className="text-gray-500">
                            No data available for the selected date range.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default IncomeStatement;
