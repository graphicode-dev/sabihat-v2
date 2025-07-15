import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { TicketRule } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const useTicketRuleById = (id: string) => {
    return useQuery({
        queryKey: ["ticketRule", id],
        queryFn: async () => {
            const response = await ENDPOINTS.ticketRules.getOne(id);

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

function TicketRulesViewPage() {
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();
    const { name, id } = useParams();

    const { data: ticketRule, isLoading, error } = useTicketRuleById(id || "");
    console.log(ticketRule);

    const ticketRuleData =
        (ticketRule?.data as TicketRule) || ({} as TicketRule);

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
                                    label: "Rule Name",
                                    value: ticketRuleData?.ruleName.toString(),
                                },
                                {
                                    label: "Timing",
                                    value: ticketRuleData?.timing.toString(),
                                },
                                {
                                    label: "Departure Tolerance",
                                    value: ticketRuleData?.departureTolerance.toString(),
                                },
                                {
                                    label: "Penalty Type",
                                    value: ticketRuleData?.penaltyType.toString(),
                                },
                                {
                                    label: "Penalty Value",
                                    value: ticketRuleData?.penaltyValue.toString(),
                                },
                                {
                                    label: "Penalty Base Amount",
                                    value: ticketRuleData?.penaltyBaseAmount.toString(),
                                },
                                {
                                    label: "Penalty Base Amount Type",
                                    value: ticketRuleData?.penaltyBaseAmount.toString(),
                                },
                                {
                                    label: "Tax Refund",
                                    value: ticketRuleData?.taxRefund.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/ticket-rules/${name}/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        `Are you sure you want to delete this ${name?.toUpperCase()}?`,
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: `${name?.toUpperCase()} deleted successfully`,
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

export default TicketRulesViewPage;
