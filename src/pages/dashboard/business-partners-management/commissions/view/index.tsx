import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { TableData } from "../../../../../types/table";

function CommissionsViewPage() {
    // const { id } = useParams();

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
                buttons
                hideBorder
            />
        </PageLayout>
    );
}

export default CommissionsViewPage;
