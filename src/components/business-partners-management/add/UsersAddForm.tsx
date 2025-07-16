import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { DynamicTable } from "../../table";
import { TableColumn, TableData } from "../../../types/table";
import ToggleButton from "../../ui/ToggleButton";
import { usePartnerForm } from "../../../contexts/PartnerFormContext";

type UsersFormData = {
    users: Record<string, boolean>;
};

const usersSchema = z.object({
    users: z.record(z.string(), z.boolean()),
});

type UsersAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function UsersAddForm({ handleChangeTab }: UsersAddFormProps) {
    // Get form data and errors from context
    const { users, updateUsers, submitForm, isSubmitting, lockTab } =
        usePartnerForm();

    // Initialize form with user data
    const { control, handleSubmit, formState, setValue, watch } =
        useForm<UsersFormData>({
            resolver: zodResolver(usersSchema),
            defaultValues: {
                users: {},
            },
            mode: "onChange",
        });

    // Watch the form values for changes
    const formValues = watch();

    // Initialize form values with user statuses from context
    useEffect(() => {
        // Create a record of user statuses
        const userStatuses: Record<string, boolean> = {};

        // If we have users in context, set default active status
        if (users && users.length > 0) {
            users.forEach((_, index) => {
                // Default all users to active since UserForm doesn't have an active property
                userStatuses[index.toString()] = true;
            });
        } else {
            // Default empty user if none exist
            userStatuses["0"] = false;
        }

        setValue("users", userStatuses);
    }, [users, setValue]);

    const onSubmit = async (_formData: UsersFormData) => {
        updateUsers(users);

        // Submit the entire form
        await submitForm();
    };

    const onToggle = (id: string, checked: boolean) => {
        // Update the form state with the new status
        setValue(`users.${id}`, checked, {
            shouldDirty: true, // Mark form as dirty to enable submit button
            shouldValidate: true, // Trigger validation
        });
    };

    const columns: TableColumn[] = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "phoneNumber",
            header: "Phone",
            accessorKey: "phoneNumber",
        },
        {
            id: "role",
            header: "Role",
            accessorKey: "role",
        },
        {
            id: "active",
            header: "User Status",
            accessorKey: "active",
            cell: ({ row }: { row: any }) => {
                const userIndex = row.original.id;
                // Use Controller to connect the toggle button to the form
                return (
                    <Controller
                        control={control}
                        name={`users.${userIndex}`}
                        render={({ field }) => (
                            <ToggleButton
                                initialChecked={field.value}
                                onToggle={(checked) =>
                                    onToggle(userIndex, checked)
                                }
                            />
                        )}
                    />
                );
            },
        },
    ];
    // Transform users from context into the format expected by DynamicTable
    const data: TableData[] = users.map((user, index) => ({
        id: index.toString(),
        columns: {
            name: user.name || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            role: user.role || "",
            active: formValues.users?.[index.toString()] ?? true,
        },
    }));

    // If no users exist, add an empty row
    if (data.length === 0) {
        data.push({
            id: "0",
            columns: {
                name: "",
                email: "",
                phoneNumber: "",
                role: "",
                active: false,
            },
        });
    }

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormFieldsLayout cols="1">
                <DynamicTable
                    title="Users"
                    data={data}
                    columns={columns}
                    disableRowClick
                    hideBorder
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isSubmitting}
                disabled={!formState.isDirty}
                cancelText="Back"
                submitText="Submit"
                onCancel={() => handleChangeTab("contactInformation")}
                removeCancel={lockTab}
            />
        </FormLayout>
    );
}

export default UsersAddForm;
