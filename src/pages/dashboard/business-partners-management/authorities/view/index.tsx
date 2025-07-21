import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { Authority } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const useAuthorityById = (id: string) => {
    return useQuery({
        queryKey: ["authority", id],
        queryFn: async () => {
            const response = await ENDPOINTS.authorities.getOne(id);

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

const useAuthorityContactInformationById = (id: string) => {
    return useQuery({
        queryKey: ["authorityContactInformation", id],
        queryFn: async () => {
            const response =
                await ENDPOINTS.authoritiesContactInformation.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data?.data || [];
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};

function AuthoritiesViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();

    const {
        data: authority,
        error: authorityError,
        isLoading: authorityLoading,
    } = useAuthorityById(id as string);
    const {
        data: authorityContactInformation = [],
        error: authorityContactInformationError,
        isLoading: authorityContactInformationLoading,
    } = useAuthorityContactInformationById(id as string);

    const authorityData = (authority?.data as Authority) || ({} as Authority);
    const authorityContactInformationData = authorityContactInformation || [];

    if (authorityLoading || authorityContactInformationLoading)
        return <Loading />;
    if (authorityError || authorityContactInformationError)
        return <Error message={authorityError?.message || "Unknown error"} />;

    return (
        <PageLayout showBorder>
            <ViewCard
                variant="user"
                title={authorityData.name}
                onEdit={() =>
                    navigate(
                        `/business-partners-management/authorities/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this authority?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Authority deleted successfully",
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
                hideBorder
            />

            <ViewCard
                hideHeaderTitle
                variant="default"
                data={{
                    rows: [
                        {
                            title: "Authority master",
                            fields: [
                                {
                                    label: "Name",
                                    value: authorityData.name,
                                },
                                {
                                    label: "Phone",
                                    value:
                                        authorityData.phoneCode +
                                        authorityData.phoneNumber,
                                },
                                {
                                    label: "Address",
                                    value: authorityData.address,
                                },
                            ],
                        },
                    ],
                }}
                hideBorder
            />

            <ViewCard
                hideHeaderTitle
                variant="default"
                gridCols={5}
                data={{
                    rows: [
                        {
                            title: "Contact Information",
                            fields: authorityContactInformationData?.flatMap(
                                (item) => [
                                    {
                                        label: "Name",
                                        value: item.name,
                                    },
                                    {
                                        label: "Phone",
                                        value:
                                            item.phoneCode +
                                            " " +
                                            item.phoneNumber,
                                    },
                                    {
                                        label: "Email",
                                        value: item.email,
                                    },
                                    {
                                        label: "Title",
                                        value: item.title,
                                    },
                                    {
                                        label: "Hotline",
                                        value: item.hotline,
                                    },
                                ]
                            ),
                        },
                    ],
                }}
                hideBorder
            />
        </PageLayout>
    );
}

export default AuthoritiesViewPage;
