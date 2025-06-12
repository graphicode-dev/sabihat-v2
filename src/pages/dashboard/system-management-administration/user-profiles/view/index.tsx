import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockData } from "../../../../../data/mockData";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

function UserProfilesViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();

    const [userData, setUserData] = useState<TableData | null>(null);

    useEffect(() => {
        // Fetch user data from API
        const fetchUserData = async () => {
            const user = mockData.find((item: TableData) => item.id === id);
            setUserData(user || null);
        };
        fetchUserData();
    }, []);

    return (
        <PageLayout>
            <ViewCard
                title={userData?.columns.name as string}
                subtitle={userData?.columns.role as string}
                variant="user"
                image={userData?.avatar}
                data={
                    {
                        Email: userData?.columns.email,
                        Phone: userData?.columns.phone,
                        "User ID": userData?.id,
                        Status: userData?.columns.status,
                        "Last Login": userData?.columns.lastLogin,
                    } as ViewCardData
                }
                buttons
                onEdit={() => {
                    navigate(
                        `/system-management-administration/user-profiles/${id}/add`
                    );
                }}
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this user?",
                        [
                            {
                                text: "Cancel",
                                onClick: () => {
                                    console.log("Cancel");
                                },
                                variant: "secondary",
                            },
                            {
                                text: "Delete",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        title: "Success message",
                                        message: "User deleted successfully",
                                        duration: 5000,
                                        position: "top-right",
                                    });
                                },
                                variant: "danger",
                            },
                        ],
                        {
                            position: "center",
                        }
                    );
                }}
            />
        </PageLayout>
    );
}

export default UserProfilesViewPage;
