import { z } from "zod";
import { useToast } from "../../../../../../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "../../../../../../../layout/PageLayout";
import FormLayout from "../../../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../../../components/form";
import { ENDPOINTS } from "../../../../../../../config/endpoints";

type CurrencyRate = {
    currency_id: string;
    rate: string;
};

const currencyRateSchema = z.object({
    currency_id: z.string(),
    rate: z.string(),
});

function CurrencyRateAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<CurrencyRate>({
        currency_id: "",
        rate: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<CurrencyRate>({
        resolver: zodResolver(currencyRateSchema),
        defaultValues: {
            currency_id: id || "",
            rate: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: CurrencyRate) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        // Always use the ID from URL params
        apiFormData.append("currency_id", id || "");

        if (formData.rate) {
            apiFormData.append("rate", formData.rate);
        }

        await ENDPOINTS.currencyRate
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Currency rate added successfully",
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
                    {/* rate */}
                    <FormInput
                        name="rate"
                        control={control}
                        label="Rate"
                        type="number"
                        error={String(errors.rate)}
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

export default CurrencyRateAddPage;
