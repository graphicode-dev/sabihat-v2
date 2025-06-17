import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { ViewCardData } from "../../../../../types";
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
                        "Commission Type": data.columns.commissionType,
                        "Commission Value": data.columns.commissionValue,
                        "Effective Date": data.columns.effectiveDate,
                        "End Date": data.columns.endDate,
                    } as ViewCardData
                }
                buttons
                hideBorder
            />
        </PageLayout>
    );
}

export default CommissionsViewPage;
