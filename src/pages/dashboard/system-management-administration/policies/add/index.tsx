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
import { ENDPOINTS } from "../../../../../config/endpoints";

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
        const apiFormData = new FormData();

        apiFormData.append("title", formData.title);
        apiFormData.append("description", formData.description);

        await ENDPOINTS.policies
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Policy added successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
                navigate(-1);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                return setErrors(error);
            });
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
