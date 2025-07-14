import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { TermsConditions } from "../types";

const useTermsConditionsById = (id: string) => {
    return useQuery({
        queryKey: ["termsConditions", id],
        queryFn: async () => {
            const response = await ENDPOINTS.termsConditions.getOne(id);

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

function TermsConditionsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();

    const {
        data: termsConditions,
        error,
        isLoading,
    } = useTermsConditionsById(id || "");

    const termsConditionsData =
        (termsConditions?.data as TermsConditions) || ({} as TermsConditions);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

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
                                    value: termsConditionsData?.title.toString(),
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Description",
                                    value: termsConditionsData?.description.toString(),
                                    colSpan: 3,
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/terms-conditions/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this terms & conditions?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Terms & Conditions deleted successfully",
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

export default TermsConditionsViewPage;
