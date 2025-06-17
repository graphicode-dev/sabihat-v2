import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { ViewCardData } from "../../../../../types";
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
                data={
                    {
                        "Partner Layer": data.columns.partnerLayer,
                        Partner: data.columns.partner,
                        Class: data.columns.class,
                        "Services Type": data.columns.servicesType,
                        "Passenger Type": data.columns.passengerType,
                        "Ticket Type": data.columns.ticketType,
                        Cabin: data.columns.cabin,
                        "Port From": data.columns.portFrom,
                        "Port To": data.columns.portTo,
                        "Visit Type": data.columns.visitType,
                        "Markup/Discount": data.columns.MarkupDiscount,
                        "Markup/Discount Type": data.columns.MarkupDiscountType,
                        "Markup/Discount Value": data.columns.MarkupDiscountValue,
                        "Effective Date": data.columns.EffectiveDate,
                        "End Date": data.columns.EndDate,
                    } as ViewCardData
                }
                buttons
                hideBorder
            />
        </PageLayout>
    );
}

export default MarkUpViewPage;
