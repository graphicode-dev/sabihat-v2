import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { useGenericForm } from "../../../contexts/GenericFormContext";
import { QuotaManagement } from "../../../pages/dashboard/business-partners-management/partners/types";

const quotaManagementSchema = z.object({
    limitAmount: z.string(),
    ticketQuota: z.string(),
});

type QuotaManagementAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function QuotaManagementAddForm({
    handleChangeTab,
}: QuotaManagementAddFormProps) {
    const {
        formData,
        updateFormSection,
        isSubmitting,
        errors: contextErrors,
        lockTab,
    } = useGenericForm();
    
    // Get the quota management data from the form data
    const quotaManagement = formData.quotaManagement || {};

    // Extract errors for this form
    const formErrors: QuotaManagement = contextErrors.quotaManagement || {
        limitAmount: "",
        ticketQuota: "",
    };

    const { control, handleSubmit, formState, setValue } =
        useForm<QuotaManagement>({
            resolver: zodResolver(quotaManagementSchema),
            defaultValues: {
                limitAmount: quotaManagement.limitAmount || "",
                ticketQuota: quotaManagement.ticketQuota || "",
            },
            mode: "onChange",
        });

    // Update form values when context data changes
    useEffect(() => {
        setValue("limitAmount", quotaManagement.limitAmount || "");
        setValue("ticketQuota", quotaManagement.ticketQuota || "");

        // Quota type selection will be implemented in a future update
    }, [quotaManagement, setValue]);

    const onSubmit = async (formData: QuotaManagement) => {
        // Update the context with the form data
        updateFormSection("quotaManagement", formData);

        // Navigate to the next tab
        handleChangeTab("contactInformation");
    };

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormFieldsLayout>
                {/* Quota Amount */}
                <FormInput
                    name="limitAmount"
                    control={control}
                    label="Quota Amount"
                    type="number"
                    error={formErrors.limitAmount}
                />

                {/* Ticket Quota */}
                <FormInput
                    name="ticketQuota"
                    control={control}
                    label="Ticket Quota"
                    error={formErrors.ticketQuota}
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isSubmitting}
                disabled={!formState.isDirty}
                cancelText="Back"
                submitText="Next"
                className="mt-4"
                onCancel={() => handleChangeTab("partnersMaster")}
                removeCancel={lockTab}
            />
        </FormLayout>
    );
}

export default QuotaManagementAddForm;
