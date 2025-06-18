import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
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
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "ID",
                                    value: data?.columns.id.toString(),
                                },
                                {
                                    label: "Role",
                                    value: data?.columns.role.toString(),
                                },
                                {
                                    label: "Layer",
                                    value: data?.columns.layer.toString(),
                                },
                                {
                                    label: "Name Module",
                                    value: data?.columns.nameModule.toString(),
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

export default UserRolesViewPage;
