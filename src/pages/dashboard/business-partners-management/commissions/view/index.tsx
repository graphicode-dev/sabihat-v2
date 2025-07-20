import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { Commission } from "../types";

const useCommissionById = (id: string) => {
    return useQuery({
        queryKey: ["commission", id],
        queryFn: async () => {
            const response = await ENDPOINTS.commissions.getOne(id);

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

function CommissionsViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();

    const {
        data: commission,
        error,
        isLoading,
    } = useCommissionById(id as string);

    const commissionData =
        (commission?.data as Commission) || ({} as Commission);

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
                                    value: commissionData.businessPartner.layer.name.toString(),
                                },
                                {
                                    label: "Partner",
                                    value: commissionData.businessPartner.name.toString(),
                                },
                                {
                                    label: "Class",
                                    value: commissionData.partnersClassification.nameClass.toString(),
                                },
                                // {
                                //     label: "Services Type",
                                //     value: commissionData.servicesType.toString(),
                                // },
                                // {
                                //     label: "Passenger Type",
                                //     value: commissionData.passengerType.toString(),
                                // },
                                {
                                    label: "Ticket Type",
                                    value: commissionData.ticketType.toString(),
                                },
                                {
                                    label: "Cabin",
                                    value: commissionData.cabin.name.toString(),
                                },
                                {
                                    label: "Port From",
                                    value: commissionData.portFrom.name.toString(),
                                },
                                {
                                    label: "Port To",
                                    value: commissionData.portTo.name.toString(),
                                },
                                {
                                    label: "Visit Type",
                                    value: commissionData.visitType.toString(),
                                },
                                {
                                    label: "Commission Type",
                                    value: commissionData.commissionType.toString(),
                                },
                                {
                                    label: "Commission Value",
                                    value: commissionData.commissionValue.toString(),
                                },
                                {
                                    label: "Effective Date",
                                    value: commissionData.effectiveDate.toString(),
                                },
                                {
                                    label: "End Date",
                                    value: commissionData.endDate.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() => {
                    navigate(
                        `/business-partners-management/commissions/edit/${id}`
                    );
                }}
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this commission?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Commission deleted successfully",
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

export default CommissionsViewPage;
