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
    journalNo: string;
    layer: string;
    ledgerAccount: string;
    debit: string;
    credit: string;
    currency: string;
    amountCurrency: string;
    rate: string;
    voyageNo: string;
    serviceType: string;
    note: string;
    docReference: string;
};

const journalEntriesSchema = z.object({
    date: z.date().nullable(),
    journalNo: z.string(),
    layer: z.string(),
    ledgerAccount: z.string(),
    debit: z.string(),
    credit: z.string(),
    currency: z.string(),
    amountCurrency: z.string(),
    rate: z.string(),
    voyageNo: z.string(),
    serviceType: z.string(),
    note: z.string(),
    docReference: z.string(),
});

const JournalEntriesEditPage = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<JournalEntries>({
        date: null,
        journalNo: "",
        layer: "",
        ledgerAccount: "",
        debit: "",
        credit: "",
        currency: "",
        amountCurrency: "",
        rate: "",
        voyageNo: "",
        serviceType: "",
        note: "",
        docReference: "",
    });
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
    const [selectedLedgerAccount, setSelectedLedgerAccount] = useState<
        string | null
    >(null);
    const [selectedVoyageNo, setSelectedVoyageNo] = useState<string | null>(
        null
    );
    const [selectedServiceType, setSelectedServiceType] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<JournalEntries>(
        {
            resolver: zodResolver(journalEntriesSchema),
            defaultValues: {
                date: null,
                journalNo: "",
                layer: "",
                ledgerAccount: "",
                debit: "",
                credit: "",
                currency: "",
                amountCurrency: "",
                rate: "",
                voyageNo: "",
                serviceType: "",
                note: "",
                docReference: "",
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
            if (formData.journalNo) {
                apiFormData.append("journalNo", formData.journalNo);
            }
            if (formData.layer) {
                apiFormData.append("layer", formData.layer);
            }
            if (formData.ledgerAccount) {
                apiFormData.append("ledgerAccount", formData.ledgerAccount);
            }
            if (formData.debit) {
                apiFormData.append("debit", formData.debit);
            }
            if (formData.credit) {
                apiFormData.append("credit", formData.credit);
            }
            if (formData.currency) {
                apiFormData.append("currency", formData.currency);
            }
            if (formData.amountCurrency) {
                apiFormData.append("amountCurrency", formData.amountCurrency);
            }
            if (formData.rate) {
                apiFormData.append("rate", formData.rate);
            }
            if (formData.voyageNo) {
                apiFormData.append("voyageNo", formData.voyageNo);
            }
            if (formData.serviceType) {
                apiFormData.append("serviceType", formData.serviceType);
            }
            if (formData.note) {
                apiFormData.append("note", formData.note);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Journal Entries updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Journal Entries:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.date) {
                    mappedErrors.date = error.errors.date[0];
                }
                if (error.errors.journalNo) {
                    mappedErrors.journalNo = error.errors.journalNo[0];
                }
                if (error.errors.layer) {
                    mappedErrors.layer = error.errors.layer[0];
                }
                if (error.errors.ledgerAccount) {
                    mappedErrors.ledgerAccount = error.errors.ledgerAccount[0];
                }
                if (error.errors.debit) {
                    mappedErrors.debit = error.errors.debit[0];
                }
                if (error.errors.credit) {
                    mappedErrors.credit = error.errors.credit[0];
                }
                if (error.errors.currency) {
                    mappedErrors.currency = error.errors.currency[0];
                }
                if (error.errors.amountCurrency) {
                    mappedErrors.amountCurrency =
                        error.errors.amountCurrency[0];
                }
                if (error.errors.rate) {
                    mappedErrors.rate = error.errors.rate[0];
                }
                if (error.errors.voyageNo) {
                    mappedErrors.voyageNo = error.errors.voyageNo[0];
                }
                if (error.errors.serviceType) {
                    mappedErrors.serviceType = error.errors.serviceType[0];
                }
                if (error.errors.note) {
                    mappedErrors.note = error.errors.note[0];
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
                    {/* Journal No */}
                    <FormInput
                        name="journalNo"
                        control={control}
                        label="Journal No"
                        type="text"
                        error={errors.journalNo}
                    />
                    {/* Layer */}
                    <SearchedDropDown
                        name="layer"
                        control={control}
                        label="Layer"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedLayer}
                        onChange={(value) => setSelectedLayer(value)}
                    />
                    {/* Ledger Account */}
                    <SearchedDropDown
                        name="ledgerAccount"
                        control={control}
                        label="Ledger Account"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedLedgerAccount}
                        onChange={(value) => setSelectedLedgerAccount(value)}
                    />
                    {/* Debit */}
                    <FormInput
                        name="debit"
                        control={control}
                        label="Debit"
                        type="number"
                        error={errors.debit}
                    />
                    {/* Credit */}
                    <FormInput
                        name="credit"
                        control={control}
                        label="Credit"
                        type="number"
                        error={errors.credit}
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
                    {/* Rate */}
                    <FormInput
                        name="rate"
                        control={control}
                        label="Rate"
                        type="number"
                        error={errors.rate}
                    />
                    {/* Voyage No */}
                    <SearchedDropDown
                        name="voyageNo"
                        control={control}
                        label="Voyage No"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedVoyageNo}
                        onChange={(value) => setSelectedVoyageNo(value)}
                    />
                    {/* Service Type */}
                    <SearchedDropDown
                        name="serviceType"
                        control={control}
                        label="Service Type"
                        options={[
                            { value: "Asset", key: "Asset" },
                            { value: "Liability", key: "Liability" },
                            { value: "Equity", key: "Equity" },
                            { value: "Revenue", key: "Revenue" },
                            { value: "Expense", key: "Expense" },
                        ]}
                        value={selectedServiceType}
                        onChange={(value) => setSelectedServiceType(value)}
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
                    {/* Doc Reference */}
                    <FormInput
                        name="docReference"
                        control={control}
                        label="Doc Reference"
                        type="textarea"
                        rows={5}
                        textareaResize="none"
                        error={errors.docReference}
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

export default JournalEntriesEditPage;
