import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { Promotion } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const usePromotionById = (id: string) => {
    return useQuery({
        queryKey: ["promotion", id],
        queryFn: async () => {
            const response = await ENDPOINTS.promotion.getOne(id);

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

function PromotionViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();

    const {
        data: promotion,
        error,
        isLoading,
    } = usePromotionById(id as string);

    const promotionData = (promotion?.data as Promotion) || ({} as Promotion);

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
                                    label: "Name",
                                    value: promotionData?.name.toString(),
                                },
                                {
                                    label: "Promotion Type",
                                    value: promotionData?.type.toString(),
                                },
                                {
                                    label: "Promotion Value",
                                    value: promotionData?.value.toString(),
                                },
                                {
                                    label: "From Date",
                                    value: promotionData?.fromDate.toString(),
                                },
                                {
                                    label: "To Date",
                                    value: promotionData?.toDate.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/promotion/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this promotion?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Promotion deleted successfully",
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

export default PromotionViewPage;
