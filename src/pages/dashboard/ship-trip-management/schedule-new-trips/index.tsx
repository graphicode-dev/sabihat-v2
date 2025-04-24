import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";

function ScheduleNewTripsPage() {
    const data = Array.from({ length: 100 }, (_, index) => {
        return {
            id: (index + 1).toString(),
            columns: {
                "vessel name": "*******",
                "Voyage Number": "*******",
                "Port From": "*******",
                "Port To": "*******",
                ETD: "*******",
                ETA: "*******",
            },
        };
    });

    const columns = [
        {
            id: "vessel name",
            header: "Vessel Name",
            accessorKey: "vessel name",
            sortable: true,
        },
        {
            id: "Voyage Number",
            header: "Voyage Number",
            accessorKey: "Voyage Number",
            sortable: true,
        },
        {
            id: "Port From",
            header: "Port From",
            accessorKey: "Port From",
            sortable: true,
        },
        {
            id: "Port To",
            header: "Port To",
            accessorKey: "Port To",
            sortable: true,
        },
        {
            id: "ETD",
            header: "ETD",
            accessorKey: "ETD",
            sortable: true,
        },
        {
            id: "ETA",
            header: "ETA",
            accessorKey: "ETA",
            sortable: true,
        },
    ];
    return (
        <PageLayout>
            <DynamicTable
                title="All Ships"
                data={data}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
                addLabel="Add Ship"
            />
        </PageLayout>
    );
}

export default ScheduleNewTripsPage;
