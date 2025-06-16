import PageLayout from "../../../../layout/PageLayout";
import { DynamicTable } from "../../../../components/table";
import { TableColumn, TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function TaxPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Tax Name",
            accessorKey: "taxName",
        },
        {
            id: "2",
            header: "Tax Type",
            accessorKey: "taxType",
        },
        {
            id: "3",
            header: "Amount Value",
            accessorKey: "amountValue",
        },
        {
            id: "4",
            header: "Description",
            accessorKey: "description",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                taxName: "*****",
                taxType: "*****",
                amountValue: "*****",
                description: "*****",
            },
        },
        {
            id: "2",
            columns: {
                taxName: "*****",
                taxType: "*****",
                amountValue: "*****",
                description: "*****",
            },
        },
        {
            id: "3",
            columns: {
                taxName: "*****",
                taxType: "*****",
                amountValue: "*****",
                description: "*****",
            },
        },
        {
            id: "4",
            columns: {
                taxName: "*****",
                taxType: "*****",
                amountValue: "*****",
                description: "*****",
            },
        },
        {
            id: "5",
            columns: {
                taxName: "*****",
                taxType: "*****",
                amountValue: "*****",
                description: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Taxes"
                data={data}
                columns={columns}
                addLabel="Add Tax"
                onAddClick={() =>
                    navigate("/system-management-administration/tax/add")
                }
            />
        </PageLayout>
    );
}

export default TaxPage;
