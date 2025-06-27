import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { z } from "zod";
import { DynamicTable } from "../../table";
import { TableColumn, TableData } from "../../../types/table";
import ToggleButton from "../../ui/ToggleButton";

type User = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    userStatus: boolean;
};

type UsersFormData = {
    users: Record<string, boolean>; // Map of user IDs to their status
};

const usersSchema = z.object({
    users: z.record(z.string(), z.boolean()),
});

function UsersAddForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<User[]>([]);

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

    // Load initial user data
    useEffect(() => {
        // In a real app, you would fetch this data from an API
        const initialData: User[] = [
            {
                id: "1",
                name: "*****",
                email: "*****",
                phone: "*****",
                address: "*****",
                userStatus: true,
            },
            {
                id: "2",
                name: "*****",
                email: "*****",
                phone: "*****",
                address: "*****",
                userStatus: true,
            },
            {
                id: "3",
                name: "*****",
                email: "*****",
                phone: "*****",
                address: "*****",
                userStatus: true,
            },
            {
                id: "4",
                name: "*****",
                email: "*****",
                phone: "*****",
                address: "*****",
                userStatus: false,
            },
            {
                id: "5",
                name: "*****",
                email: "*****",
                phone: "*****",
                address: "*****",
                userStatus: false,
            },
        ];

        setUserData(initialData);

        // Initialize form values with user statuses
        const initialStatuses: Record<string, boolean> = {};
        initialData.forEach((user) => {
            initialStatuses[user.id] = user.userStatus;
        });

        setValue("users", initialStatuses);
    }, [setValue]);

    const onSubmit = async (formData: UsersFormData) => {
        setIsLoading(true);
        try {
            // Create FormData object for API submission
            const apiFormData = new FormData();

            // Convert the users object to a format suitable for your API
            Object.entries(formData.users).forEach(([userId, status]) => {
                apiFormData.append(`users[${userId}]`, status.toString());
            });

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/users/update-status', apiFormData);

            console.log("Form data to submit:", formData.users);

            addToast({
                message: "User statuses updated successfully",
                type: "success",
                title: "Success!",
            });

            // Don't reset the form as we want to keep the current state
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Users:", error);
            if (error?.errors) {
                // Handle API validation errors if needed
                console.log("API errors:", error.errors);
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

    const onToggle = (id: string, checked: boolean) => {
        console.log("Toggle for user ID:", id, "New status:", checked);
        addToast({
            type: "success",
            message: `Toggle for user ID: ${id} New status: ${checked}`,
        });
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
            id: "userStatus",
            header: "User Status",
            accessorKey: "userStatus",
            cell: ({ row }: { row: any }) => {
                const userId = row.original.id;
                // Use Controller to connect the toggle button to the form
                return (
                    <Controller
                        control={control}
                        name={`users.${userId}`}
                        render={({ field }) => (
                            <ToggleButton
                                initialChecked={field.value}
                                onToggle={(checked) =>
                                    onToggle(userId, checked)
                                }
                            />
                        )}
                    />
                );
            },
        },
    ];
    // Transform userData into the format expected by DynamicTable
    const data: TableData[] = userData.map((user) => ({
        id: user.id,
        columns: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            userStatus: formValues.users?.[user.id] ?? user.userStatus,
        },
    }));

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
                isLoading={isLoading}
                disabled={!formState.isDirty}
                submitText="Save Changes"
            />
        </FormLayout>
    );
}

export default UsersAddForm;
