import { TableColumn, TableData } from "../../../../types/table";
import { DynamicTable } from "../../../../components/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckBox } from "../../../../components/ui/CheckBox";

function TicketsPassengerPage() {
    const navigate = useNavigate();
    const toggleDefault = (id: string) => {
        // Find the item being toggled
        const updatedData = tableData.map((item) => {
            // If this is the item being toggled, flip its default value
            if (item.id === id) {
                return {
                    ...item,
                    columns: {
                        ...item.columns,
                        default: !item.columns.default, // Toggle the current value
                    },
                };
            }
            // Leave all other items unchanged
            return item;
        });

        // Update the state with new data
        setTableData(updatedData);

        // In a real application, you would make an API call here
        // Example: api.updatePriceListDefault(id, !clickedItem.columns.default);
        console.log("Toggled checkbox for item:", id);
    };

    const columns: TableColumn[] = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "currency",
            header: "Currency",
            accessorKey: "currency",
        },
        {
            id: "default",
            header: "Default",
            accessorKey: "default",
            cell: ({ row }: { row: any }) => {
                const activityId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!row.original.default}
                            onChange={() => toggleDefault(activityId)}
                        />
                    </div>
                );
            },
        },
    ];
    // Initialize with sample data - only one item should be default
    const initialData: TableData[] = [
        {
            id: "1",
            columns: {
                name: "Standard Price",
                currency: "USD",
                default: true, // Only one item should be default
            },
        },
        {
            id: "2",
            columns: {
                name: "Premium Price",
                currency: "EUR",
                default: false,
            },
        },
        {
            id: "3",
            columns: {
                name: "Economy Price",
                currency: "SAR",
                default: false,
            },
        },
    ];

    // Use state to manage the table data
    const [tableData, setTableData] = useState<TableData[]>(initialData);

    return (
        <DynamicTable
            title="Tickets"
            columns={columns}
            data={tableData}
            onRowClick={(id) =>
                navigate(`/sales-bookings/tickets/passenger/${id}/view`)
            }
            hideBorder
            noPadding
        />
    );
}

export default TicketsPassengerPage;
