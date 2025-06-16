import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";

function PoliciesViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            title: "*****",
            description: "****************************************************************************************************",
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
                                    label: "Title",
                                    value: data?.columns.title.toString(),
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Description",
                                    value: data?.columns.description.toString(),
                                    colSpan: 3,
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

export default PoliciesViewPage;
