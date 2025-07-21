import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import FormLayout from "../../../layout/FormLayout";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../form";
import { useGenericForm } from "../../../contexts/GenericFormContext";
import {
    AuthorityError,
    AuthorityFormData,
} from "../../../pages/dashboard/business-partners-management/authorities/types";

const authoritySchema = z.object({
    name: z.string(),
    phoneCode: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    address: z.string(),
});

type AuthorityAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function AuthorityAddForm({
    handleChangeTab,
}: AuthorityAddFormProps) {
    const navigate = useNavigate();

    const {
        formData,
        updateFormSection,
        isSubmitting,
        errors: contextErrors,
    } = useGenericForm();

    const authority = formData.authority || {};

    const formErrors: AuthorityError =
        contextErrors.authority || {
            name: "",
            phoneCode: "",
            phoneNumber: "",
            email: "",
            address: "",
        };

    const { control, handleSubmit, formState, setValue } =
        useForm<AuthorityFormData>({
            resolver: zodResolver(authoritySchema),
            defaultValues: {
                name: authority.name,
                phoneCode: authority.phoneCode,
                phoneNumber: authority.phoneNumber,
                email: authority.email,
                address: authority.address,
            },
            mode: "onChange",
        });

    const handlePhoneExtracted = (phoneData: {
        fullNumber: string;
        phoneCode: string;
        phoneNumber: string;
    }) => {
        setValue("phoneCode", phoneData.phoneCode);
        setValue("phoneNumber", phoneData.fullNumber);
    };

    useEffect(() => {
        setValue("name", authority.name || "");
        setValue("phoneCode", authority.phoneCode || "");
        setValue("phoneNumber", authority.phoneNumber || "");
        setValue("email", authority.email || "");
        setValue("address", authority.address || "");
    }, [authority, setValue]);

    const onSubmit = async (formData: AuthorityFormData) => {
        const phoneCodeLength = formData.phoneCode?.length || 0;
        const phoneNumberOnly = formData.phoneNumber.substring(phoneCodeLength);

        // Update the context with the form data
        updateFormSection("authority", {
            ...formData,
            phoneNumber: phoneNumberOnly,
        });

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
                {/* Name */}
                <FormInput
                    name="name"
                    control={control}
                    label="Name"
                    placeholder="Enter Name"
                    error={formErrors.name}
                />

                {/* Phone */}
                <FormInput
                    name="phoneNumber"
                    control={control}
                    label="Phone"
                    type="tel"
                    placeholder="Enter Phone"
                    error={formErrors.phoneNumber}
                    onPhoneExtracted={handlePhoneExtracted}
                />

                {/* Email */}
                <FormInput
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter Email"
                    error={formErrors.email}
                />

                {/* Address */}
                <FormInput
                    name="address"
                    control={control}
                    label="Address"
                    placeholder="Enter Address"
                    error={formErrors.address}
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isSubmitting}
                disabled={!formState.isDirty}
                cancelText="Cancel"
                submitText="Next"
                className="mt-4"
                onCancel={() => navigate(-1)}
            />
        </FormLayout>
    );
}

export default AuthorityAddForm;
