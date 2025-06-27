import { z } from "zod";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLayout from "../../../layout/FormLayout";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import { SearchedDropDown } from "../../SearchedDropDown";
import { FormButtons, FormInput } from "../../form";
import { DynamicTable } from "../../table";
import { TableColumn, TableData } from "../../../types/table";

type PassengersAgent = {
    id?: string;
    cabin: string;
    agent: string;
    passengers: string;
};

const passengersAgentSchema = z.object({
    id: z.string().optional(),
    cabin: z.string(),
    agent: z.string(),
    passengers: z.string(),
});

function PassengersAgentAllocationEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PassengersAgent>({
        cabin: "",
        agent: "",
        passengers: "",
    });

    const [selectedCabin, setSelectedCabin] = useState<string | null>(null);
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } =
        useForm<PassengersAgent>({
            resolver: zodResolver(passengersAgentSchema),
            defaultValues: {
                id: "",
                cabin: "",
                agent: "",
                passengers: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: PassengersAgent) => {
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
            if (formData.passengers) {
                apiFormData.append("passengers", formData.passengers);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Passengers Agent Allocation added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding passengers agent allocation:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.cabin) {
                    mappedErrors.cabin = error.errors.cabin[0];
                }
                if (error.errors.agent) {
                    mappedErrors.agent = error.errors.agent[0];
                }
                if (error.errors.passengers) {
                    mappedErrors.passengers = error.errors.passengers[0];
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
            id: "passengers",
            header: "Number of Passengers",
            accessorKey: "passengers",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                cabin: "Cabin 1",
                agent: "Agent 1",
                passengers: "10",
            },
        },
        {
            id: "2",
            columns: {
                cabin: "Cabin 2",
                agent: "Agent 2",
                passengers: "20",
            },
        },
        {
            id: "3",
            columns: {
                cabin: "Cabin 3",
                agent: "Agent 3",
                passengers: "30",
            },
        },
        {
            id: "4",
            columns: {
                cabin: "Cabin 4",
                agent: "Agent 4",
                passengers: "40",
            },
        },
        {
            id: "5",
            columns: {
                cabin: "Cabin 5",
                agent: "Agent 5",
                passengers: "50",
            },
        },
    ];

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormFieldsLayout cols="4">
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
                <SearchedDropDown
                    name="agent"
                    control={control}
                    label="Agent"
                    options={[
                        { key: "1", value: "Agent 1" },
                        { key: "2", value: "Agent 2" },
                        { key: "3", value: "Agent 3" },
                        { key: "4", value: "Agent 4" },
                        { key: "5", value: "Agent 5" },
                    ]}
                    value={selectedAgent}
                    onChange={(value) => {
                        setSelectedAgent(value);
                    }}
                    placeholder="Select Agent"
                />

                {/* Passengers */}
                <FormInput
                    name="passengers"
                    label="Passengers"
                    control={control}
                    type="text"
                    error={errors.passengers}
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
                    title="Passengers Cabins"
                    columns={columns}
                    data={data}
                    onRowClick={() => {}}
                    hideBorder
                />
            </FormFieldsLayout>

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default PassengersAgentAllocationEditPage;
