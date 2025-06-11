import { DynamicTable } from "../../../../components/table";
import { columns, mockData } from "../../../../data/mockData";
import { useToast } from "../../../../hooks/useToast";
import PageLayout from "../../../../layout/PageLayout";

function PartnersClassificationPage() {
    const { addToast } = useToast();

    const addSuccessToast = () => {
        addToast({
            type: "success",
            title: "Success message",
            message: "This is a success message",
            duration: 5000,
            position: "top-right",
        });
    };

    return (
        <PageLayout>
            <DynamicTable
                title="All Subagents"
                data={mockData}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
                onAddClick={() => {
                    addSuccessToast();
                }}
                addLabel="Add Subagent"
            />
        </PageLayout>
    );
}

export default PartnersClassificationPage;
