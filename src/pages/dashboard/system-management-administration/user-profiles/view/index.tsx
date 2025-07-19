import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { UserProfile } from "../types";

const useUserProfilesById = (id: string) => {
    return useQuery({
        queryKey: ["user-profiles", id],
        queryFn: async () => {
            const response = await ENDPOINTS.users.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};

function UserProfilesViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();

    const {
        data: userProfiles,
        error,
        isLoading,
    } = useUserProfilesById(id as string);

    const userProfilesData =
        (userProfiles?.data as UserProfile) || ({} as UserProfile);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <ViewCard
                title={userProfilesData?.name.toString()}
                variant="user"
                image={userProfilesData?.image}
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Email",
                                    value: userProfilesData?.email.toString(),
                                },
                                {
                                    label: "Phone",
                                    value: userProfilesData?.phoneNumber.toString(),
                                },
                                {
                                    label: "Address",
                                    value: userProfilesData?.address.toString(),
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
