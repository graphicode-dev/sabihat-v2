import { DynamicTable } from "../../../../components/table";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function BoardingPage() {
    const navigate = useNavigate();

    const passengerColumns: TableColumn[] = [
        {
            id: "ticketNumber",
            header: "Ticket Number",
            accessorKey: "ticketNumber",
        },
        {
            id: "passengerName",
            header: "Passenger Name",
            accessorKey: "passengerName",
        },
        {
            id: "seatNumber",
            header: "Seat Number",
            accessorKey: "seatNumber",
        },
    ];
    const passengerData: TableData[] = [
        {
            id: "1",
            columns: {
                ticketNumber: "1",
                passengerName: "1",
                seatNumber: "1",
            },
        },
        {
            id: "2",
            columns: {
                ticketNumber: "2",
                passengerName: "2",
                seatNumber: "2",
            },
        },
        {
            id: "3",
            columns: {
                ticketNumber: "3",
                passengerName: "3",
                seatNumber: "3",
            },
        },
        {
            id: "4",
            columns: {
                ticketNumber: "4",
                passengerName: "4",
                seatNumber: "4",
            },
        },
        {
            id: "5",
            columns: {
                ticketNumber: "5",
                passengerName: "5",
                seatNumber: "5",
            },
        },
    ];

    const cargoColumns: TableColumn[] = [
        {
            id: "ticketNumber",
            header: "Ticket Number",
            accessorKey: "ticketNumber",
        },
        {
            id: "cargoType",
            header: "Cargo Type",
            accessorKey: "cargoType",
        },
        {
            id: "cargoSpotNumber",
            header: "Cargo Spot Number",
            accessorKey: "cargoSpotNumber",
        },
    ];
    const cargoData: TableData[] = [
        {
            id: "1",
            columns: {
                ticketNumber: "1",
                cargoType: "1",
                cargoSpotNumber: "1",
            },
        },
        {
            id: "2",
            columns: {
                ticketNumber: "2",
                cargoType: "2",
                cargoSpotNumber: "2",
            },
        },
        {
            id: "3",
            columns: {
                ticketNumber: "3",
                cargoType: "3",
                cargoSpotNumber: "3",
            },
        },
        {
            id: "4",
            columns: {
                ticketNumber: "4",
                cargoType: "4",
                cargoSpotNumber: "4",
            },
        },
        {
            id: "5",
            columns: {
                ticketNumber: "5",
                cargoType: "5",
                cargoSpotNumber: "5",
            },
        },
    ];

    const vehicleColumns: TableColumn[] = [
        {
            id: "ticketNumber",
            header: "Ticket Number",
            accessorKey: "ticketNumber",
        },
        {
            id: "vehicleType",
            header: "Vehicle Type",
            accessorKey: "vehicleType",
        },
        {
            id: "parkingNumber",
            header: "Parking Number",
            accessorKey: "parkingNumber",
        },
    ];
    const vehicleData: TableData[] = [
        {
            id: "1",
            columns: {
                ticketNumber: "1",
                vehicleType: "1",
                parkingNumber: "1",
            },
        },
        {
            id: "2",
            columns: {
                ticketNumber: "2",
                vehicleType: "2",
                parkingNumber: "2",
            },
        },
        {
            id: "3",
            columns: {
                ticketNumber: "3",
                vehicleType: "3",
                parkingNumber: "3",
            },
        },
        {
            id: "4",
            columns: {
                ticketNumber: "4",
                vehicleType: "4",
                parkingNumber: "4",
            },
        },
        {
            id: "5",
            columns: {
                ticketNumber: "5",
                vehicleType: "5",
                parkingNumber: "5",
            },
        },
    ];

    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item label="Passenger" value="passenger">
                    <DynamicTable
                        title="Tickets"
                        columns={passengerColumns}
                        data={passengerData}
                        onRowClick={(rowId) =>
                            navigate(
                                `/check-in-boarding/boarding/passenger/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="Cargo" value="cargo">
                    <DynamicTable
                        title="Tickets"
                        columns={cargoColumns}
                        data={cargoData}
                        onRowClick={(rowId) =>
                            navigate(
                                `/check-in-boarding/boarding/cargo/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="Vehicle" value="vehicle">
                    <DynamicTable
                        title="Tickets"
                        columns={vehicleColumns}
                        data={vehicleData}
                        onRowClick={(rowId) =>
                            navigate(
                                `/check-in-boarding/boarding/vehicle/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default BoardingPage;
