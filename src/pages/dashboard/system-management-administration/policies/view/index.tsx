import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

function PoliciesViewPage() {
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();

    const data: TableData = {
        id: "1",
        columns: {
            title: "*****",
            description:
                "****************************************************************************************************",
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
                        `/system-management-administration/policies/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this policy?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Policy deleted successfully",
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

export default PoliciesViewPage;
