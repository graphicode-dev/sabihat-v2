import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { Policy } from "../../../../../pages/dashboard/system-management-administration/policies/types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const usePolicyById = (id: string) => {
    return useQuery({
        queryKey: ["policy", id],
        queryFn: async () => {
            const response = await ENDPOINTS.policies.getOne(id);

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

function PoliciesViewPage() {
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();

    const { data: policy, isLoading, error } = usePolicyById(id || "");

    const policyData = (policy?.data as Policy) || ({} as Policy);

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
                                    value: policyData?.title.toString(),
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Description",
                                    value: policyData?.description.toString(),
                                    colSpan: 3,
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/policies/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this policy?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Policy deleted successfully",
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

export default PoliciesViewPage;
