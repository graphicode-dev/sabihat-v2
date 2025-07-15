import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../config/endpoints";
import { DataResponse } from "../../../../types";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";
import { TicketStatus } from "./types";

const useTicketRules = () => {
    return useQuery({
        queryKey: ["ticketRules"],
        queryFn: async () => {
            const response = await ENDPOINTS.ticketRules.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            const typedResponse = response.data as DataResponse<TicketStatus>;
            return typedResponse.data || [];
        },
    });
};

function TicketRulesPage() {
    const navigate = useNavigate();
    const { data: ticketRules = [], error, isLoading } = useTicketRules();

    const voidColumns: TableColumn[] = [
        {
            id: "ruleName",
            header: "Rule Name",
            accessorKey: "ruleName",
        },
        {
            id: "timing",
            header: "Timing",
            accessorKey: "timing",
        },
        {
            id: "departureTolerance",
            header: "Departure Tolerance",
            accessorKey: "departureTolerance",
        },
        {
            id: "penaltyType",
            header: "Penalty Type",
            accessorKey: "penaltyType",
        },
        {
            id: "penaltyValue",
            header: "Penalty Value",
            accessorKey: "penaltyValue",
        },
        {
            id: "penaltyBaseAmount",
            header: "Penalty Base Amount",
            accessorKey: "penaltyBaseAmount",
        },
        {
            id: "taxRefund",
            header: "Tax Refund",
            accessorKey: "taxRefund",
        },
    ];

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <Tabs>
                {ticketRules.map((item) => (
                    <Tabs.Item
                        key={item.id}
                        label={item.name}
                        value={item.name}
                    >
                        <DynamicTable
                            title="All Void"
                            data={
                                item.ticketRules?.map((item) => ({
                                    id: item.id.toString(),
                                    columns: {
                                        ruleName: item.ruleName,
                                        timing: item.timing,
                                        departureTolerance:
                                            item.departureTolerance,
                                        penaltyType: item.penaltyType,
                                        penaltyValue: item.penaltyValue,
                                        penaltyBaseAmount:
                                            item.penaltyBaseAmount,
                                        taxRefund: item.taxRefund,
                                    },
                                })) || []
                            }
                            columns={voidColumns}
                            addLabel="Add Void"
                            onAddClick={() => {
                                navigate(
                                    `/system-management-administration/ticket-rules/${item.name}/add?ticketStatusId=${item.id}`
                                );
                            }}
                            onRowClick={(rowId) =>
                                navigate(
                                    `/system-management-administration/ticket-rules/${item.name}/view/${rowId}`
                                )
                            }
                            hideBorder
                        />
                    </Tabs.Item>
                ))}
            </Tabs>
        </PageLayout>
    );
}

export default TicketRulesPage;
