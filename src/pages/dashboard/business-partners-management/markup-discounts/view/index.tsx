import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { TableData } from "../../../../../types/table";

function MarkUpViewPage() {
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
            MarkupDiscount: "*****",
            MarkupDiscountType: "*****",
            MarkupDiscountValue: "*****",
            EffectiveDate: "*****",
            EndDate: "*****",
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
                                    label: "Markup/Discount",
                                    value: data.columns.MarkupDiscount.toString(),
                                },
                                {
                                    label: "Markup/Discount Type",
                                    value: data.columns.MarkupDiscountType.toString(),
                                },
                                {
                                    label: "Markup/Discount Value",
                                    value: data.columns.MarkupDiscountValue.toString(),
                                },
                                {
                                    label: "Effective Date",
                                    value: data.columns.EffectiveDate.toString(),
                                },
                                {
                                    label: "End Date",
                                    value: data.columns.EndDate.toString(),
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

export default MarkUpViewPage;
