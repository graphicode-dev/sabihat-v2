import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "../../../../../../layout/PageLayout";
import ViewCard from "../../../../../../components/ui/ViewCard";
import { useToast } from "../../../../../../hooks/useToast";

function TicketView() {
    const { id, ticketId } = useParams();
    const navigate = useNavigate();
    const { addToast, addAlertToast } = useToast();

    return (
        <PageLayout>
            <ViewCard
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Ticket Name",
                                    value: "*******",
                                },
                                {
                                    label: "PNR",
                                    value: "*******",
                                },
                                {
                                    label: "Date",
                                    value: "*******",
                                },
                                {
                                    label: "Voyage Name",
                                    value: "*******",
                                },
                                {
                                    label: "Voyage Number",
                                    value: "*******",
                                },
                                {
                                    label: "Port From",
                                    value: "*******",
                                },
                                {
                                    label: "Port To",
                                    value: "*******",
                                },
                                {
                                    label: "Agent Name",
                                    value: "*******",
                                },
                                {
                                    label: "Agent Phone",
                                    value: "*******",
                                },
                                {
                                    label: "Type",
                                    value: "*******",
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/ship-trip-management/schedule-new-trips/tickets/${id}/edit/${ticketId}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this ticket?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Ticket deleted successfully",
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

export default TicketView;
