import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { z } from "zod";

type Error = {
    limitAmount: string;
    ticketQuota: string;
};

type QuotaManagement = {
    id?: string;
    limitAmount: string;
    ticketQuota: string;
};

const quotaManagementSchema = z.object({
    id: z.string().optional(),
    limitAmount: z.string(),
    ticketQuota: z.string(),
});

function QuotaManagementAddForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        limitAmount: "",
        ticketQuota: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<QuotaManagement>({
            resolver: zodResolver(quotaManagementSchema),
            defaultValues: {
                id: "",
                limitAmount: "",
                ticketQuota: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: QuotaManagement) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.limitAmount) {
                apiFormData.append("limitAmount", formData.limitAmount);
            }
            if (formData.ticketQuota) {
                apiFormData.append("ticketQuota", formData.ticketQuota);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Quota Management updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Quota Management:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.limitAmount) {
                    mappedErrors.limitAmount = error.errors.limitAmount[0];
                }
                if (error.errors.ticketQuota) {
                    mappedErrors.ticketQuota = error.errors.ticketQuota[0];
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
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormFieldsLayout>
                {/* Limit Amount */}
                <FormInput
                    name="limitAmount"
                    control={control}
                    label="Limit Amount"
                    error={errors.limitAmount}
                />

                {/* Ticket Quota */}
                <FormInput
                    name="ticketQuota"
                    control={control}
                    label="Ticket Quota"
                    error={errors.ticketQuota}
                />
            </FormFieldsLayout>

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default QuotaManagementAddForm;
