import { useParams } from "react-router-dom";
import PageLayout from "../../../../../layout/PageLayout";
import { DynamicTable } from "../../../../../components/table";
import { TableColumn, TableData } from "../../../../../types/table";
import { useNavigate } from "react-router-dom";

function ScheduleNewTripsTicketsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const columns: TableColumn[] = [
        {
            id: "ticketName",
            header: "Ticket Name",
            accessorKey: "ticketName",
            sortable: true,
        },
        {
            id: "pnr",
            header: "PNR",
            accessorKey: "pnr",
            sortable: true,
        },
        {
            id: "date",
            header: "Date",
            accessorKey: "date",
            sortable: true,
        },
        {
            id: "voyageName",
            header: "Voyage Name",
            accessorKey: "voyageName",
            sortable: true,
        },
        {
            id: "voyageNumber",
            header: "Voyage Number",
            accessorKey: "voyageNumber",
            sortable: true,
        },
        {
            id: "portFrom",
            header: "Port From",
            accessorKey: "portFrom",
            sortable: true,
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                ticketName: "*******",
                pnr: "*******",
                date: "*******",
                voyageName: "*******",
                voyageNumber: "*******",
                portFrom: "*******",
            },
        },
        {
            id: "2",
            columns: {
                ticketName: "*******",
                pnr: "*******",
                date: "*******",
                voyageName: "*******",
                voyageNumber: "*******",
                portFrom: "*******",
            },
        },
        {
            id: "3",
            columns: {
                ticketName: "*******",
                pnr: "*******",
                date: "*******",
                voyageName: "*******",
                voyageNumber: "*******",
                portFrom: "*******",
            },
        },
        {
            id: "4",
            columns: {
                ticketName: "*******",
                pnr: "*******",
                date: "*******",
                voyageName: "*******",
                voyageNumber: "*******",
                portFrom: "*******",
            },
        },
        {
            id: "5",
            columns: {
                ticketName: "*******",
                pnr: "*******",
                date: "*******",
                voyageName: "*******",
                voyageNumber: "*******",
                portFrom: "*******",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="Tickets"
                data={data}
                columns={columns}
                onRowClick={(rowId: string) =>
                    navigate(
                        `/ship-trip-management/schedule-new-trips/tickets/${id}/view/${rowId}`
                    )
                }
            />
        </PageLayout>
    );
}

export default ScheduleNewTripsTicketsPage;
