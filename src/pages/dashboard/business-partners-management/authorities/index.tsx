import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function AuthoritiesPage() {
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
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
            },
        },
        {
            id: "2",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
            },
        },
        {
            id: "3",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
            },
        },
        {
            id: "4",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
            },
        },
        {
            id: "5",
            columns: {
                name: "*****",
                phone: "*****",
                address: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Authorities"
                data={data}
                columns={columns}
                addLabel="Add Authority"
                hideBorder
            />
        </PageLayout>
    );
}

export default AuthoritiesPage;
