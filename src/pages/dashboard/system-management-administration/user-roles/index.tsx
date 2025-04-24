import { useState } from "react";
import { CheckBox, DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";

// Define the permission types
type Permission = "read" | "write" | "create" | "delete";

// Interface for permission matrix
interface PermissionMatrix {
    [roleId: string]: {
        [permission in Permission]?: boolean;
    };
}

function UserRolesPage() {
    // Permission matrix state
    const [permissions, setPermissions] = useState<PermissionMatrix>({
        "marine-agent": {
            read: true,
            write: true,
            create: false,
            delete: false,
        },
        "commercial-agent": {
            read: true,
            write: false,
            create: false,
            delete: false,
        },
        subagent: { read: false, write: false, create: true, delete: false },
        "role-4": { read: false, write: false, create: false, delete: false },
        "role-5": { read: false, write: false, create: false, delete: false },
    });

    // Role data for the permission matrix
    const roles = [
        { id: "marine-agent", name: "Marine Agent", role: "Marine Agent" },
        {
            id: "commercial-agent",
            name: "Commercial Agent",
            role: "Commercial Agent",
        },
        { id: "subagent", name: "Subagent", role: "Subagent" },
        { id: "role-4", name: "********", role: "********" },
        { id: "role-5", name: "********", role: "********" },
    ];

    // Toggle permission for a specific role and permission type
    const togglePermission = (roleId: string, permission: Permission) => {
        setPermissions((prev) => {
            const newPermissions = { ...prev };
            if (!newPermissions[roleId]) {
                newPermissions[roleId] = {};
            }
            newPermissions[roleId] = {
                ...newPermissions[roleId],
                [permission]: !newPermissions[roleId][permission],
            };
            return newPermissions;
        });
    };

    const data = roles.map((role) => ({
        id: role.id,
        columns: {
            model: role.name,
            role: role.role,
            read: permissions[role.id]?.read ? "true" : "false",
            write: permissions[role.id]?.write ? "true" : "false",
            create: permissions[role.id]?.create ? "true" : "false",
            delete: permissions[role.id]?.delete ? "true" : "false",
        },
    }));

    const columns = [
        {
            id: "model",
            header: "Model",
            accessorKey: "model",
            sortable: true,
        },
        {
            id: "role",
            header: "Role",
            accessorKey: "role",
            sortable: true,
        },
        {
            id: "read",
            header: "Read Access",
            accessorKey: "read",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const roleId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[roleId]?.read}
                            onChange={() => togglePermission(roleId, "read")}
                        />
                    </div>
                );
            },
        },
        {
            id: "write",
            header: "Write Access",
            accessorKey: "write",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const roleId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[roleId]?.write}
                            onChange={() => togglePermission(roleId, "write")}
                        />
                    </div>
                );
            },
        },
        {
            id: "create",
            header: "Create Access",
            accessorKey: "create",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const roleId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[roleId]?.create}
                            onChange={() => togglePermission(roleId, "create")}
                        />
                    </div>
                );
            },
        },
        {
            id: "delete",
            header: "Delete Access",
            accessorKey: "delete",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const roleId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[roleId]?.delete}
                            onChange={() => togglePermission(roleId, "delete")}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="Create User Roles & Permissions"
                data={data}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
            />
        </PageLayout>
    );
}

export default UserRolesPage;
