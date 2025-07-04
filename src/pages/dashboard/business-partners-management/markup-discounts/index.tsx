import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function MarkUpPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "partner",
            header: "Partner",
            accessorKey: "partner",
        },
        {
            id: "class",
            header: "Class",
            accessorKey: "class",
        },
        {
            id: "commissionType",
            header: "Commission Type",
            accessorKey: "commissionType",
        },
        {
            id: "commissionValue",
            header: "Commission Value",
            accessorKey: "commissionValue",
        },
        {
            id: "visitType",
            header: "Visit Type",
            accessorKey: "visitType",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                partner: "*****",
                class: "*****",
                commissionType: "*****",
                commissionValue: "*****",
                visitType: "*****",
            },
        },
        {
            id: "2",
            columns: {
                partner: "*****",
                class: "*****",
                commissionType: "*****",
                commissionValue: "*****",
                visitType: "*****",
            },
        },
        {
            id: "3",
            columns: {
                partner: "*****",
                class: "*****",
                commissionType: "*****",
                commissionValue: "*****",
                visitType: "*****",
            },
        },
        {
            id: "4",
            columns: {
                partner: "*****",
                class: "*****",
                commissionType: "*****",
                commissionValue: "*****",
                visitType: "*****",
            },
        },
        {
            id: "5",
            columns: {
                partner: "*****",
                class: "*****",
                commissionType: "*****",
                commissionValue: "*****",
                visitType: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All  Markup & Discounts Board"
                data={data}
                columns={columns}
                addLabel="Add Markup & Discounts Board"
                onAddClick={() => {
                    navigate(
                        `/business-partners-management/markup-discounts/add`
                    );
                }}
                onRowClick={(rowId) =>
                    navigate(
                        `/business-partners-management/markup-discounts/view/${rowId}`
                    )
                }
                hideBorder
            />
        </PageLayout>
    );
}

export default MarkUpPage;
