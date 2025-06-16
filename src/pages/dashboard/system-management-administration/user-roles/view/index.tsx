import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";
function UserRolesViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            id: "*****",
            role: "*****",
            layer: "*****",
            nameModule: "*****",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={
                    {
                        ID: data?.columns.id,
                        Role: data?.columns.role,
                        Layer: data?.columns.layer,
                        "Name Module": data?.columns.nameModule,
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default UserRolesViewPage;
