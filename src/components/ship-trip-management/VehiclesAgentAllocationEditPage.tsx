import { z } from "zod";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLayout from "../../layout/FormLayout";
import FormFieldsLayout from "../../layout/FormFieldsLayout";
import { SearchedDropDown } from "../SearchedDropDown";
import { FormButtons, FormInput } from "../form";
import { DynamicTable } from "../table";
import { TableColumn, TableData } from "../../types/table";

type VehiclesAgent = {
    id?: string;
    cabin: string;
    agent: string;
    availableWeight: string;
    availableSize: string;
    availableQuantity: string;
};

const vehiclesAgentSchema = z.object({
    id: z.string().optional(),
    cabin: z.string(),
    agent: z.string(),
    availableWeight: z.string(),
    availableSize: z.string(),
    availableQuantity: z.string(),
});

function VehiclesAgentAllocationEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<VehiclesAgent>({
        cabin: "",
        agent: "",
        availableWeight: "",
        availableSize: "",
        availableQuantity: "",
    });

    const [selectedCabin, setSelectedCabin] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<VehiclesAgent>({
        resolver: zodResolver(vehiclesAgentSchema),
        defaultValues: {
            id: "",
            cabin: "",
            agent: "",
            availableWeight: "",
            availableSize: "",
            availableQuantity: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: VehiclesAgent) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.cabin) {
                apiFormData.append("cabin", formData.cabin);
            }
            if (formData.agent) {
                apiFormData.append("agent", formData.agent);
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
                message: "Vehicles Agent Allocation added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding vehicles agent allocation:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.cabin) {
                    mappedErrors.cabin = error.errors.cabin[0];
                }
                if (error.errors.agent) {
                    mappedErrors.agent = error.errors.agent[0];
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
            id: "agent",
            header: "Agent",
            accessorKey: "agent",
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
                cabin: "Cabin 1",
                agent: "Agent 1",
                availableWeight: "10",
                availableSize: "10",
                availableQuantity: "10",
            },
        },
        {
            id: "2",
            columns: {
                cabin: "Cabin 2",
                agent: "Agent 2",
                availableWeight: "20",
                availableSize: "20",
                availableQuantity: "20",
            },
        },
        {
            id: "3",
            columns: {
                cabin: "Cabin 3",
                agent: "Agent 3",
                availableWeight: "30",
                availableSize: "30",
                availableQuantity: "30",
            },
        },
        {
            id: "4",
            columns: {
                cabin: "Cabin 4",
                agent: "Agent 4",
                availableWeight: "40",
                availableSize: "40",
                availableQuantity: "40",
            },
        },
        {
            id: "5",
            columns: {
                cabin: "Cabin 5",
                agent: "Agent 5",
                availableWeight: "50",
                availableSize: "50",
                availableQuantity: "50",
            },
        },
    ];

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormFieldsLayout cols="6">
                {/* Cabin */}
                <SearchedDropDown
                    name="cabin"
                    control={control}
                    label="Cabin"
                    options={[
                        { key: "1", value: "Cabin 1" },
                        { key: "2", value: "Cabin 2" },
                        { key: "3", value: "Cabin 3" },
                        { key: "4", value: "Cabin 4" },
                        { key: "5", value: "Cabin 5" },
                    ]}
                    value={selectedCabin}
                    onChange={(value) => {
                        setSelectedCabin(value);
                    }}
                    placeholder="Select Cabin"
                />

                {/* Agent */}
                <FormInput
                    name="agent"
                    label="Agent"
                    control={control}
                    type="text"
                    error={errors.agent}
                />

                {/* Available Weight */}
                <FormInput
                    name="availableWeight"
                    label="Available Weight"
                    control={control}
                    type="text"
                    error={errors.availableWeight}
                    requiredLabel="Available 40"
                />

                {/* Available Size */}
                <FormInput
                    name="availableSize"
                    label="Available Size"
                    control={control}
                    type="text"
                    error={errors.availableSize}
                    requiredLabel="Available 40"
                />

                {/* Available Quantity */}
                <FormInput
                    name="availableQuantity"
                    label="Available Quantity"
                    control={control}
                    type="text"
                    error={errors.availableQuantity}
                    requiredLabel="Available 40"
                />

                <FormButtons
                    className="justify-end!"
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                    removeCancel
                />
            </FormFieldsLayout>

            <FormFieldsLayout cols="1">
                <DynamicTable
                    title="Vehicles Parking's"
                    columns={columns}
                    data={data}
                    hideBorder
                />
            </FormFieldsLayout>

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default VehiclesAgentAllocationEditPage;
