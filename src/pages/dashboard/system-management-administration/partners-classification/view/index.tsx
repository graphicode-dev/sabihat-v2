import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
function PartnersClassificationViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();
    const data: TableData = {
        id: "1",
        columns: {
            nameClasses: "asdasdasd",
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
                                    label: "Name Classes",
                                    value: data?.columns.nameClasses.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/partners-classification/${id}/edit`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this partners classification?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Partners classification deleted successfully",
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

export default PartnersClassificationViewPage;
