import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";

function BoardingVehicleViewPage() {
    const vehicleData = {
        id: "1",
        ticketNumber: "1",
        vehicleType: "1",
        parkingNumber: "1",
    };

    return (
        <PageLayout>
            <ViewCard
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Ticket Number",
                                    value: vehicleData.ticketNumber,
                                },
                                {
                                    label: "Vehicle Type",
                                    value: vehicleData.vehicleType,
                                },
                                {
                                    label: "Parking Number",
                                    value: vehicleData.parkingNumber,
                                },
                            ],
                        },
                    ],
                }}
            />
        </PageLayout>
    );
}

export default BoardingVehicleViewPage;
