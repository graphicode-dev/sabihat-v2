import BgColorClass, { statuses } from "../../../../components/statusColors";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";

function ScheduleNewShipsPage() {
    const data = Array.from({ length: 100 }, (_, index) => {
        const status =
            Object.keys(statuses)[
                Math.floor(Math.random() * Object.keys(statuses).length)
            ];
        return {
            id: (index + 1).toString(),
            statusType:
                status === "In Transit"
                    ? "orange"
                    : status === "Active"
                    ? "green"
                    : status === "Maintenance"
                    ? "red"
                    : "teal",
            columns: {
                "vessel name": "*******",
                "vessel type": "*******",
                "registration number": "*******",
                "IMO number": "*******",
                "mmsi number": "*******",
                flag: "*******",
                "operating status": status,
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
            id: "vessel type",
            header: "Vessel Type",
            accessorKey: "vessel type",
            sortable: true,
        },
        {
            id: "registration number",
            header: "Registration Number",
            accessorKey: "registration number",
            sortable: true,
        },
        {
            id: "IMO number",
            header: "IMO Number",
            accessorKey: "IMO number",
            sortable: true,
        },
        {
            id: "mmsi number",
            header: "MMSI Number",
            accessorKey: "mmsi number",
            sortable: true,
        },
        {
            id: "flag",
            header: "Flag",
            accessorKey: "flag",
            sortable: true,
        },
        {
            id: "operating status",
            header: "Operating Status",
            accessorKey: "operating status",
            sortable: true,
            cell: ({
                row,
            }: {
                row: {
                    original: {
                        statusType: string;
                        columns: { "operating status": string };
                    };
                };
            }) => {
                const status = row.original.columns["operating status"];

                return <BgColorClass status={status} />;
            },
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

export default ScheduleNewShipsPage;
