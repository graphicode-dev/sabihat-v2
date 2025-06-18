import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormLayout from "../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../components/form";
import PageLayout from "../../../../../layout/PageLayout";

type PassengerPriceList = {
    id?: string;
    name: string;
    currency: string;
};

const passengerPriceListSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    currency: z.string(),
});

function ExcessBaggagePriceB2CPassengerEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PassengerPriceList>({
        name: "",
        currency: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<PassengerPriceList>({
            resolver: zodResolver(passengerPriceListSchema),
            defaultValues: {
                id: "",
                name: "",
                currency: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: PassengerPriceList) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.name) {
                apiFormData.append("name", formData.name);
            }
            if (formData.currency) {
                apiFormData.append("currency", formData.currency);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Passenger Price List updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Passenger Price List:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.currency) {
                    mappedErrors.currency = error.errors.currency[0];
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
                <FormFieldsLayout title="Edit">
                    {/* Name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        error={errors.name}
                    />

                    {/* Currency */}
                    <FormInput
                        name="currency"
                        control={control}
                        label="Currency"
                        error={errors.currency}
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default ExcessBaggagePriceB2CPassengerEditPage;
