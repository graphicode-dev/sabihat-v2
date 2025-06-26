import { useState } from "react";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { FormButtons, FormFieldWrapper } from "../../../../components/form";
import { SearchedDropDown } from "../../../../components/SearchedDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormLayout from "../../../../layout/FormLayout";
import { useToast } from "../../../../hooks/useToast";
import { CheckBox } from "../../../../components/ui/CheckBox";

// Define the permission types
type Permission = "read" | "write" | "create" | "delete";

// Interface for permission matrix
interface PermissionMatrix {
    [activityId: string]: {
        [permission in Permission]?: boolean;
    };
}

type UserRoles = {
    id?: string;
    layerId: string;
    module: string;
    role: string;
};

const userRolesSchema = z.object({
    id: z.string().optional(),
    layerId: z.string(),
    module: z.string(),
    role: z.string(),
});

function UserRolesPage() {
    const { addToast } = useToast();

    // Sample activities data - in a real app this would come from an API
    const activities = [
        { id: "trip", name: "Trip" },
        { id: "ship", name: "Ship" },
        { id: "cabins", name: "Cabins" },
        { id: "activity4", name: "*****" },
        { id: "activity5", name: "*****" },
    ];

    // Initialize permissions based on the image
    const [permissions, setPermissions] = useState<PermissionMatrix>({
        trip: {
            read: false,
            write: true,
            create: false,
            delete: false,
        },
        ship: {
            read: true,
            write: false,
            create: false,
            delete: false,
        },
        cabins: {
            read: false,
            write: false,
            create: true,
            delete: true,
        },
        activity4: {
            read: false,
            write: false,
            create: false,
            delete: false,
        },
        activity5: {
            read: false,
            write: false,
            create: false,
            delete: false,
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    // Toggle permission for a specific activity and permission type
    const togglePermission = (activityId: string, permission: Permission) => {
        setPermissions((prev) => {
            const newPermissions = { ...prev };
            if (!newPermissions[activityId]) {
                newPermissions[activityId] = {};
            }
            newPermissions[activityId] = {
                ...newPermissions[activityId],
                [permission]: !newPermissions[activityId][permission],
            };
            return newPermissions;
        });
    };

    // Create data for the table
    const data = activities.map((activity) => ({
        id: activity.id,
        columns: {
            activity: activity.name,
            read: permissions[activity.id]?.read ? "true" : "false",
            write: permissions[activity.id]?.write ? "true" : "false",
            create: permissions[activity.id]?.create ? "true" : "false",
            delete: permissions[activity.id]?.delete ? "true" : "false",
        },
    }));

    // Define columns with checkbox cells
    const columns = [
        {
            id: "activity",
            header: "Activity",
            accessorKey: "activity",
            sortable: true,
        },
        {
            id: "read",
            header: "Read Access",
            accessorKey: "read",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const activityId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[activityId]?.read}
                            onChange={() =>
                                togglePermission(activityId, "read")
                            }
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
                const activityId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[activityId]?.write}
                            onChange={() =>
                                togglePermission(activityId, "write")
                            }
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
                const activityId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[activityId]?.create}
                            onChange={() =>
                                togglePermission(activityId, "create")
                            }
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
                const activityId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!permissions[activityId]?.delete}
                            onChange={() =>
                                togglePermission(activityId, "delete")
                            }
                        />
                    </div>
                );
            },
        },
    ];

    const { control, handleSubmit, reset, formState } = useForm<UserRoles>({
        resolver: zodResolver(userRolesSchema),
        defaultValues: {
            layerId: "",
            module: "",
            role: "",
        },

        mode: "onChange",
    });

    const onSubmit = async (formData: UserRoles) => {
        setIsLoading(true);
        try {
            const validatedData = userRolesSchema.parse(formData);
            console.log("Validated data:", validatedData);

            const apiFormData = new FormData();

            apiFormData.append("layerId", formData.layerId);
            apiFormData.append("module", formData.module);
            apiFormData.append("role", formData.role);

            addToast({
                message: "User profile created successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            setSelectedLayer(null);
            setSelectedModule(null);
            setSelectedRole(null);
        } catch (error: any) {
            console.error("Error creating user profile:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};
                if (error.errors.layerId) {
                    mappedErrors.layerId = error.errors.layerId[0];
                }
                if (error.errors.module) {
                    mappedErrors.module = error.errors.module[0];
                }
                if (error.errors.role) {
                    mappedErrors.role = error.errors.role[0];
                }

                console.log("Mapped errors:", mappedErrors);
            } else {
                addToast({
                    message: "An unexpected error occurred. Please try again.",
                    type: "error",
                    title: "Error!",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout>
            <DynamicTable
                title="Create User Roles & Permissions"
                data={data}
                columns={columns}
                hideToolbar
                customToolbar={
                    <FormLayout
                        handleSubmit={handleSubmit}
                        handleFormSubmit={onSubmit}
                        removeBorder
                        noPadding
                        formClassName="w-full flex justify-between items-center"
                    >
                        <FormFieldWrapper
                            parentClassName="w-3/4"
                            className="flex justify-between items-center"
                        >
                            {/* layer */}
                            <SearchedDropDown
                                className="flex-1 w-full"
                                name="layerId"
                                control={control}
                                label="Layer"
                                required
                                options={[
                                    { key: "Role 1", value: "Role 1" },
                                    { key: "Role 2", value: "Role 2" },
                                    { key: "Role 3", value: "Role 3" },
                                    { key: "Role 4", value: "Role 4" },
                                    { key: "Role 5", value: "Role 5" },
                                ]}
                                value={selectedLayer || ""}
                                onChange={(layerId) => {
                                    setSelectedLayer(layerId);
                                }}
                                placeholder="Select layer"
                            />

                            {/* module */}
                            <SearchedDropDown
                                className="flex-1 w-full"
                                name="module"
                                control={control}
                                label="Module"
                                required
                                options={[
                                    { key: "Module 1", value: "Module 1" },
                                    { key: "Module 2", value: "Module 2" },
                                    { key: "Module 3", value: "Module 3" },
                                    { key: "Module 4", value: "Module 4" },
                                    { key: "Module 5", value: "Module 5" },
                                ]}
                                value={selectedModule || ""}
                                onChange={(module) => {
                                    setSelectedModule(module);
                                }}
                                placeholder="Select module"
                            />

                            {/* role */}
                            <SearchedDropDown
                                className="flex-1 w-full"
                                name="role"
                                control={control}
                                label="Role"
                                required
                                options={[
                                    { key: "Role 1", value: "Role 1" },
                                    { key: "Role 2", value: "Role 2" },
                                    { key: "Role 3", value: "Role 3" },
                                    { key: "Role 4", value: "Role 4" },
                                    { key: "Role 5", value: "Role 5" },
                                ]}
                                value={selectedRole || ""}
                                onChange={(role) => {
                                    setSelectedRole(role);
                                }}
                                placeholder="Select role"
                            />
                        </FormFieldWrapper>

                        <FormButtons
                            className="w-1/4 justify-end!"
                            isLoading={isLoading}
                            submitText="add"
                            disabled={!formState.isDirty}
                            removeCancel
                        />
                    </FormLayout>
                }
            />
        </PageLayout>
    );
}

export default UserRolesPage;
