import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { TableData } from "../../../../../types/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useParams } from "react-router-dom";

function PassengerViewPage() {
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();
    const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            typeName: "*****",
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
                                    label: "Type Name",
                                    value: data?.columns.typeName.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/load-types/passenger/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this passenger?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Passenger deleted successfully",
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

export default PassengerViewPage;
