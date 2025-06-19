import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../components/form";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";

type ChartOfAccount = {
    ledgerType: string;
    ledgerDescription: string;
};

const chartOfDescriptionSchema = z.object({
    ledgerType: z.string(),
    ledgerDescription: z.string(),
});

const ChartOfAccountEditPage = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ChartOfAccount>({
        ledgerType: "",
        ledgerDescription: "",
    });
    const [selectedLedgerType, setSelectedLedgerType] = useState<string | null>(
        null
    );

    const { control, handleSubmit, reset, formState } = useForm<ChartOfAccount>(
        {
            resolver: zodResolver(chartOfDescriptionSchema),
            defaultValues: {
                ledgerType: "",
                ledgerDescription: "",
            },
            mode: "onChange",
        }
    );

    const onSubmit = async (formData: ChartOfAccount) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.ledgerType) {
                apiFormData.append("ledgerType", formData.ledgerType);
            }
            if (formData.ledgerDescription) {
                apiFormData.append(
                    "ledgerDescription",
                    formData.ledgerDescription
                );
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Chart of Account updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Chart of Account:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.ledgerType) {
                    mappedErrors.ledgerType = error.errors.ledgerType[0];
                }
                if (error.errors.ledgerDescription) {
                    mappedErrors.ledgerDescription =
                        error.errors.ledgerDescription[0];
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
                <FormFieldsLayout>
                    {/* Ledger Type */}
                    <SearchedDropDown
                        name="ledgerType"
                        control={control}
                        label="Ledger Type"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedLedgerType}
                        onChange={(value) => setSelectedLedgerType(value)}
                    />
                </FormFieldsLayout>

                <FormFieldsLayout cols="1">
                    {/* Ledger Description */}
                    <FormInput
                        name="ledgerDescription"
                        control={control}
                        label="Ledger Description"
                        type="textarea"
                        rows={5}
                        textareaResize="none"
                        error={errors.ledgerDescription}
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    disabled={formState.isSubmitting}
                />
            </FormLayout>
        </PageLayout>
    );
};

export default ChartOfAccountEditPage;
