import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import defaultUser from "../../../../../assets/images/default-user.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function UserProfilesViewPage() {
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();
    const { id } = useParams();
    const data: TableData = {
        id: id?.toString() || "",
        avatar: defaultUser,
        columns: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            role: "Admin",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                title={data?.columns.name.toString()}
                subtitle={data?.columns.role.toString()}
                variant="user"
                image={data?.avatar}
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Email",
                                    value: data?.columns.email.toString(),
                                },
                                {
                                    label: "Phone",
                                    value: data?.columns.phone.toString(),
                                },
                                {
                                    label: "Address",
                                    value: data?.columns.address.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/user-profiles/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this user?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "User deleted successfully",
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

export default UserProfilesViewPage;
