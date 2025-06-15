import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormButtons } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate } from "react-router-dom";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";

type Settings = {
    id?: string;
    taxId?: string;
    currencyId?: string;
};

const settingsSchema = z.object({
    id: z.string().optional(),
    taxId: z.string().optional(),
    currencyId: z.string().optional(),
});

function SettingsEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTax, setSelectedTax] = useState<string | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
        null
    );

    const { control, handleSubmit, reset, formState } = useForm<Settings>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            id: "",
            taxId: "",
            currencyId: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Settings) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.taxId) {
                apiFormData.append("taxId", formData.taxId);
            }
            if (formData.currencyId) {
                apiFormData.append("currencyId", formData.currencyId);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Settings us updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating settings us:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.taxId) {
                    mappedErrors.taxId = error.errors.taxId[0];
                }
                if (error.errors.currencyId) {
                    mappedErrors.currencyId = error.errors.currencyId[0];
                }

                console.log("Mapped errors:", mappedErrors);
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
                <FormFieldsLayout title="Add" cols="3">
                    {/* tax */}
                    <SearchedDropDown
                        name="taxId"
                        control={control}
                        label="Tax Id"
                        options={[
                            { key: "Tax 1", value: "Tax 1" },
                            { key: "Tax 2", value: "Tax 2" },
                            { key: "Tax 3", value: "Tax 3" },
                            { key: "Tax 4", value: "Tax 4" },
                            { key: "Tax 5", value: "Tax 5" },
                            { key: "Tax 6", value: "Tax 6" },
                            { key: "Tax 7", value: "Tax 7" },
                            { key: "Tax 8", value: "Tax 8" },
                            { key: "Tax 9", value: "Tax 9" },
                            { key: "Tax 10", value: "Tax 10" },
                            { key: "Tax 11", value: "Tax 11" },
                            { key: "Tax 12", value: "Tax 12" },
                            { key: "Tax 13", value: "Tax 13" },
                            { key: "Tax 14", value: "Tax 14" },
                            { key: "Tax 15", value: "Tax 15" },
                        ]}
                        value={selectedTax || ""}
                        onChange={(taxId) => {
                            setSelectedTax(taxId);
                        }}
                        placeholder="Select tax"
                        required={false}
                    />

                    {/* currency */}
                    <SearchedDropDown
                        name="currencyId"
                        control={control}
                        label="Currency Id"
                        options={[
                            { key: "Currency 1", value: "Currency 1" },
                            { key: "Currency 2", value: "Currency 2" },
                            { key: "Currency 3", value: "Currency 3" },
                            { key: "Currency 4", value: "Currency 4" },
                            { key: "Currency 5", value: "Currency 5" },
                            { key: "Currency 6", value: "Currency 6" },
                            { key: "Currency 7", value: "Currency 7" },
                            { key: "Currency 8", value: "Currency 8" },
                            { key: "Currency 9", value: "Currency 9" },
                            { key: "Currency 10", value: "Currency 10" },
                            { key: "Currency 11", value: "Currency 11" },
                            { key: "Currency 12", value: "Currency 12" },
                            { key: "Currency 13", value: "Currency 13" },
                            { key: "Currency 14", value: "Currency 14" },
                            { key: "Currency 15", value: "Currency 15" },
                        ]}
                        value={selectedCurrency || ""}
                        onChange={(currencyId) => {
                            setSelectedCurrency(currencyId);
                        }}
                        placeholder="Select currency"
                        required={false}
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

export default SettingsEditPage;
