import { useState } from "react";
import { DynamicTable } from "../../../../../components/table";
import PageLayout from "../../../../../layout/PageLayout";
import { FormButtons, FormFieldWrapper } from "../../../../../components/form";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import FormLayout from "../../../../../layout/FormLayout";
import { useToast } from "../../../../../hooks/useToast";
import { CheckBox } from "../../../../../components/ui/CheckBox";
import { dirtyFields, logFormData } from "../../../../../lib/utils";

// Define the permission types
type PermissionType = "read" | "write" | "create" | "delete";

// Define the permission form values interface
interface PermissionFormValues {
    read: boolean;
    write: boolean;
    create: boolean;
    delete: boolean;
}

// Interface for permission matrix
interface PermissionMatrix {
    [activityId: string]: {
        [permission in PermissionType]?: boolean;
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
const permissionSchema = z.object({
    read: z.boolean(),
    write: z.boolean(),
    create: z.boolean(),
    delete: z.boolean(),
});

export default function UserRolesEditPage() {
    const fetchedData = {
        id: "1",
        layerId: "1",
        module: "Module 1",
        role: "Role 1",

        activities: [
            { id: "trip", name: "Trip" },
            { id: "ship", name: "Ship" },
            { id: "cabins", name: "Cabins" },
            { id: "activity4", name: "*****" },
            { id: "activity5", name: "*****" },
        ],
    };
    const { addToast } = useToast();

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

    const {
        control: roleControl,
        handleSubmit: roleHandleSubmit,
        reset: roleReset,
        formState: roleFormState,
    } = useForm<UserRoles>({
        resolver: zodResolver(userRolesSchema),
        defaultValues: {
            layerId: fetchedData.layerId,
            module: fetchedData.module,
            role: fetchedData.role,
        },

        mode: "onChange",
    });

    const {
        control: permissionControl,
        handleSubmit: permissionHandleSubmit,
        reset: permissionReset,
        formState: permissionFormState,
    } = useForm<PermissionFormValues>({
        resolver: zodResolver(permissionSchema),
        defaultValues: {
            read: fetchedData.activities.some(
                (activity) => permissions[activity.id]?.read === true
            ),
            write: fetchedData.activities.some(
                (activity) => permissions[activity.id]?.write === true
            ),
            create: fetchedData.activities.some(
                (activity) => permissions[activity.id]?.create === true
            ),
            delete: fetchedData.activities.some(
                (activity) => permissions[activity.id]?.delete === true
            ),
        },

        mode: "onChange",
    });

    // Toggle permission for a specific activity and permission type
    const togglePermission = (
        activityId: string,
        permission: PermissionType
    ) => {
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

    // Create data for the table
    const data = fetchedData.activities.map((activity) => ({
        id: activity.id,
        columns: {
            activity: activity.name,
            read: permissions[activity.id]?.read ? "true" : "false",
            write: permissions[activity.id]?.write ? "true" : "false",
            create: permissions[activity.id]?.create ? "true" : "false",
            delete: permissions[activity.id]?.delete ? "true" : "false",
        },
    }));

    const onSubmitRole = async (formData: UserRoles) => {
        setIsLoading(true);
        try {
            const validatedData = userRolesSchema.parse(formData);
            console.log("Validated data:", validatedData);

            const apiFormData = new FormData();

            if (
                dirtyFields(roleFormState).includes("layerId") &&
                formData.layerId
            )
                apiFormData.append("layerId", formData.layerId);
            if (
                dirtyFields(roleFormState).includes("module") &&
                formData.module
            )
                apiFormData.append("module", formData.module);
            if (dirtyFields(roleFormState).includes("role") && formData.role)
                apiFormData.append("role", formData.role);

            logFormData(apiFormData);

            addToast({
                message: "User profile updated successfully",
                type: "success",
                title: "Success!",
            });

            roleReset();
            setSelectedLayer(null);
            setSelectedModule(null);
            setSelectedRole(null);
        } catch (error: any) {
            console.error("Error updating user profile:", error);
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
    const onSubmitPermission = async (formData: PermissionFormValues) => {
        setIsLoading(true);
        try {
            const validatedData = permissionSchema.parse(formData);
            console.log("Validated data:", validatedData);

            const apiFormData = new FormData();

            if (dirtyFields(permissionFormState).includes("read"))
                apiFormData.append("read", formData.read.toString());
            if (dirtyFields(permissionFormState).includes("write"))
                apiFormData.append("write", formData.write.toString());
            if (dirtyFields(permissionFormState).includes("create"))
                apiFormData.append("create", formData.create.toString());
            if (dirtyFields(permissionFormState).includes("delete"))
                apiFormData.append("delete", formData.delete.toString());

            logFormData(apiFormData);

            addToast({
                message: "Permission updated successfully",
                type: "success",
                title: "Success!",
            });

            permissionReset();
        } catch (error: any) {
            console.error("Error updating permission:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};
                if (error.errors.read) {
                    mappedErrors.read = error.errors.read[0];
                }
                if (error.errors.write) {
                    mappedErrors.write = error.errors.write[0];
                }
                if (error.errors.create) {
                    mappedErrors.create = error.errors.create[0];
                }
                if (error.errors.delete) {
                    mappedErrors.delete = error.errors.delete[0];
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
        <PageLayout showBorder>
            <FormLayout
                handleSubmit={permissionHandleSubmit}
                handleFormSubmit={onSubmitPermission}
                removeBorder
                noPadding
            >
                <DynamicTable
                    title="Edit Roles & Permissions"
                    data={data}
                    columns={columns}
                    hideToolbar
                    customToolbar={
                        <FormLayout
                            handleSubmit={roleHandleSubmit}
                            handleFormSubmit={onSubmitRole}
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
                                    control={roleControl}
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
                                    control={roleControl}
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
                                    control={roleControl}
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
                                disabled={!roleFormState.isDirty}
                                removeCancel
                            />
                        </FormLayout>
                    }
                    onRowClick={() => {}}
                    noPadding
                    hideBorder
                />

                <div className="flex flex-col h-[250px] justify-end items-start">
                    <FormButtons
                        isLoading={isLoading}
                        submitText="add"
                        disabled={!permissionFormState.isDirty}
                    />
                </div>
            </FormLayout>
        </PageLayout>
    );
}
