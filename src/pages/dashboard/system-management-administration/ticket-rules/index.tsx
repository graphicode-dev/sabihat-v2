import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function TicketRulesPage() {
    const navigate = useNavigate();
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
    ];
    const voidData: TableData[] = [
        {
            id: "1",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "2",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "3",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "4",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "5",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
    ];

    const refundColumns: TableColumn[] = [
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
    ];
    const refundData: TableData[] = [
        {
            id: "1",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "2",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "3",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "4",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "5",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
    ];

    const noShowColumns: TableColumn[] = [
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
    ];
    const noShowData: TableData[] = [
        {
            id: "1",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "2",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "3",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "4",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "5",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
    ];

    const reissueColumns: TableColumn[] = [
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
    ];
    const reissueData: TableData[] = [
        {
            id: "1",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "2",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "3",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "4",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
        {
            id: "5",
            columns: {
                ruleName: "*****",
                timing: "*****",
                departureTolerance: "*****",
                penaltyType: "*****",
                penaltyValue: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item label="Void" value="void">
                    <DynamicTable
                        title="All Void"
                        data={voidData}
                        columns={voidColumns}
                        addLabel="Add Void"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/ticket-rules/void/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/ticket-rules/void/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="Refund" value="refund">
                    <DynamicTable
                        title="All Refund"
                        data={refundData}
                        columns={refundColumns}
                        addLabel="Add Refund"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/ticket-rules/refund/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/ticket-rules/refund/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="No Show" value="noShow">
                    <DynamicTable
                        title="All No Show"
                        data={noShowData}
                        columns={noShowColumns}
                        addLabel="Add No Show"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/ticket-rules/no-show/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/ticket-rules/no-show/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="Reissue" value="reissue">
                    <DynamicTable
                        title="All Reissue"
                        data={reissueData}
                        columns={reissueColumns}
                        addLabel="Add Reissue"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/ticket-rules/reissue/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/ticket-rules/reissue/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default TicketRulesPage;
