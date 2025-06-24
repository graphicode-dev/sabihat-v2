import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";

function BoardingPassengerViewPage() {
    const passengerData = {
        id: "1",
        ticketNumber: "1",
        passengerName: "1",
        seatNumber: "1",
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
                                    value: passengerData.ticketNumber,
                                },
                                {
                                    label: "Passenger Name",
                                    value: passengerData.passengerName,
                                },
                                {
                                    label: "Seat Number",
                                    value: passengerData.seatNumber,
                                },
                            ],
                        },
                    ],
                }}
            />
        </PageLayout>
    );
}

export default BoardingPassengerViewPage;
