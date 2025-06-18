import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { TableData } from "../../../../../types/table";

function CargoViewPage() {
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
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Type Name",
                                    value: data?.columns.typeName.toString(),
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

export default CargoViewPage;
