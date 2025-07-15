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

type Currency = {
    name: string;
    code: string;
};

const currencySchema = z.object({
    name: z.string(),
    code: z.string(),
});

function CurrencyAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Currency>({
        name: "",
        code: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Currency>({
        resolver: zodResolver(currencySchema),
        defaultValues: {
            name: "",
            code: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Currency) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        if (formData.name) {
            apiFormData.append("name", formData.name);
        }
        if (formData.code) {
            apiFormData.append("code", formData.code);
        }

        await ENDPOINTS.currency
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Currency added successfully",
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
                    {/* name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        type="text"
                        error={errors.name}
                    />

                    {/* code */}
                    <FormInput
                        name="code"
                        control={control}
                        label="Code"
                        type="text"
                        error={errors.code}
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

export default CurrencyAddPage;
