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
import { dirtyFields, logFormData } from "../../../../../utils";

type Currency = {
    id: string;
    currencyName: string;
    currencyCode: string;
    currencyRate: string;
    lastDate: Date | null;
};

const currencySchema = z.object({
    id: z.string(),
    currencyName: z.string(),
    currencyCode: z.string(),
    currencyRate: z.string(),
    lastDate: z.date().nullable(),
});

function CurrencyEditPage() {
    const fetchedData = {
        id: "1",
        currencyName: "Currency 1",
        currencyCode: "C1",
        currencyRate: "1.00",
        lastDate: "2023-01-01",
    };
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Currency>({
        id: "",
        currencyName: "",
        currencyCode: "",
        currencyRate: "",
        lastDate: null,
    });

    const { control, handleSubmit, reset, formState } = useForm<Currency>({
        resolver: zodResolver(currencySchema),
        defaultValues: {
            id: fetchedData.id,
            currencyName: fetchedData.currencyName,
            currencyCode: fetchedData.currencyCode,
            currencyRate: fetchedData.currencyRate,
            lastDate: fetchedData.lastDate
                ? new Date(fetchedData.lastDate)
                : null,
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Currency) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (
                dirtyFields(formState).includes("currencyName") &&
                formData.currencyName
            ) {
                apiFormData.append("currencyName", formData.currencyName);
            }
            if (
                dirtyFields(formState).includes("currencyCode") &&
                formData.currencyCode
            ) {
                apiFormData.append("currencyCode", formData.currencyCode);
            }
            if (
                dirtyFields(formState).includes("currencyRate") &&
                formData.currencyRate
            ) {
                apiFormData.append("currencyRate", formData.currencyRate);
            }
            if (
                dirtyFields(formState).includes("lastDate") &&
                formData.lastDate
            ) {
                apiFormData.append("lastDate", formData.lastDate.toISOString());
            }

            logFormData(apiFormData);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Currency updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding currency:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.currencyName) {
                    mappedErrors.currencyName = error.errors.currencyName[0];
                }
                if (error.errors.currencyCode) {
                    mappedErrors.currencyCode = error.errors.currencyCode[0];
                }
                if (error.errors.currencyRate) {
                    mappedErrors.currencyRate = error.errors.currencyRate[0];
                }
                if (error.errors.lastDate) {
                    mappedErrors.lastDate = error.errors.lastDate[0];
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
                    {/* currencyName */}
                    <FormInput
                        name="currencyName"
                        control={control}
                        label="Currency Name"
                        type="text"
                        error={errors.currencyName}
                    />

                    {/* currencyCode */}
                    <FormInput
                        name="currencyCode"
                        control={control}
                        label="Currency Code"
                        type="text"
                        error={errors.currencyCode}
                    />

                    {/* currencyRate */}
                    <FormInput
                        name="currencyRate"
                        control={control}
                        label="Currency Rate"
                        type="text"
                        error={errors.currencyRate}
                    />

                    {/* lastDate */}
                    <FormInput
                        name="lastDate"
                        control={control}
                        label="Last Date"
                        type="date"
                        error={errors.lastDate?.toString()}
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

export default CurrencyEditPage;
