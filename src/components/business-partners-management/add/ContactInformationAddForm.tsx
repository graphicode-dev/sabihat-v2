import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { usePartnerForm } from "../../../contexts/PartnerFormContext";
import { ContactInformation } from "../../../pages/dashboard/business-partners-management/partners/types";

const contactInformationSchema = z.object({
    name: z.string(),
    phoneCode: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    title: z.string(),
    hotline: z.string(),
});

type ContactInformationAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function ContactInformationAddForm({
    handleChangeTab,
}: ContactInformationAddFormProps) {
    // Get form data and errors from context
    const {
        contactInformation,
        updateContactInformation,
        isSubmitting,
        errors: contextErrors,
        lockTab
    } = usePartnerForm();

    // Extract errors for this form - get the first contact's errors if available
    const formErrors: ContactInformation =
        contextErrors.contactInformation &&
        Array.isArray(contextErrors.contactInformation) &&
        contextErrors.contactInformation.length > 0
            ? (contextErrors.contactInformation[0] as ContactInformation)
            : {
                  name: "",
                  phoneCode: "",
                  phoneNumber: "",
                  email: "",
                  title: "",
                  hotline: "",
              };

    // We'll work with the first contact information entry
    const currentContact = contactInformation[0] || {
        name: "",
        phoneCode: "",
        phoneNumber: "",
        email: "",
        title: "",
        hotline: "",
    };

    const { control, handleSubmit, formState, setValue } =
        useForm<ContactInformation>({
            resolver: zodResolver(contactInformationSchema),
            defaultValues: {
                name: currentContact.name || "",
                phoneCode: currentContact.phoneCode || "",
                phoneNumber: currentContact.phoneNumber || "",
                email: currentContact.email || "",
                title: currentContact.title || "",
                hotline: currentContact.hotline || "",
            },
            mode: "onChange",
        });

    // Update form values when context data changes
    useEffect(() => {
        if (contactInformation.length > 0) {
            const contact = contactInformation[0];
            setValue("name", contact.name || "");
            setValue("phoneCode", contact.phoneCode || "");
            setValue("phoneNumber", contact.phoneNumber || "");
            setValue("email", contact.email || "");
            setValue("title", contact.title || "");
            setValue("hotline", contact.hotline || "");
        }
    }, [contactInformation, setValue]);

    const onSubmit = async (formData: ContactInformation) => {
        // Update the context with the form data - wrap in array since context expects array
        updateContactInformation([formData]);

        // Navigate to the next tab
        handleChangeTab("users");
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
                    label="Contact Name"
                    error={formErrors.name}
                />

                {/* Title */}
                <FormInput
                    name="title"
                    control={control}
                    label="Position"
                    error={formErrors.title}
                />

                {/* Phone */}
                <FormInput
                    name="phoneNumber"
                    control={control}
                    label="Phone Number"
                    type="tel"
                    error={formErrors.phoneNumber}
                />

                {/* Email */}
                <FormInput
                    name="email"
                    control={control}
                    label="Email"
                    error={formErrors.email}
                />

                {/* Hotline */}
                <FormInput
                    name="hotline"
                    control={control}
                    label="Hotline"
                    error={formErrors.hotline}
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isSubmitting}
                disabled={!formState.isDirty}
                cancelText="Back"
                submitText="Next"
                className="mt-4"
                onConfirm={() => handleChangeTab("users")}
                onCancel={() =>
                    handleChangeTab("quota-management-credit-limit")
                }
                removeCancel={lockTab}
            />
        </FormLayout>
    );
}

export default ContactInformationAddForm;
