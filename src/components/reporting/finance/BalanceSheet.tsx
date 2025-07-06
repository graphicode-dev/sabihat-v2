import { useState, useEffect } from "react";
import DatePicker from "../../ui/Calendar/DatePicker";
import BalanceSheetTable, { TableCategory } from "./BalanceSheetTable";
import Loading from "../../ui/Loading";

function BalanceSheet() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [balanceSheetData, setBalanceSheetData] = useState<TableCategory[]>([
        {
            items: [
                {
                    name: "Property Plant & Equipment's",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
                {
                    name: "Furniture & Office Equipment's",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
                {
                    name: "Motor Vehicles",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
                {
                    name: "Other Fixed Assets",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
            ],
            totals: {
                value2024: "000000",
                value2025: "000000",
                value2026: "000000",
            },
        },
        {
            title: "Current Assets",
            items: [
                {
                    name: "Cash and Cash Equivalents",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
                {
                    name: "Accounts Receivable",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
                {
                    name: "Inventory",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
                {
                    name: "Prepaid Expenses",
                    value2024: "000000",
                    value2025: "000000",
                    value2026: "000000",
                },
            ],
            totals: {
                value2024: "000000",
                value2025: "000000",
                value2026: "000000",
            },
        },
    ]);

    // Define columns for the reporting table
    const columns = [
        { key: "name", header: "Non Current Assets" },
        { key: "value2024", header: "2024" },
        { key: "value2025", header: "2025" },
        { key: "value2026", header: "2026" },
    ];

    // This would typically be where you'd fetch data based on the selected date range
    useEffect(() => {
        if (startDate && endDate) {
            fetchBalanceSheetData();
        }
    }, [startDate, endDate]);

    // Function to fetch balance sheet data
    const fetchBalanceSheetData = async () => {
        if (!startDate || !endDate) {
            // If dates aren't selected, show a message or handle appropriately
            console.log("Please select both start and end dates");
            return;
        }

        setIsLoading(true);
        try {
            console.log("Fetching data for range:", startDate, endDate);
            // In a real application, you would fetch data from an API here
            // Simulate API call with timeout
            await new Promise((resolve) => setTimeout(resolve, 800));

            // For demo purposes, we're just updating the same data
            // In a real app, you would update with the response from your API
            setBalanceSheetData((prevData) => {
                // Create a deep copy and slightly modify some values to simulate data change
                return prevData.map((category) => ({
                    ...category,
                    items: category.items.map((item) => ({
                        ...item,
                        value2024: Math.round(
                            Number(item.value2024) *
                                (0.95 + Math.random() * 0.1)
                        ),
                        value2025: Math.round(
                            Number(item.value2025) *
                                (0.95 + Math.random() * 0.1)
                        ),
                    })),
                }));
            });
        } catch (error) {
            console.error("Error fetching balance sheet data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loading />;

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

                <div className="mt-6">
                    <BalanceSheetTable
                        data={balanceSheetData}
                        columns={columns}
                        balance={{
                            value2024: "000000",
                            value2025: "000000",
                            value2026: "000000",
                        }}
                        balanceLabel="Balance"
                    />
                </div>
            </div>
        </div>
    );
}

export default BalanceSheet;
