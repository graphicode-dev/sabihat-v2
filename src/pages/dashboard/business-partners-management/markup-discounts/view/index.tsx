import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { MarkUp } from "../types";

const useMarkupDiscountById = (id: string) => {
    return useQuery({
        queryKey: ["markupDiscount", id],
        queryFn: async () => {
            const response = await ENDPOINTS.markupDiscounts.getOne(id);

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
function MarkUpViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();

    const {
        data: markupDiscount,
        error,
        isLoading,
    } = useMarkupDiscountById(id as string);

    const markupDiscountData =
        (markupDiscount?.data as MarkUp) || ({} as MarkUp);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout showBorder>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Partner Layer",
                                    value: markupDiscountData.businessPartner.layer.name.toString(),
                                },
                                {
                                    label: "Partner",
                                    value: markupDiscountData.businessPartner.name.toString(),
                                },
                                {
                                    label: "Class",
                                    value: markupDiscountData.partnersClassification.nameClass.toString(),
                                },
                                {
                                    label: "Ticket Type",
                                    value: markupDiscountData.ticketType.toString(),
                                },
                                {
                                    label: "Cabin",
                                    value: markupDiscountData.cabin.name.toString(),
                                },
                                {
                                    label: "Port From",
                                    value: markupDiscountData.portFrom.name.toString(),
                                },
                                {
                                    label: "Port To",
                                    value: markupDiscountData.portTo.name.toString(),
                                },
                                {
                                    label: "Visit Type",
                                    value: markupDiscountData.visitType.toString(),
                                },
                                {
                                    label: "Markup/Discount",
                                    value: markupDiscountData.markupDiscount.toString(),
                                },
                                {
                                    label: "Markup/Discount Type",
                                    value: markupDiscountData.markupDiscountType.toString(),
                                },
                                {
                                    label: "Markup/Discount Value",
                                    value: markupDiscountData.markupDiscountValue.toString(),
                                },
                                {
                                    label: "Effective Date",
                                    value: markupDiscountData.effectiveDate.toString(),
                                },
                                {
                                    label: "End Date",
                                    value: markupDiscountData.endDate.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/business-partners-management/markup-discounts/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this markup discount?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Markup discount deleted successfully",
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
        </PageLayout>
    );
}

export default MarkUpViewPage;
