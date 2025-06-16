import PageLayout from "../../../../layout/PageLayout";
import { DynamicTable } from "../../../../components/table";
import { useNavigate } from "react-router-dom";
import { TableColumn, TableData } from "../../../../types/table";

function UserProfilesPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "2",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "3",
            header: "Phone",
            accessorKey: "phone",
        },
        {
            id: "4",
            header: "Address",
            accessorKey: "address",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                address: "123 Main St, Anytown, USA",
            },
        },
        {
            id: "2",
            columns: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                address: "123 Main St, Anytown, USA",
            },
        },
        {
            id: "3",
            columns: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                address: "123 Main St, Anytown, USA",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Users"
                data={data}
                columns={columns}
                onAddClick={() => {
                    navigate(
                        "/system-management-administration/user-profiles/add"
                    );
                }}
                addLabel="Add User"
            />
        </PageLayout>
    );
}

export default UserProfilesPage;
