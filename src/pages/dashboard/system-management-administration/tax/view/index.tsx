import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";

function TaxViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            taxName: "*****",
            taxType: "*****",
            amountValue: "*****",
            description: "*****",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={
                    {
                        "Tax Name": data?.columns.taxName,
                        "Tax Type": data?.columns.taxType,
                        "Amount Value": data?.columns.amountValue,
                        Description: data?.columns.description,
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default TaxViewPage;
