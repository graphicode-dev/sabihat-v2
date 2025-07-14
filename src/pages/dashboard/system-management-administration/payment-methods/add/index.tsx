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
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { ENDPOINTS } from "../../../../../config/endpoints";

type PaymentMethods = {
    name: string;
    businessPartnerId: string;
    currencyId: string;
    accountType: string;
    accountNumber: string;
    note: string;
};

const paymentMethodsSchema = z.object({
    name: z.string(),
    businessPartnerId: z.string(),
    currencyId: z.string(),
    accountType: z.string(),
    accountNumber: z.string(),
    note: z.string(),
});

function PaymentMethodsAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PaymentMethods>({
        name: "",
        businessPartnerId: "",
        currencyId: "",
        accountType: "",
        accountNumber: "",
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
                name: "",
                businessPartnerId: "",
                currencyId: "",
                accountType: "",
                accountNumber: "",
                note: "",
            },
            mode: "onChange",
        }
    );

    const onSubmit = async (formData: PaymentMethods) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("name", formData.name);
        apiFormData.append("businessPartnerId", formData.businessPartnerId);
        apiFormData.append("currencyId", formData.currencyId);
        apiFormData.append("accountType", formData.accountType);
        apiFormData.append("accountNumber", formData.accountNumber);
        apiFormData.append("note", formData.note);

        await ENDPOINTS.paymentMethods
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Payment method added successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
                navigate(-1);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                return setErrors(error);
            });
    };

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Add" cols="3">
                    {/* name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        type="text"
                        error={errors.name}
                        colSpan={1}
                    />

                    {/* businessPartnerId */}
                    <FormInput
                        name="businessPartnerId"
                        control={control}
                        label="Business Partner Id"
                        type="text"
                        error={errors.businessPartnerId}
                        colSpan={1}
                    />

                    {/* currencyId */}
                    <FormInput
                        name="currencyId"
                        control={control}
                        label="Currency Id"
                        type="text"
                        error={errors.currencyId}
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
                    submitText="add"
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default PaymentMethodsAddPage;
