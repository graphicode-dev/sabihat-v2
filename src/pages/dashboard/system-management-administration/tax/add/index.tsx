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

type Tax = {
    name: string;
    type: string;
    taxBase: string;
    amountValue: string;
    ledgerAccountId: string;
    description: string;
};

const taxSchema = z.object({
    name: z.string(),
    type: z.string(),
    taxBase: z.string(),
    amountValue: z.string(),
    ledgerAccountId: z.string(),
    description: z.string(),
});

function TaxAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Tax>({
        name: "",
        type: "",
        taxBase: "",
        amountValue: "",
        ledgerAccountId: "",
        description: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Tax>({
        resolver: zodResolver(taxSchema),
        defaultValues: {
            name: "",
            type: "",
            taxBase: "",
            amountValue: "",
            ledgerAccountId: "",
            description: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Tax) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("name", formData.name);
        apiFormData.append("type", formData.type);
        apiFormData.append("taxBase", formData.taxBase);
        apiFormData.append("amountValue", formData.amountValue);
        apiFormData.append("ledgerAccountId", formData.ledgerAccountId);
        apiFormData.append("description", formData.description);

        await ENDPOINTS.tax
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Tax added successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
                navigate(-1);
                setIsLoading(false);
            })
            .catch((error) => {
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

                    {/* type */}
                    <FormInput
                        name="type"
                        control={control}
                        label="Type"
                        type="text"
                        error={errors.type}
                    />

                    {/* amountValue */}
                    <FormInput
                        name="amountValue"
                        control={control}
                        label="Amount Value"
                        type="text"
                        error={errors.amountValue}
                    />

                    {/* taxBase */}
                    <FormInput
                        name="taxBase"
                        control={control}
                        label="Tax Base"
                        type="text"
                        error={errors.taxBase}
                    />

                    {/* ledgerAccountId */}
                    <FormInput
                        name="ledgerAccountId"
                        control={control}
                        label="Ledger Account ID"
                        type="text"
                        error={errors.ledgerAccountId}
                    />

                    {/* description */}
                    <FormInput
                        name="description"
                        control={control}
                        label="Description"
                        type="text"
                        error={errors.description}
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
