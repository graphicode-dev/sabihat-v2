import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormInput, FormButtons } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate } from "react-router-dom";

type Tax = {
    id?: string;
    taxName: string;
    taxType: string;
    amountValue: string;
    description: string;
};

const taxSchema = z.object({
    id: z.string().optional(),
    taxName: z.string(),
    taxType: z.string(),
    amountValue: z.string(),
    description: z.string(),
});

function TaxAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Tax>({
        taxName: "",
        taxType: "",
        amountValue: "",
        description: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Tax>({
        resolver: zodResolver(taxSchema),
        defaultValues: {
            id: "",
            taxName: "",
            taxType: "",
            amountValue: "",
            description: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Tax) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            apiFormData.append("taxName", formData.taxName);
            apiFormData.append("taxType", formData.taxType);
            apiFormData.append("amountValue", formData.amountValue);
            apiFormData.append("description", formData.description);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Tax added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding tax:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.taxName) {
                    mappedErrors.taxName = error.errors.taxName[0];
                }
                if (error.errors.taxType) {
                    mappedErrors.taxType = error.errors.taxType[0];
                }
                if (error.errors.amountValue) {
                    mappedErrors.amountValue = error.errors.amountValue[0];
                }
                if (error.errors.description) {
                    mappedErrors.description = error.errors.description[0];
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

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Add">
                    {/* taxName */}
                    <FormInput
                        name="taxName"
                        control={control}
                        label="Tax Name"
                        type="text"
                        error={errors.taxName}
                        required
                    />

                    {/* taxType */}
                    <FormInput
                        name="taxType"
                        control={control}
                        label="Tax Type"
                        type="text"
                        error={errors.taxType}
                        required
                    />

                    {/* amountValue */}
                    <FormInput
                        name="amountValue"
                        control={control}
                        label="Amount Value"
                        type="text"
                        error={errors.amountValue}
                        required
                    />

                    {/* description */}
                    <FormInput
                        name="description"
                        control={control}
                        label="Description"
                        type="text"
                        error={errors.description}
                        required
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

export default TaxAddPage;
