import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function PartnersPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "phone",
            header: "Phone",
            accessorKey: "phone",
        },
        {
            id: "address",
            header: "Address",
            accessorKey: "address",
        },
        {
            id: "limitAmount",
            header: "Limit Amount ",
            accessorKey: "limitAmount",
        },
        {
            id: "partnerStatus",
            header: "Partner Status",
            accessorKey: "partnerStatus",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
                limitAmount: "*****",
                partnerStatus: "*****",
            },
        },
        {
            id: "2",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
                limitAmount: "*****",
                partnerStatus: "*****",
            },
        },
        {
            id: "3",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
                limitAmount: "*****",
                partnerStatus: "*****",
            },
        },
        {
            id: "4",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
                limitAmount: "*****",
                partnerStatus: "*****",
            },
        },
        {
            id: "5",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
                limitAmount: "*****",
                partnerStatus: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Partners"
                data={data}
                columns={columns}
                addLabel="Add Partner"
                onAddClick={() => {
                    navigate(`/business-partners-management/partners/add`);
                }}
                onRowClick={(rowId) =>
                    navigate(
                        `/business-partners-management/partners/view/${rowId}`
                    )
                }
                hideBorder
            />
        </PageLayout>
    );
}

export default PartnersPage;
