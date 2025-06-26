import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { TableData } from "../../../../../types/table";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function TaxViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();

    const data: TableData = {
        id: "1",
        columns: {
            taxName: "*****",
            taxType: "*****",
            amountValue: "*****",
            description: "*****",
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
                                    label: "Tax Name",
                                    value: data?.columns.taxName.toString(),
                                },
                                {
                                    label: "Tax Type",
                                    value: data?.columns.taxType.toString(),
                                },
                                {
                                    label: "Amount Value",
                                    value: data?.columns.amountValue.toString(),
                                },
                                {
                                    label: "Description",
                                    value: data?.columns.description.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/tax/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this tax?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Tax deleted successfully",
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

export default TaxViewPage;
