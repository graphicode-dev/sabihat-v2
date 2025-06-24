import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function PassengerCheckInPage() {
    const navigate = useNavigate();

    const columns: TableColumn[] = [
        {
            id: "vesselName",
            header: "Vessel Name",
            accessorKey: "vesselName",
        },
        {
            id: "voyageNumber",
            header: "Voyage Number",
            accessorKey: "voyageNumber",
        },
        {
            id: "portFrom",
            header: "Port From",
            accessorKey: "portFrom",
        },
        {
            id: "portTo",
            header: "Port To",
            accessorKey: "portTo",
        },
        {
            id: "ETD",
            header: "ETD",
            accessorKey: "ETD",
        },
        {
            id: "ETA",
            header: "ETA",
            accessorKey: "ETA",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                vesselName: "1",
                voyageNumber: "1",
                portFrom: "1",
                portTo: "1",
                ETD: "1",
                ETA: "1",
            },
        },
        {
            id: "2",
            columns: {
                vesselName: "2",
                voyageNumber: "2",
                portFrom: "2",
                portTo: "2",
                ETD: "2",
                ETA: "2",
            },
        },
        {
            id: "3",
            columns: {
                vesselName: "3",
                voyageNumber: "3",
                portFrom: "3",
                portTo: "3",
                ETD: "3",
                ETA: "3",
            },
        },
        {
            id: "4",
            columns: {
                vesselName: "4",
                voyageNumber: "4",
                portFrom: "4",
                portTo: "4",
                ETD: "4",
                ETA: "4",
            },
        },
        {
            id: "5",
            columns: {
                vesselName: "5",
                voyageNumber: "5",
                portFrom: "5",
                portTo: "5",
                ETD: "5",
                ETA: "5",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="Trips Check In"
                columns={columns}
                data={data}
                addLabel="Open Check Trip"
                onAddClick={() =>
                    navigate("/check-in-boarding/passenger-check-in/add")
                }
                onRowClick={() =>
                    navigate(
                        "/check-in-boarding/passenger-check-in/verification"
                    )
                }
            />
        </PageLayout>
    );
}

export default PassengerCheckInPage;
