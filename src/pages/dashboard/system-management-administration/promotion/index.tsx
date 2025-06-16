import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function PromotionPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "2",
            header: "Promotion Type",
            accessorKey: "promotion_type",
        },
        {
            id: "3",
            header: "Promotion Value",
            accessorKey: "promotion_value",
        },
        {
            id: "4",
            header: "From Date",
            accessorKey: "from_date",
        },
        {
            id: "5",
            header: "To Date",
            accessorKey: "to_date",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                name: "*****",
                promotion_type: "*****",
                promotion_value: "*****",
                from_date: "*****",
                to_date: "*****",
            },
        },
        {
            id: "2",
            columns: {
                name: "*****",
                promotion_type: "*****",
                promotion_value: "*****",
                from_date: "*****",
                to_date: "*****",
            },
        },
        {
            id: "3",
            columns: {
                name: "*****",
                promotion_type: "*****",
                promotion_value: "*****",
                from_date: "*****",
                to_date: "*****",
            },
        },
        {
            id: "4",
            columns: {
                name: "*****",
                promotion_type: "*****",
                promotion_value: "*****",
                from_date: "*****",
                to_date: "*****",
            },
        },
        {
            id: "5",
            columns: {
                name: "*****",
                promotion_type: "*****",
                promotion_value: "*****",
                from_date: "*****",
                to_date: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Promotions"
                data={data}
                columns={columns}
                addLabel="Add Promotion"
                onAddClick={() =>
                    navigate("/system-management-administration/promotion/add")
                }
            />
        </PageLayout>
    );
}

export default PromotionPage;
