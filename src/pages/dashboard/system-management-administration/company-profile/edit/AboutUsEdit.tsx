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

type AboutUS = {
    id?: string;
    whoWeAre?: string;
    vision?: string;
    mission?: string;
    purpose?: string;
};

const aboutSchema = z.object({
    id: z.string().optional(),
    whoWeAre: z.string().optional(),
    vision: z.string().optional(),
    mission: z.string().optional(),
    purpose: z.string().optional(),
});

function AboutUsEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<AboutUS>({
        whoWeAre: "",
        vision: "",
        mission: "",
        purpose: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<AboutUS>({
        resolver: zodResolver(aboutSchema),
        defaultValues: {
            id: "",
            whoWeAre: "",
            vision: "",
            mission: "",
            purpose: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: AboutUS) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.whoWeAre) {
                apiFormData.append("whoWeAre", formData.whoWeAre);
            }
            if (formData.vision) {
                apiFormData.append("vision", formData.vision);
            }
            if (formData.mission) {
                apiFormData.append("mission", formData.mission);
            }
            if (formData.purpose) {
                apiFormData.append("purpose", formData.purpose);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "About us updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating about us:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.whoWeAre) {
                    mappedErrors.whoWeAre = error.errors.whoWeAre[0];
                }
                if (error.errors.vision) {
                    mappedErrors.vision = error.errors.vision[0];
                }
                if (error.errors.mission) {
                    mappedErrors.mission = error.errors.mission[0];
                }
                if (error.errors.purpose) {
                    mappedErrors.purpose = error.errors.purpose[0];
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
                    {/* whoWeAre */}
                    <FormInput
                        name="whoWeAre"
                        control={control}
                        label="Who We Are"
                        type="textarea"
                        error={errors.whoWeAre}
                        textareaResize="none"
                    />

                    {/* vision */}
                    <FormInput
                        name="vision"
                        control={control}
                        label="Vision"
                        type="textarea"
                        error={errors.vision}
                        textareaResize="none"
                    />

                    {/* mission */}
                    <FormInput
                        name="mission"
                        control={control}
                        label="Mission"
                        type="textarea"
                        error={errors.mission}
                        textareaResize="none"
                    />

                    {/* purpose */}
                    <FormInput
                        name="purpose"
                        control={control}
                        label="Purpose"
                        type="textarea"
                        error={errors.purpose}
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

export default AboutUsEditPage;
