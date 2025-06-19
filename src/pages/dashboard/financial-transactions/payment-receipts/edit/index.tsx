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

type JournalEntries = {
    date: Date | null;
    paymentType: string;
    accountType: string;
    accountFromChart: string;
    reference: string;
    paymentMethod: string;
    currency: string;
    amountCurrency: string;
    amount: string;
    companyCurrency: string;
    note: string;
    poster: File | null;
};

const journalEntriesSchema = z.object({
    date: z.date().nullable(),
    paymentType: z.string(),
    accountType: z.string(),
    accountFromChart: z.string(),
    reference: z.string(),
    paymentMethod: z.string(),
    currency: z.string(),
    amountCurrency: z.string(),
    amount: z.string(),
    companyCurrency: z.string(),
    note: z.string(),
    poster: z.instanceof(File).nullable(),
});

const PaymentReceiptsEditPage = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<JournalEntries>({
        date: null,
        paymentType: "",
        accountType: "",
        accountFromChart: "",
        reference: "",
        paymentMethod: "",
        currency: "",
        amountCurrency: "",
        amount: "",
        companyCurrency: "",
        note: "",
        poster: null,
    });
    const [selectedPaymentType, setSelectedPaymentType] = useState<
        string | null
    >(null);
    const [selectedAccountType, setSelectedAccountType] = useState<
        string | null
    >(null);
    const [selectedAccountFromChart, setSelectedAccountFromChart] = useState<
        string | null
    >(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<JournalEntries>(
        {
            resolver: zodResolver(journalEntriesSchema),
            defaultValues: {
                date: null,
                paymentType: "",
                accountType: "",
                accountFromChart: "",
                reference: "",
                paymentMethod: "",
                currency: "",
                amountCurrency: "",
                amount: "",
                companyCurrency: "",
                note: "",
                poster: null,
            },
            mode: "onChange",
        }
    );

    const onSubmit = async (formData: JournalEntries) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.date) {
                apiFormData.append("date", formData.date.toISOString());
            }
            if (formData.paymentType) {
                apiFormData.append("paymentType", formData.paymentType);
            }
            if (formData.accountType) {
                apiFormData.append("accountType", formData.accountType);
            }
            if (formData.accountFromChart) {
                apiFormData.append(
                    "accountFromChart",
                    formData.accountFromChart
                );
            }
            if (formData.reference) {
                apiFormData.append("reference", formData.reference);
            }
            if (formData.paymentMethod) {
                apiFormData.append("paymentMethod", formData.paymentMethod);
            }
            if (formData.currency) {
                apiFormData.append("currency", formData.currency);
            }
            if (formData.amountCurrency) {
                apiFormData.append("amountCurrency", formData.amountCurrency);
            }
            if (formData.amount) {
                apiFormData.append("amount", formData.amount);
            }
            if (formData.companyCurrency) {
                apiFormData.append("companyCurrency", formData.companyCurrency);
            }
            if (formData.note) {
                apiFormData.append("note", formData.note);
            }
            if (formData.poster instanceof File) {
                apiFormData.append("poster", formData.poster);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Payment Receipts updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Payment Receipts:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.date) {
                    mappedErrors.date = error.errors.date[0];
                }
                if (error.errors.paymentType) {
                    mappedErrors.paymentType = error.errors.paymentType[0];
                }
                if (error.errors.accountType) {
                    mappedErrors.accountType = error.errors.accountType[0];
                }
                if (error.errors.accountFromChart) {
                    mappedErrors.accountFromChart =
                        error.errors.accountFromChart[0];
                }
                if (error.errors.reference) {
                    mappedErrors.reference = error.errors.reference[0];
                }
                if (error.errors.paymentMethod) {
                    mappedErrors.paymentMethod = error.errors.paymentMethod[0];
                }
                if (error.errors.currency) {
                    mappedErrors.currency = error.errors.currency[0];
                }
                if (error.errors.amountCurrency) {
                    mappedErrors.amountCurrency =
                        error.errors.amountCurrency[0];
                }
                if (error.errors.amount) {
                    mappedErrors.amount = error.errors.amount[0];
                }
                if (error.errors.companyCurrency) {
                    mappedErrors.companyCurrency =
                        error.errors.companyCurrency[0];
                }
                if (error.errors.note) {
                    mappedErrors.note = error.errors.note[0];
                }
                if (error.errors.poster) {
                    mappedErrors.poster = error.errors.poster[0];
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
                    {/* Date */}
                    <FormInput
                        name="date"
                        control={control}
                        label="Date"
                        type="date"
                        error={errors.date?.toString()}
                    />
                    {/* Payment Type */}
                    <SearchedDropDown
                        name="paymentType"
                        control={control}
                        label="Payment Type"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedPaymentType}
                        onChange={(value) => setSelectedPaymentType(value)}
                    />
                    {/* Account Type */}
                    <SearchedDropDown
                        name="accountType"
                        control={control}
                        label="Account Type"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedAccountType}
                        onChange={(value) => setSelectedAccountType(value)}
                    />
                </FormFieldsLayout>

                <FormFieldsLayout>
                    {/* Account From Chart */}
                    <SearchedDropDown
                        name="accountFromChart"
                        control={control}
                        label="Account From Chart"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedAccountFromChart}
                        onChange={(value) => setSelectedAccountFromChart(value)}
                    />
                    {/* Reference */}
                    <FormInput
                        name="reference"
                        control={control}
                        label="Reference"
                        type="text"
                        error={errors.reference}
                    />
                </FormFieldsLayout>

                <FormFieldsLayout>
                    {/* Payment Method */}
                    <SearchedDropDown
                        name="paymentMethod"
                        control={control}
                        label="Payment Method"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedPaymentMethod}
                        onChange={(value) => setSelectedPaymentMethod(value)}
                    />
                    {/* Currency */}
                    <FormInput
                        name="currency"
                        control={control}
                        label="Currency"
                        type="text"
                        error={errors.currency}
                    />
                    {/* Amount Currency */}
                    <FormInput
                        name="amountCurrency"
                        control={control}
                        label="Amount Currency"
                        type="number"
                        error={errors.amountCurrency}
                    />
                    {/* Amount */}
                    <FormInput
                        name="amount"
                        control={control}
                        label="Amount"
                        type="number"
                        error={errors.amount}
                    />
                    {/* Company Currency */}
                    <FormInput
                        name="companyCurrency"
                        control={control}
                        label="Company Currency"
                        type="text"
                        disabled
                        error={errors.companyCurrency}
                    />
                </FormFieldsLayout>

                <FormFieldsLayout cols="1">
                    {/* Note */}
                    <FormInput
                        name="note"
                        control={control}
                        label="Note"
                        type="textarea"
                        rows={5}
                        textareaResize="none"
                        error={errors.note}
                    />

                    {/* Poster */}
                    <FormInput
                        name="poster"
                        control={control}
                        fileLabel="Poster Image Trip"
                        type="file"
                        error={errors.poster?.toString()}
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
};

export default PaymentReceiptsEditPage;
