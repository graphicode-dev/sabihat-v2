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
import { dirtyFields, logFormData } from "../../../../../lib/utils";

type TermsConditions = {
    id?: string;
    title: string;
    description: string;
};

const termsConditionsSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
});

function TermsConditionsEditPage() {
    const fetchedData = {
        id: "1",
        title: "*****",
        description: "*****",
    };
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<TermsConditions>({
        title: "",
        description: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<TermsConditions>({
            resolver: zodResolver(termsConditionsSchema),
            defaultValues: {
                id: fetchedData.id,
                title: fetchedData.title,
                description: fetchedData.description,
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: TermsConditions) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (dirtyFields(formState).includes("title") && formData.title)
                apiFormData.append("title", formData.title);
            if (
                dirtyFields(formState).includes("description") &&
                formData.description
            )
                apiFormData.append("description", formData.description);

            logFormData(apiFormData);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Terms & Conditions added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding terms & conditions:", error);
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
                <FormFieldsLayout title="Edit" cols="1">
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
                    submitText="Update"
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default TermsConditionsEditPage;
