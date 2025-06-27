import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

const ChartOfAccountViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast, addAlertToast } = useToast();

    const data = {
        id,
        recordNo: "1",
        ledgerDescription: "Ledger Description",
        ledgerType: "Ledger Type",
        sequence: "Sequence",
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
                                    label: "Record No",
                                    value: data.recordNo,
                                },
                                {
                                    label: "Ledger Description",
                                    value: data.ledgerDescription,
                                },
                                {
                                    label: "Ledger Type",
                                    value: data.ledgerType,
                                },
                                {
                                    label: "Sequence",
                                    value: data.sequence,
                                },
                            ],
                        },
                    ],
                }}
                buttons
                onEdit={() =>
                    navigate(
                        `/financial-transactions/chart-of-account/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this chart of account?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Chart of account deleted successfully",
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
            />
        </PageLayout>
    );
};

export default ChartOfAccountViewPage;
