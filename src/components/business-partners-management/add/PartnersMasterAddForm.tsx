import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePartnerForm } from "../../../contexts/PartnerFormContext";
import {
    PartnersMaster,
    PartnersMasterError,
} from "../../../pages/dashboard/business-partners-management/partners/types";
import { useEffect } from "react";

const partnersMasterSchema = z.object({
    name: z.string(),
    phoneCode: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    address: z.string(),
    layerId: z.string(),
    image: z.instanceof(File).nullable(),
});

type PartnersMasterAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function PartnersMasterAddForm({
    handleChangeTab,
}: PartnersMasterAddFormProps) {
    const navigate = useNavigate();

    // Get form data and errors from context
    const {
        partnerMaster,
        updatePartnerMaster,
        isSubmitting,
        errors: contextErrors,
    } = usePartnerForm();

    // Extract errors for this form
    const formErrors: PartnersMasterError = contextErrors.partnerMaster || {
        name: "",
        phoneCode: "",
        phoneNumber: "",
        email: "",
        address: "",
        layerId: "",
        image: "",
    };

    const { control, handleSubmit, formState, setValue } =
        useForm<PartnersMaster>({
            resolver: zodResolver(partnersMasterSchema),
            defaultValues: {
                name: partnerMaster.name,
                phoneCode: partnerMaster.phoneCode,
                phoneNumber: partnerMaster.phoneNumber,
                email: partnerMaster.email,
                address: partnerMaster.address,
                layerId: partnerMaster.layerId,
                image: partnerMaster.image,
            },
            mode: "onChange",
        });

    // Handle phone extraction
    const handlePhoneExtracted = (phoneData: {
        fullNumber: string;
        phoneCode: string;
        phoneNumber: string;
    }) => {
        setValue("phoneCode", phoneData.phoneCode);
        setValue("phoneNumber", phoneData.fullNumber);
    };

    // Update form values when context data changes
    useEffect(() => {
        setValue("name", partnerMaster.name || "");
        setValue("phoneCode", partnerMaster.phoneCode || "");
        setValue("phoneNumber", partnerMaster.phoneNumber || "");
        setValue("email", partnerMaster.email || "");
        setValue("address", partnerMaster.address || "");
        setValue("layerId", partnerMaster.layerId || "");
        setValue("image", partnerMaster.image || null);
    }, [partnerMaster, setValue]);

    const onSubmit = async (formData: PartnersMaster) => {
        const phoneCodeLength = formData.phoneCode?.length || 0;
        const phoneNumberOnly = formData.phoneNumber.substring(phoneCodeLength);

        // Update the context with the form data
        updatePartnerMaster({
            ...formData,
            phoneNumber: phoneNumberOnly,
        });

        // Navigate to the next tab
        handleChangeTab("quota-management-credit-limit");
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
                    error={formErrors.name}
                />

                {/* Phone */}
                <FormInput
                    name="phoneNumber"
                    control={control}
                    label="Phone Number"
                    type="tel"
                    error={formErrors.phoneNumber}
                    onPhoneExtracted={handlePhoneExtracted}
                />

                {/* Email */}
                <FormInput
                    name="email"
                    control={control}
                    label="Email"
                    type="email"
                    error={formErrors.email}
                />

                {/* Address */}
                <FormInput
                    name="address"
                    control={control}
                    label="Address"
                    error={formErrors.address}
                />

                {/* Layer ID */}
                <FormInput
                    name="layerId"
                    control={control}
                    label="Layer ID"
                    error={formErrors.layerId}
                />

                {/* Image */}
                <FormInput
                    name="image"
                    control={control}
                    type="file"
                    error={formErrors.image}
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

export default PartnersMasterAddForm;
