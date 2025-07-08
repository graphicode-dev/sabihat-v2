import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function UserRolesPage() {
    const navigate = useNavigate();
    const columns = [
        {
            id: "id",
            header: "ID",
            accessorKey: "id",
            sortable: true,
        },
        {
            id: "layer",
            header: "Layer",
            accessorKey: "layer",
            sortable: true,
        },
        {
            id: "nameModule",
            header: "Name Module",
            accessorKey: "nameModule",
            sortable: true,
        },
        {
            id: "role",
            header: "Role",
            accessorKey: "role",
            sortable: true,
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                id: "1",
                layer: "Layer 1",
                nameModule: "Name Module 1",
                role: "Role 1",
            },
        },
        {
            id: "2",
            columns: {
                id: "2",
                layer: "Layer 2",
                nameModule: "Name Module 2",
                role: "Role 2",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All companies"
                data={data}
                columns={columns}
                addLabel="Roles & Permissions"
                onAddClick={() => {
                    navigate(
                        "/system-management-administration/user-roles/add"
                    );
                }}
            />
        </PageLayout>
    );
}

export default UserRolesPage;
