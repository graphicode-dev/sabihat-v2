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

type Policies = {
    id?: string;
    title: string;
    description: string;
};

const policiesSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
});

function PoliciesAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Policies>({
        title: "",
        description: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Policies>({
        resolver: zodResolver(policiesSchema),
        defaultValues: {
            id: "",
            title: "",
            description: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Policies) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            apiFormData.append("title", formData.title);
            apiFormData.append("description", formData.description);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Policy added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding policy:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.title) {
                    mappedErrors.title = error.errors.title[0];
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
                <FormFieldsLayout title="Add" cols="1">
                    {/* title */}
                    <FormInput
                        name="title"
                        control={control}
                        label="Title"
                        type="text"
                        error={errors.title}
                    />

                    {/* description */}
                    <FormInput
                        name="description"
                        control={control}
                        label="Description"
                        type="textarea"
                        error={errors.description}
                        rows={5}
                        textareaResize="none"
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

export default PoliciesAddPage;
