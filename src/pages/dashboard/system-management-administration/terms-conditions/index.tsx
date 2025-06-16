import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function TermsConditionsPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Title",
            accessorKey: "title",
        },
        {
            id: "2",
            header: "Description",
            accessorKey: "description",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                title: "*****",
                description: "*****",
            },
        },
        {
            id: "2",
            columns: {
                title: "*****",
                description: "*****",
            },
        },
        {
            id: "3",
            columns: {
                title: "*****",
                description: "*****",
            },
        },
        {
            id: "4",
            columns: {
                title: "*****",
                description: "*****",
            },
        },
        {
            id: "5",
            columns: {
                title: "*****",
                description: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="Terms & Conditions"
                data={data}
                columns={columns}
                addLabel="Add Terms & Conditions"
                onAddClick={() =>
                    navigate(
                        "/system-management-administration/terms-conditions/add"
                    )
                }
            />
        </PageLayout>
    );
}

export default TermsConditionsPage;
