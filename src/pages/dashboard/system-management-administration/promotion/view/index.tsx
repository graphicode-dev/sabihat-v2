import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";

function PromotionViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            name: "************************************************************************",
            promotion_type:
                "************************************************************************",
            promotion_value:
                "************************************************************************",
            from_date:
                "************************************************************************",
            to_date:
                "************************************************************************",
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
                                    label: "Name",
                                    value: data?.columns.name.toString(),
                                },
                                {
                                    label: "Promotion Type",
                                    value: data?.columns.promotion_type.toString(),
                                },
                                {
                                    label: "Promotion Value",
                                    value: data?.columns.promotion_value.toString(),
                                },
                                {
                                    label: "From Date",
                                    value: data?.columns.from_date.toString(),
                                },
                                {
                                    label: "To Date",
                                    value: data?.columns.to_date.toString(),
                                },
                            ],
                        },
                    ],
                }}
                gridCols={5}
                buttons
            />
        </PageLayout>
    );
}

export default PromotionViewPage;
