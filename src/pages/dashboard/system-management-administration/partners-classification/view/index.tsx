import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";
import { useNavigate } from "react-router-dom";

function PartnersClassificationViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                data={
                    {
                        "Name Classes": data?.columns.nameClasses,
                    } as ViewCardData
                }
                onEdit={() =>
                    navigate(
                        `/system-management-administration/partners-classification/${id}/add`
                    )
                }
                buttons
            />
        </PageLayout>
    );
}

export default PartnersClassificationViewPage;
