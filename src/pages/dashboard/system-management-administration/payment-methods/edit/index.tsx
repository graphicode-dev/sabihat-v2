import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormInput, FormButtons } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate } from "react-router-dom";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { dirtyFields, logFormData } from "../../../../../lib/utils";

type PaymentMethods = {
    id?: string;
    partner: string;
    accountName: string;
    accountType: string;
    currency: string;
    accountNumber: string;
    accountStatus: string;
    note: string;
};

const paymentMethodsSchema = z.object({
    id: z.string().optional(),
    partner: z.string(),
    accountName: z.string(),
    accountType: z.string(),
    currency: z.string(),
    accountNumber: z.string(),
    accountStatus: z.string(),
    note: z.string(),
});

function PaymentMethodsEditPage() {
    const fetchedData = {
        id: "1",
        partner: "Partner 2",
        accountName: "Account Name 2",
        accountType: "Account Type 2",
        currency: "Currency 2",
        accountNumber: "Account Number 2",
        accountStatus: "Account Status 2",
        note: "Note 2",
    };
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PaymentMethods>({
        partner: "",
        accountName: "",
        accountType: "",
        currency: "",
        accountNumber: "",
        accountStatus: "",
        note: "",
    });
    const [selectedAccountType, setSelectedAccountType] = useState<
        string | null
    >(null);
    const [selectedCurrency, setSelectedCurrency] = useState<string | null>(
        null
    );
    const [selectedAccountStatus, setSelectedAccountStatus] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<PaymentMethods>(
        {
            resolver: zodResolver(paymentMethodsSchema),
            defaultValues: {
                id: fetchedData.id,
                partner: fetchedData.partner,
                accountName: fetchedData.accountName,
                accountType: fetchedData.accountType,
                currency: fetchedData.currency,
                accountNumber: fetchedData.accountNumber,
                accountStatus: fetchedData.accountStatus,
                note: fetchedData.note,
            },
            mode: "onChange",
        }
    );

    const onSubmit = async (formData: PaymentMethods) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (dirtyFields(formState).includes("partner") && formData.partner)
                apiFormData.append("partner", formData.partner);
            if (
                dirtyFields(formState).includes("accountName") &&
                formData.accountName
            )
                apiFormData.append("accountName", formData.accountName);
            if (
                dirtyFields(formState).includes("accountType") &&
                formData.accountType
            )
                apiFormData.append("accountType", formData.accountType);
            if (
                dirtyFields(formState).includes("currency") &&
                formData.currency
            )
                apiFormData.append("currency", formData.currency);
            if (
                dirtyFields(formState).includes("accountNumber") &&
                formData.accountNumber
            )
                apiFormData.append("accountNumber", formData.accountNumber);
            if (
                dirtyFields(formState).includes("accountStatus") &&
                formData.accountStatus
            )
                apiFormData.append("accountStatus", formData.accountStatus);
            if (dirtyFields(formState).includes("note") && formData.note)
                apiFormData.append("note", formData.note);

            logFormData(apiFormData);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Payment method updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            setSelectedAccountType(null);
            setSelectedCurrency(null);
            setSelectedAccountStatus(null);
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding payment method:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.nameClass) {
                    mappedErrors.nameClass = error.errors.nameClass[0];
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

    useEffect(() => {
        if (fetchedData) {
            reset(fetchedData);
            setSelectedAccountType(fetchedData.accountType);
            setSelectedCurrency(fetchedData.currency);
            setSelectedAccountStatus(fetchedData.accountStatus);
        }
    }, [reset]);

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Edit" cols="3">
                    {/* partner */}
                    <FormInput
                        name="partner"
                        control={control}
                        label="Partner"
                        type="text"
                        error={errors.partner}
                        colSpan={1}
                    />

                    {/* accountName */}
                    <FormInput
                        name="accountName"
                        control={control}
                        label="Account Name"
                        type="text"
                        error={errors.accountName}
                        colSpan={1}
                    />

                    {/* accountType */}
                    <SearchedDropDown
                        name="accountType"
                        control={control}
                        label="Account Type"
                        options={[
                            { key: "Account Type 1", value: "Account Type 1" },
                            { key: "Account Type 2", value: "Account Type 2" },
                            { key: "Account Type 3", value: "Account Type 3" },
                            { key: "Account Type 4", value: "Account Type 4" },
                            { key: "Account Type 5", value: "Account Type 5" },
                        ]}
                        value={selectedAccountType || ""}
                        onChange={(accountTypeId) => {
                            setSelectedAccountType(accountTypeId);
                        }}
                        placeholder="Select account type"
                        required={false}
                    />

                    {/* currency */}
                    <SearchedDropDown
                        name="currency"
                        control={control}
                        label="Currency"
                        options={[
                            { key: "Currency 1", value: "Currency 1" },
                            { key: "Currency 2", value: "Currency 2" },
                            { key: "Currency 3", value: "Currency 3" },
                            { key: "Currency 4", value: "Currency 4" },
                            { key: "Currency 5", value: "Currency 5" },
                        ]}
                        value={selectedCurrency || ""}
                        onChange={(currencyId) => {
                            setSelectedCurrency(currencyId);
                        }}
                        placeholder="Select currency"
                        required={false}
                    />

                    {/* accountNumber */}
                    <FormInput
                        name="accountNumber"
                        control={control}
                        label="Account Number"
                        type="text"
                        error={errors.accountNumber}
                        colSpan={1}
                    />

                    {/* accountStatus */}
                    <SearchedDropDown
                        name="accountStatus"
                        control={control}
                        label="Account Status"
                        options={[
                            {
                                key: "Account Status 1",
                                value: "Account Status 1",
                            },
                            {
                                key: "Account Status 2",
                                value: "Account Status 2",
                            },
                            {
                                key: "Account Status 3",
                                value: "Account Status 3",
                            },
                            {
                                key: "Account Status 4",
                                value: "Account Status 4",
                            },
                            {
                                key: "Account Status 5",
                                value: "Account Status 5",
                            },
                        ]}
                        value={selectedAccountStatus || ""}
                        onChange={(accountStatusId) => {
                            setSelectedAccountStatus(accountStatusId);
                        }}
                        placeholder="Select account status"
                        required={false}
                    />
                </FormFieldsLayout>
                <FormFieldsLayout cols="1">
                    <FormInput
                        name="note"
                        control={control}
                        label="Note"
                        type="textarea"
                        error={errors.note}
                        rows={5}
                        textareaResize="none"
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

export default PaymentMethodsEditPage;
