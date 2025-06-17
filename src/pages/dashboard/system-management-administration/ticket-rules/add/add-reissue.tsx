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

type Reissue = {
    id?: string;
    ruleName: string;
    timing: string;
    departureTolerance: string;
    penaltyType: string;
    penaltyValue: string;
    penaltyBaseAmount: string;
    taxRefund: string;
};

const reissueSchema = z.object({
    id: z.string().optional(),
    ruleName: z.string(),
    timing: z.string(),
    departureTolerance: z.string(),
    penaltyType: z.string(),
    penaltyValue: z.string(),
    penaltyBaseAmount: z.string(),
    taxRefund: z.string(),
});

function ReissueAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRuleName, setSelectedRuleName] = useState<string | null>(
        null
    );
    const [selectedTiming, setSelectedTiming] = useState<string | null>(null);
    const [selectedDepartureTolerance, setSelectedDepartureTolerance] =
        useState<string | null>(null);
    const [selectedPenaltyType, setSelectedPenaltyType] = useState<
        string | null
    >(null);
    const [selectedPenaltyValue, setSelectedPenaltyValue] = useState<
        string | null
    >(null);
    const [selectedPenaltyBaseAmount, setSelectedPenaltyBaseAmount] = useState<
        string | null
    >(null);
    const [selectedTaxRefund, setSelectedTaxRefund] = useState<string | null>(
        null
    );

    const { control, handleSubmit, reset, formState } = useForm<Reissue>({
        resolver: zodResolver(reissueSchema),
        defaultValues: {
            id: "",
            ruleName: "",
            timing: "",
            departureTolerance: "",
            penaltyType: "",
            penaltyValue: "",
            penaltyBaseAmount: "",
            taxRefund: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Reissue) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            apiFormData.append("ruleName", formData.ruleName);
            apiFormData.append("timing", formData.timing);
            apiFormData.append(
                "departureTolerance",
                formData.departureTolerance
            );
            apiFormData.append("penaltyType", formData.penaltyType);
            apiFormData.append("penaltyValue", formData.penaltyValue);
            apiFormData.append("penaltyBaseAmount", formData.penaltyBaseAmount);
            apiFormData.append("taxRefund", formData.taxRefund);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Reissue added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding reissue:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.ruleName) {
                    mappedErrors.ruleName = error.errors.ruleName[0];
                }
                if (error.errors.timing) {
                    mappedErrors.timing = error.errors.timing[0];
                }
                if (error.errors.departureTolerance) {
                    mappedErrors.departureTolerance =
                        error.errors.departureTolerance[0];
                }
                if (error.errors.penaltyType) {
                    mappedErrors.penaltyType = error.errors.penaltyType[0];
                }
                if (error.errors.penaltyValue) {
                    mappedErrors.penaltyValue = error.errors.penaltyValue[0];
                }
                if (error.errors.penaltyBaseAmount) {
                    mappedErrors.penaltyBaseAmount =
                        error.errors.penaltyBaseAmount[0];
                }
                if (error.errors.taxRefund) {
                    mappedErrors.taxRefund = error.errors.taxRefund[0];
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
                <FormFieldsLayout title="Add">
                    {/* Rule Name */}
                    <SearchedDropDown
                        name="ruleName"
                        control={control}
                        label="Rule Name"
                        options={[
                            {
                                key: "Reissue",
                                value: "Reissue",
                            },
                            {
                                key: "No Show",
                                value: "No Show",
                            },
                            {
                                key: "Refund",
                                value: "Refund",
                            },
                            {
                                key: "Reissue",
                                value: "Reissue",
                            },
                        ]}
                        value={selectedRuleName}
                        onChange={(value) => {
                            setSelectedRuleName(value);
                        }}
                        placeholder="Select rule name"
                    />

                    {/* Timing */}
                    <SearchedDropDown
                        name="timing"
                        control={control}
                        label="Timing"
                        options={[
                            {
                                key: "Before Departure",
                                value: "Before Departure",
                            },
                            {
                                key: "After Departure",
                                value: "After Departure",
                            },
                        ]}
                        value={selectedTiming}
                        onChange={(value) => {
                            setSelectedTiming(value);
                        }}
                        placeholder="Select timing"
                    />

                    {/* Departure Tolerance */}
                    <SearchedDropDown
                        name="departureTolerance"
                        control={control}
                        label="Departure Tolerance"
                        options={[
                            {
                                key: "1 hour",
                                value: "1 hour",
                            },
                            {
                                key: "2 hours",
                                value: "2 hours",
                            },
                        ]}
                        value={selectedDepartureTolerance}
                        onChange={(value) => {
                            setSelectedDepartureTolerance(value);
                        }}
                        placeholder="Select departure tolerance"
                    />

                    {/* Penalty Type */}
                    <SearchedDropDown
                        name="penaltyType"
                        control={control}
                        label="Penalty Type"
                        options={[
                            {
                                key: "Fixed",
                                value: "Fixed",
                            },
                            {
                                key: "Percentage",
                                value: "Percentage",
                            },
                        ]}
                        value={selectedPenaltyType}
                        onChange={(value) => {
                            setSelectedPenaltyType(value);
                        }}
                        placeholder="Select penalty type"
                    />

                    {/* Penalty Value */}
                    <SearchedDropDown
                        name="penaltyValue"
                        control={control}
                        label="Penalty Value"
                        options={[
                            {
                                key: "Fixed",
                                value: "Fixed",
                            },
                            {
                                key: "Percentage",
                                value: "Percentage",
                            },
                        ]}
                        value={selectedPenaltyValue}
                        onChange={(value) => {
                            setSelectedPenaltyValue(value);
                        }}
                        placeholder="Select penalty value"
                    />

                    {/* Penalty Base Amount */}
                    <SearchedDropDown
                        name="penaltyBaseAmount"
                        control={control}
                        label="Penalty Base Amount"
                        options={[
                            {
                                key: "Fixed",
                                value: "Fixed",
                            },
                            {
                                key: "Percentage",
                                value: "Percentage",
                            },
                        ]}
                        value={selectedPenaltyBaseAmount}
                        onChange={(value) => {
                            setSelectedPenaltyBaseAmount(value);
                        }}
                        placeholder="Select penalty base amount"
                    />

                    {/* Tax Refund */}
                    <SearchedDropDown
                        name="taxRefund"
                        control={control}
                        label="Tax Refund"
                        options={[
                            {
                                key: "Yes",
                                value: "Yes",
                            },
                            {
                                key: "No",
                                value: "No",
                            },
                        ]}
                        value={selectedTaxRefund}
                        onChange={(value) => {
                            setSelectedTaxRefund(value);
                        }}
                        placeholder="Select tax refund"
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

export default ReissueAddPage;
