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
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { ENDPOINTS } from "../../../../../config/endpoints";

type TicketRule = {
    ruleName: string;
    timing: string;
    departureTolerance: string;
    penaltyType: string;
    penaltyValue: string;
    penaltyBaseAmount: string;
    taxRefund: string;
};

const ticketRuleSchema = z.object({
    ruleName: z.string(),
    timing: z.string(),
    departureTolerance: z.string(),
    penaltyType: z.string(),
    penaltyValue: z.string(),
    penaltyBaseAmount: z.string(),
    taxRefund: z.string(),
});

function TicketRulesAddPage() {
    const { name, ticketStatusId } = useParams<{
        name: string;
        ticketStatusId: string;
    }>();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<TicketRule>({
        ruleName: "",
        timing: "",
        departureTolerance: "",
        penaltyType: "",
        penaltyValue: "",
        penaltyBaseAmount: "",
        taxRefund: "",
    });
    const [selectedRuleName, setSelectedRuleName] = useState<string | null>(
        null
    );
    const [selectedTiming, setSelectedTiming] = useState<string | null>(null);
    const [selectedDepartureTolerance, setSelectedDepartureTolerance] =
        useState<string | null>(null);
    const [selectedPenaltyType, setSelectedPenaltyType] = useState<
        string | null
    >(null);
    const [selectedTaxRefund, setSelectedTaxRefund] = useState<string | null>(
        null
    );

    const { control, handleSubmit, reset, formState } = useForm<TicketRule>({
        resolver: zodResolver(ticketRuleSchema),
        defaultValues: {
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

    const onSubmit = async (formData: TicketRule) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("ticketStatusId", String(ticketStatusId));
        apiFormData.append("ruleName", formData.ruleName);
        apiFormData.append("timing", formData.timing);
        apiFormData.append("departureTolerance", formData.departureTolerance);
        apiFormData.append("penaltyType", formData.penaltyType);
        apiFormData.append("penaltyValue", formData.penaltyValue);
        apiFormData.append("penaltyBaseAmount", formData.penaltyBaseAmount);
        apiFormData.append("taxRefund", formData.taxRefund);

        await ENDPOINTS.ticketRules
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
                setErrors(error);
            });
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
                                key: "Void",
                                value: "Void",
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
                        error={errors.ruleName}
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
                        error={errors.timing}
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
                        error={errors.departureTolerance}
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
                        error={errors.penaltyType}
                    />

                    {/* Penalty Value */}
                    <FormInput
                        name="penaltyValue"
                        control={control}
                        label="Penalty Value"
                        placeholder="Enter penalty value"
                        type="number"
                        error={errors.penaltyValue}
                    />

                    {/* Penalty Base Amount */}
                    <FormInput
                        name="penaltyBaseAmount"
                        control={control}
                        label="Penalty Base Amount"
                        placeholder="Enter penalty base amount"
                        type="number"
                        error={errors.penaltyBaseAmount}
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
                        error={errors.taxRefund}
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

export default TicketRulesAddPage;
