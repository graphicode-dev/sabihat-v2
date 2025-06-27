import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { TableData } from "../../../../../types/table";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function CommissionsViewPage() {
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();
    const navigate = useNavigate();

    const data: TableData = {
        id: "1",
        columns: {
            partnerLayer: "*****",
            partner: "*****",
            class: "*****",
            servicesType: "*****",
            passengerType: "*****",
            ticketType: "*****",
            cabin: "*****",
            portFrom: "*****",
            portTo: "*****",
            visitType: "*****",
            commissionType: "*****",
            commissionValue: "*****",
            effectiveDate: "*****",
            endDate: "*****",
        },
    };

    return (
        <PageLayout showBorder>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Partner Layer",
                                    value: data.columns.partnerLayer.toString(),
                                },
                                {
                                    label: "Partner",
                                    value: data.columns.partner.toString(),
                                },
                                {
                                    label: "Class",
                                    value: data.columns.class.toString(),
                                },
                                {
                                    label: "Services Type",
                                    value: data.columns.servicesType.toString(),
                                },
                                {
                                    label: "Passenger Type",
                                    value: data.columns.passengerType.toString(),
                                },
                                {
                                    label: "Ticket Type",
                                    value: data.columns.ticketType.toString(),
                                },
                                {
                                    label: "Cabin",
                                    value: data.columns.cabin.toString(),
                                },
                                {
                                    label: "Port From",
                                    value: data.columns.portFrom.toString(),
                                },
                                {
                                    label: "Port To",
                                    value: data.columns.portTo.toString(),
                                },
                                {
                                    label: "Visit Type",
                                    value: data.columns.visitType.toString(),
                                },
                                {
                                    label: "Commission Type",
                                    value: data.columns.commissionType.toString(),
                                },
                                {
                                    label: "Commission Value",
                                    value: data.columns.commissionValue.toString(),
                                },
                                {
                                    label: "Effective Date",
                                    value: data.columns.effectiveDate.toString(),
                                },
                                {
                                    label: "End Date",
                                    value: data.columns.endDate.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() => {
                    navigate(
                        `/business-partners-management/commissions/edit/${id}`
                    );
                }}
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this commission?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Commission deleted successfully",
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
                hideBorder
            />
        </PageLayout>
    );
}

export default CommissionsViewPage;
