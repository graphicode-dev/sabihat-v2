import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function PartnersClassificationPage() {
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Name Classes",
            accessorKey: "nameClasses",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                nameClasses: "dsfsfsdf",
            },
        },
        {
            id: "2",
            columns: {
                nameClasses: "dsfsfsdf",
            },
        },
        {
            id: "3",
            columns: {
                nameClasses: "dsfsfsdf",
            },
        },
        {
            id: "4",
            columns: {
                nameClasses: "dsfsfsdf",
            },
        },
        {
            id: "5",
            columns: {
                nameClasses: "dsfsfsdf",
            },
        },
        {
            id: "6",
            columns: {
                nameClasses: "dsfsfsdf",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Subagents"
                data={data}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
                addLabel="Add Subagent"
            />
        </PageLayout>
    );
}

export default PartnersClassificationPage;
