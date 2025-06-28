import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function AllowedWeightCargoViewPage() {
    const { addToast, addAlertToast } = useToast();
    const { id } = useParams();
    const navigate = useNavigate();
    const data = {
        id: "1",
        name: "John Doe",
        currency: "USD",
        passengerType: "Adult",
        ticketType: "Round Trip",
        cabin: "A",
        portFrom: "Port From",
        portTo: "Port To",
        visaType: "Visa Type",
        basicPrice: 100,
        taxes: 10,
        taxBase: 110,
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Name",
                                    value: "John Doe",
                                },
                                {
                                    label: "Currency",
                                    value: "john.doe@example.com",
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Passenger Type",
                                    value: data.passengerType,
                                },
                                {
                                    label: "Ticket Type",
                                    value: data.ticketType,
                                },
                                {
                                    label: "Cabin",
                                    value: data.cabin,
                                },
                                {
                                    label: "Port From",
                                    value: data.portFrom,
                                },
                                {
                                    label: "Port To",
                                    value: data.portTo,
                                },
                                {
                                    label: "Visa Type",
                                    value: data.visaType,
                                },
                                {
                                    label: "Basic Price",
                                    value: data.basicPrice,
                                },
                                {
                                    label: "Taxes",
                                    value: data.taxes,
                                },
                                {
                                    label: "Tax Base",
                                    value: data.taxBase,
                                },
                            ],
                        },
                    ],
                }}
                customButtonLabel="Create New Price"
                onCustomButton={() =>
                    navigate(`/sales-bookings/allowed-weight/cargo/${id}/create`)
                }
                onEdit={() =>
                    navigate(`/sales-bookings/allowed-weight/cargo/${id}/edit`)
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this cargo?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Cargo deleted successfully",
                                        title: "Success!",
                                    });
                                    navigate(-1);
                                },
                                variant: "primary",
                            },
                            {
                                text: "Cancel",
                                onClick: () => {},
                                variant: "secondary",
                            },
                        ]
                    );
                }}
                buttons
            />
        </PageLayout>
    );
}

export default AllowedWeightCargoViewPage;
