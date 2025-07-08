import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

function UserRolesViewPage() {
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();
    const navigate = useNavigate();

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
                onEdit={() => {
                    navigate(
                        `/system-management-administration/user-roles/edit/${id}`
                    );
                }}
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this user role?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "User role deleted successfully",
                                        title: "Success!",
                                    });
                                    navigate(-1);
                                },
                                variant: "primary",
                            },
                            {
                                text: "Cancel",
                                onClick: () => {},
                                variant: "secondary",
                            },
                        ]
                    );
                }}
                buttons
            />
        </PageLayout>
    );
}

export default UserRolesViewPage;
