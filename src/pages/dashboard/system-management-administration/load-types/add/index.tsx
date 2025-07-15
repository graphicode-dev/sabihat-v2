import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormButtons, FormInput } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ENDPOINTS } from "../../../../../config/endpoints";

type Cargo = {
    name: string;
};

const cargoSchema = z.object({
    name: z.string(),
});

function LoadTypeAddPage() {
    const { addToast } = useToast();
    const { name } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Cargo>({
        name: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Cargo>({
        resolver: zodResolver(cargoSchema),
        defaultValues: {
            name: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Cargo) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("name", formData.name);

        await ENDPOINTS.loadTypes
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: `${name?.toUpperCase()} added successfully`,
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
                <FormFieldsLayout title="Add">
                    {/* Name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        type="text"
                        error={errors.name}
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

export default LoadTypeAddPage;
