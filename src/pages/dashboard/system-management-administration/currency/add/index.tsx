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
    currencyName?: string;
    currencyCode?: string;
    currencyRate?: string;
    lastDate?: string;
};

type Currency = {
    id?: string;
    currencyName?: string;
    currencyCode?: string;
    currencyRate?: string;
    lastDate?: string;
};

const currencySchema = z.object({
    id: z.string().optional(),
    currencyName: z.string().optional(),
    currencyCode: z.string().optional(),
    currencyRate: z.string().optional(),
    lastDate: z.string().optional(),
});

function CurrencyAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        currencyName: "",
        currencyCode: "",
        currencyRate: "",
        lastDate: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Currency>({
        resolver: zodResolver(currencySchema),
        defaultValues: {
            id: "",
            currencyName: "",
            currencyCode: "",
            currencyRate: "",
            lastDate: "",
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
            if (formData.currencyName) {
                apiFormData.append("currencyName", formData.currencyName);
            }
            if (formData.currencyCode) {
                apiFormData.append("currencyCode", formData.currencyCode);
            }
            if (formData.currencyRate) {
                apiFormData.append("currencyRate", formData.currencyRate);
            }
            if (formData.lastDate) {
                apiFormData.append("lastDate", formData.lastDate);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Currency added successfully",
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
                <FormFieldsLayout title="Add">
                    {/* currencyName */}
                    <FormInput
                        name="currencyName"
                        control={control}
                        label="Currency Name"
                        type="text"
                        error={errors.currencyName}
                        colSpan={1}
                    />

                    {/* currencyCode */}
                    <FormInput
                        name="currencyCode"
                        control={control}
                        label="Currency Code"
                        type="text"
                        error={errors.currencyCode}
                        colSpan={1}
                    />

                    {/* currencyRate */}
                    <FormInput
                        name="currencyRate"
                        control={control}
                        label="Currency Rate"
                        type="text"
                        error={errors.currencyRate}
                        colSpan={1}
                    />

                    {/* lastDate */}
                    <FormInput
                        name="lastDate"
                        control={control}
                        label="Last Date"
                        type="date"
                        error={errors.lastDate}
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

export default CurrencyAddPage;
