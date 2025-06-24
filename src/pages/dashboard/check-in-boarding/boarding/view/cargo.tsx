import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";

function BoardingCargoViewPage() {
    const cargoData = {
        id: "1",
        ticketNumber: "1",
        cargoType: "1",
        cargoSpotNumber: "1",
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
                                    value: cargoData.ticketNumber,
                                },
                                {
                                    label: "Cargo Type",
                                    value: cargoData.cargoType,
                                },
                                {
                                    label: "Cargo Spot Number",
                                    value: cargoData.cargoSpotNumber,
                                },
                            ],
                        },
                    ],
                }}
            />
        </PageLayout>
    );
}

export default BoardingCargoViewPage;
