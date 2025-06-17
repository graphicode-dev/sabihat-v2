import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { TableData } from "../../../../../types/table";

function VoidViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            ruleName:
                "******************************************************************",
            timing: "******************************************************************",
            departureTolerance:
                "******************************************************************",
            penaltyType:
                "******************************************************************",
            penaltyValue:
                "******************************************************************",
            penaltyBaseAmount:
                "******************************************************************",
            penaltyBaseAmountType:
                "******************************************************************",
            taxRefund:
                "******************************************************************",
        },
    };

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
                                    value: data?.columns.ruleName.toString(),
                                },
                                {
                                    label: "Timing",
                                    value: data?.columns.timing.toString(),
                                },
                                {
                                    label: "Departure Tolerance",
                                    value: data?.columns.departureTolerance.toString(),
                                },
                                {
                                    label: "Penalty Type",
                                    value: data?.columns.penaltyType.toString(),
                                },
                                {
                                    label: "Penalty Value",
                                    value: data?.columns.penaltyValue.toString(),
                                },
                                {
                                    label: "Penalty Base Amount",
                                    value: data?.columns.penaltyBaseAmount.toString(),
                                },
                                {
                                    label: "Penalty Base Amount Type",
                                    value: data?.columns.penaltyBaseAmountType.toString(),
                                },
                                {
                                    label: "Tax Refund",
                                    value: data?.columns.taxRefund.toString(),
                                },
                            ],
                        },
                    ],
                }}
                gridCols={5}
                buttons
            />
        </PageLayout>
    );
}

export default VoidViewPage;
