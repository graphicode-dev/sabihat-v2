import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormButtons } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate } from "react-router-dom";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";

type Passenger = {
    id?: string;
    typeName: string;
};

const passengerSchema = z.object({
    id: z.string().optional(),
    typeName: z.string(),
});

function PassengerAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTypeName, setSelectedTypeName] = useState<string>("");

    const { control, handleSubmit, reset, formState } = useForm<Passenger>({
        resolver: zodResolver(passengerSchema),
        defaultValues: {
            id: "",
            typeName: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Passenger) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            apiFormData.append("typeNames", formData.typeName);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Passenger added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding passenger:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.typeName) {
                    mappedErrors.typeName = error.errors.typeName[0];
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
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Add">
                    {/* Type Name */}
                    <SearchedDropDown
                        name="typeName"
                        control={control}
                        label="Type Name"
                        options={[
                            {
                                key: "Passenger",
                                value: "Passenger",
                            },
                            {
                                key: "Cargo",
                                value: "Cargo",
                            },
                            {
                                key: "Passenger and Cargo",
                                value: "Passenger and Cargo",
                            },
                        ]}
                        value={selectedTypeName}
                        onChange={(value) => {
                            setSelectedTypeName(value);
                        }}
                        placeholder="Select type name"
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    submitText="add"
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default PassengerAddPage;
