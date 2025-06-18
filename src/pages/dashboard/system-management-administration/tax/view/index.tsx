import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";

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
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Tax Name",
                                    value: data?.columns.taxName.toString(),
                                },
                                {
                                    label: "Tax Type",
                                    value: data?.columns.taxType.toString(),
                                },
                                {
                                    label: "Amount Value",
                                    value: data?.columns.amountValue.toString(),
                                },
                                {
                                    label: "Description",
                                    value: data?.columns.description.toString(),
                                },
                            ],
                        },
                    ],
                }}
                buttons
            />
        </PageLayout>
    );
}

export default TaxViewPage;
