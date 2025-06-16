import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { ViewCardData } from "../../../../../types"; // import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";

function VehicleViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            typeName: "*****",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={
                    {
                        "Type Name": data?.columns.typeName,
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default VehicleViewPage;
