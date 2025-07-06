import { useEffect, useState } from "react";
import ReportingDropDown from "../ReportingDropDown";
import ReportingTable, {
    ReportingTableColumn,
    ReportingTableRow,
} from "../ReportingTable";

function Cargo() {
    const columns: ReportingTableColumn[] = [
        {
            id: "trip",
            header: "Trip",
            accessorKey: "trip",
        },
        {
            id: "cargo policy no",
            header: "Cargo Policy No",
            accessorKey: "cargo policy no",
        },
        {
            id: "cargo type",
            header: "Cargo Type",
            accessorKey: "cargo type",
        },
        {
            id: "quantity",
            header: "Quantity",
            accessorKey: "quantity",
        },
        {
            id: "total weight",
            header: "Total Weight",
            accessorKey: "total weight",
        },
        {
            id: "dimension",
            header: "Dimension",
            accessorKey: "dimension",
        },
        {
            id: "goods type",
            header: "Goods Type",
            accessorKey: "goods type",
        },
        {
            id: "consignor",
            header: "Consignor",
            accessorKey: "consignor",
        },
        {
            id: "consignee",
            header: "Consignee",
            accessorKey: "consignee",
        },
        {
            id: "consignee phone",
            header: "Consignee Phone",
            accessorKey: "consignee phone",
        },
    ];
    const data: (ReportingTableRow & { trip?: string })[] = [
        {
            id: "001",
            "cargo policy no": "001",
            "cargo type": "Cargo Type",
            quantity: "Quantity",
            "total weight": "Total Weight",
            dimension: "Dimension",
            "goods type": "Goods Type",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            trip: "Today"
        },
        {
            id: "002",
            "cargo policy no": "002",
            "cargo type": "Cargo Type",
            quantity: "Quantity",
            "total weight": "Total Weight",
            dimension: "Dimension",
            "goods type": "Goods Type",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            trip: "Yesterday"
        },
        {
            id: "003",
            "cargo policy no": "003",
            "cargo type": "Cargo Type",
            quantity: "Quantity",
            "total weight": "Total Weight",
            dimension: "Dimension",
            "goods type": "Goods Type",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            trip: "This Week"
        },
        {
            id: "004",
            "cargo policy no": "004",
            "cargo type": "Cargo Type",
            quantity: "Quantity",
            "total weight": "Total Weight",
            dimension: "Dimension",
            "goods type": "Goods Type",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            trip: "This Month"
        },
        {
            id: "005",
            "cargo policy no": "005",
            "cargo type": "Cargo Type",
            quantity: "Quantity",
            "total weight": "Total Weight",
            dimension: "Dimension",
            "goods type": "Goods Type",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            trip: "This Year"
        },
    ];

    const [trips] = useState<{ key: string; value: string }[]>([
        { key: "all", value: "All" },
        { key: "today", value: "Today" },
        { key: "yesterday", value: "Yesterday" },
        { key: "this week", value: "This Week" },
        { key: "this month", value: "This Month" },
        { key: "this year", value: "This Year" },
    ]);
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

    const [filteredData, setFilteredData] = useState<typeof data>(data);

    useEffect(() => {
        if (selectedTrip) {
            const filtered = data.filter((item) => item.trip === selectedTrip);
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
    }, [selectedTrip]);

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-start items-center gap-5">
                    {/* Trip */}
                    <div className="w-1/7">
                        <ReportingDropDown
                            options={trips}
                            value={selectedTrip}
                            onChange={(value) => setSelectedTrip(value)}
                            placeholder="Choose Trip"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6">
                    <ReportingTable columns={columns} data={filteredData} />
                </div>
            </div>
        </div>
    );
}

export default Cargo;
