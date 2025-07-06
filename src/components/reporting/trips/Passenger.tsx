import { useEffect, useState } from "react";
import ReportingDropDown from "../ReportingDropDown";
import ReportingTable, {
    ReportingTableColumn,
    ReportingTableRow,
} from "../ReportingTable";

function Passenger() {
    const columns: ReportingTableColumn[] = [
        {
            id: "trip",
            header: "Trip",
            accessorKey: "trip",
        },
        {
            id: "passenger name",
            header: "Passenger Name",
            accessorKey: "passenger name",
        },
        {
            id: "gender",
            header: "Gender",
            accessorKey: "gender",
        },
        {
            id: "passport no",
            header: "Passport No",
            accessorKey: "passport no",
        },
        {
            id: "nationality",
            header: "Nationality",
            accessorKey: "nationality",
        },
        {
            id: "class",
            header: "Class",
            accessorKey: "class",
        },
        {
            id: "ticket no",
            header: "Ticket No",
            accessorKey: "ticket no",
        },
        {
            id: "phone no",
            header: "Phone No",
            accessorKey: "phone no",
        },
    ];
    const data: (ReportingTableRow & { trip?: string })[] = [
        {
            id: "001",
            "passenger name": "John Doe",
            gender: "Male",
            "passport no": "AB123456",
            nationality: "USA",
            class: "Economy",
            "ticket no": "T123456",
            "phone no": "123-456-7890",
            trip: "Today"
        },
        {
            id: "002",
            "passenger name": "Jane Smith",
            gender: "Female",
            "passport no": "CD789012",
            nationality: "Canada",
            class: "Business",
            "ticket no": "T789012",
            "phone no": "987-654-3210",
            trip: "Yesterday"
        },
        {
            id: "003",
            "passenger name": "Alice Johnson",
            gender: "Female",
            "passport no": "EF456789",
            nationality: "UK",
            class: "First",
            "ticket no": "T456789",
            "phone no": "555-123-4567",
            trip: "This Week"
        },
        {
            id: "004",
            "passenger name": "Bob Brown",
            gender: "Male",
            "passport no": "GH012345",
            nationality: "Australia",
            class: "Economy",
            "ticket no": "T012345",
            "phone no": "111-222-3333",
            trip: "This Month"
        },
        {
            id: "005",
            "passenger name": "Charlie Davis",
            gender: "Male",
            "passport no": "IJ543210",
            nationality: "New Zealand",
            class: "Business",
            "ticket no": "T543210",
            "phone no": "444-555-6666",
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

export default Passenger;
