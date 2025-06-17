import { z } from "zod";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLayout from "../../layout/FormLayout";
import FormFieldsLayout from "../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../form";
import { SearchedDropDown } from "../SearchedDropDown";
import { DynamicTable } from "../table";
import { TableColumn, TableData } from "../../types/table";

type VehiclesParking = {
    id?: string;
    cabin: string;
    availableWeight: string;
    availableSize: string;
    availableQuantity: string;
};

const vehiclesParkingSchema = z.object({
    id: z.string().optional(),
    cabin: z.string(),
    availableWeight: z.string(),
    availableSize: z.string(),
    availableQuantity: z.string(),
});

function VehiclesParkingEditForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<VehiclesParking>({
        cabin: "",
        availableWeight: "",
        availableSize: "",
        availableQuantity: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<VehiclesParking>({
            resolver: zodResolver(vehiclesParkingSchema),
            defaultValues: {
                id: "",
                cabin: "",
                availableWeight: "",
                availableSize: "",
                availableQuantity: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: VehiclesParking) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.cabin) {
                apiFormData.append("cabin", formData.cabin);
            }
            if (formData.availableWeight) {
                apiFormData.append("availableWeight", formData.availableWeight);
            }
            if (formData.availableSize) {
                apiFormData.append("availableSize", formData.availableSize);
            }
            if (formData.availableQuantity) {
                apiFormData.append(
                    "availableQuantity",
                    formData.availableQuantity
                );
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Vehicles Parking added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding vehicles parking:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.cabin) {
                    mappedErrors.cabin = error.errors.cabin[0];
                }
                if (error.errors.availableWeight) {
                    mappedErrors.availableWeight =
                        error.errors.availableWeight[0];
                }
                if (error.errors.availableSize) {
                    mappedErrors.availableSize = error.errors.availableSize[0];
                }
                if (error.errors.availableQuantity) {
                    mappedErrors.availableQuantity =
                        error.errors.availableQuantity[0];
                }

                console.log("Mapped errors:", mappedErrors);
                setErrors(mappedErrors);
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

    const columns: TableColumn[] = [
        {
            id: "cabin",
            header: "Cabin",
            accessorKey: "cabin",
        },
        {
            id: "availableWeight",
            header: "Available Weight",
            accessorKey: "availableWeight",
        },
        {
            id: "availableSize",
            header: "Available Size",
            accessorKey: "availableSize",
        },
        {
            id: "availableQuantity",
            header: "Available Quantity",
            accessorKey: "availableQuantity",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                cabin: "*****",
                availableWeight: "*****",
                availableSize: "*****",
                availableQuantity: "*****",
            },
        },
        {
            id: "2",
            columns: {
                cabin: "*****",
                availableWeight: "*****",
                availableSize: "*****",
                availableQuantity: "*****",
            },
        },
        {
            id: "3",
            columns: {
                cabin: "*****",
                availableWeight: "*****",
                availableSize: "*****",
                availableQuantity: "*****",
            },
        },
        {
            id: "4",
            columns: {
                cabin: "*****",
                availableWeight: "*****",
                availableSize: "*****",
                availableQuantity: "*****",
            },
        },
    ];

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormLayout
                handleSubmit={handleSubmit}
                handleFormSubmit={onSubmit}
                removeBorder
            >
                <FormFieldsLayout cols="5">
                    {/* cabin */}
                    <FormInput
                        name="cabin"
                        control={control}
                        label="Cabin"
                        type="text"
                        error={errors.cabin}
                    />

                    {/* availableWeight */}
                    <FormInput
                        name="availableWeight"
                        control={control}
                        label="Available Weight"
                        type="text"
                        error={errors.availableWeight}
                        requiredLabel="Available 40"
                    />

                    {/* availableSize */}
                    <FormInput
                        name="availableSize"
                        control={control}
                        label="Available Size"
                        type="text"
                        error={errors.availableSize}
                        requiredLabel="Available 40"
                    />

                    {/* availableQuantity */}
                    <FormInput
                        name="availableQuantity"
                        control={control}
                        label="Available Quantity"
                        type="text"
                        error={errors.availableQuantity}
                        requiredLabel="Available 40"
                    />

                    <FormButtons
                        className="justify-end!"
                        isLoading={isLoading}
                        disabled={!formState.isDirty}
                        submitText="Add"
                        removeCancel
                    />
                </FormFieldsLayout>
            </FormLayout>

            <DynamicTable
                title="Vehicles Parking's"
                data={data}
                columns={columns}
                hideBorder
            />

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default VehiclesParkingEditForm;
