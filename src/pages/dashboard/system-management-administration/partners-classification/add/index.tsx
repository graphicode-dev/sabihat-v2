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

type Error = {
    nameClass?: string;
};

type Partners = {
    id?: string;
    nameClass?: string;
};

const partnersSchema = z.object({
    id: z.string().optional(),
    nameClass: z.string().optional(),
});

function PartnersClassificationAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        nameClass: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Partners>({
        resolver: zodResolver(partnersSchema),
        defaultValues: {
            id: "",
            nameClass: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Partners) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.nameClass) {
                apiFormData.append("nameClass", formData.nameClass);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Partners classification added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding partners classification:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.nameClass) {
                    mappedErrors.nameClass = error.errors.nameClass[0];
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
                <FormFieldsLayout title="Add" cols="5">
                    {/* nameClass */}
                    <FormInput
                        name="nameClass"
                        control={control}
                        label="Name Class"
                        type="text"
                        error={errors.nameClass}
                        colSpan={1}
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

export default PartnersClassificationAddPage;
