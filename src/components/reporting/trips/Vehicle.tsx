import { useEffect, useState } from "react";
import ReportingDropDown from "../ReportingDropDown";
import ReportingTable, {
    ReportingTableColumn,
    ReportingTableRow,
} from "../ReportingTable";

function Vehicle() {
    const columns: ReportingTableColumn[] = [
        {
            id: "trip",
            header: "Trip",
            accessorKey: "trip",
        },
        {
            id: "vehicle type",
            header: "Vehicle Type",
            accessorKey: "vehicle type",
        },
        {
            id: "make & model",
            header: "Make & Model",
            accessorKey: "make & model",
        },
        {
            id: "chases no",
            header: "Chases No",
            accessorKey: "chases no",
        },
        {
            id: "plate no",
            header: "Plate No",
            accessorKey: "plate no",
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
        {
            id: "policy no",
            header: "Policy No",
            accessorKey: "policy no",
        },
        {
            id: "tripTick no",
            header: "TripTick No",
            accessorKey: "tripTick no",
        },
    ];
    const data: (ReportingTableRow & { trip?: string })[] = [
        {
            id: "001",
            "vehicle type": "Vehicle Type",
            "make & model": "Make & Model",
            "chases no": "Chases No",
            "plate no": "Plate No",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            "policy no": "Policy No",
            "tripTick no": "TripTick No",
            "phone no": "123-456-7890",
            trip: "Today",
        },
        {
            id: "002",
            "vehicle type": "Vehicle Type",
            "make & model": "Make & Model",
            "chases no": "Chases No",
            "plate no": "Plate No",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            "policy no": "Policy No",
            "tripTick no": "TripTick No",
            "phone no": "987-654-3210",
            trip: "Yesterday",
        },
        {
            id: "003",
            "vehicle type": "Vehicle Type",
            "make & model": "Make & Model",
            "chases no": "Chases No",
            "plate no": "Plate No",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            "policy no": "Policy No",
            "tripTick no": "TripTick No",
            "phone no": "555-123-4567",
            trip: "This Week",
        },
        {
            id: "004",
            "vehicle type": "Vehicle Type",
            "make & model": "Make & Model",
            "chases no": "Chases No",
            "plate no": "Plate No",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            "policy no": "Policy No",
            "tripTick no": "TripTick No",
            "phone no": "111-222-3333",
            trip: "This Month",
        },
        {
            id: "005",
            "vehicle type": "Vehicle Type",
            "make & model": "Make & Model",
            "chases no": "Chases No",
            "plate no": "Plate No",
            consignor: "Consignor",
            consignee: "Consignee",
            "consignee phone": "Consignee Phone",
            "policy no": "Policy No",
            "tripTick no": "TripTick No",
            "ticket no": "T012345",
            "phone no": "111-222-3333",
            trip: "This Year",
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
            <div className="space-y-4">
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
                <ReportingTable columns={columns} data={filteredData} />
            </div>
        </div>
    );
}

export default Vehicle;
