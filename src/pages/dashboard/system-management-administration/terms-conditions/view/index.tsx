import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { TableData } from "../../../../../types/table";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function TermsConditionsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();

    const data: TableData = {
        id: "1",
        columns: {
            title: "*****",
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
                                    label: "Title",
                                    value: data?.columns.title.toString(),
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Description",
                                    value: data?.columns.description.toString(),
                                    colSpan: 3,
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/terms-conditions/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this terms & conditions?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Terms & Conditions deleted successfully",
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

export default TermsConditionsViewPage;
