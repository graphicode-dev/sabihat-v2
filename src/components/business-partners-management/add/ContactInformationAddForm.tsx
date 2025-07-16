import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { usePartnerForm } from "../../../contexts/PartnerFormContext";
import { ContactInformation } from "../../../pages/dashboard/business-partners-management/partners/types";
import { DynamicTable } from "../../table";
import { TableColumn, TableData } from "../../../types/table";
import { useToast } from "../../../hooks/useToast";

const contactInformationSchema = z.object({
    name: z.string(),
    title: z.string(),
    phoneCode: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    hotline: z.string(),
});

type ContactInformationAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function ContactInformationAddForm({
    handleChangeTab,
}: ContactInformationAddFormProps) {
    const { addToast } = useToast();
    const [contacts, setContacts] = useState<ContactInformation[]>([]);
    // Add a key to force re-render when contacts change
    const [tableKey, setTableKey] = useState<number>(0);

    const {
        contactInformation,
        updateContactInformation,
        isSubmitting,
        errors: contextErrors,
        lockTab,
        submitForm,
    } = usePartnerForm();

    // Initialize contacts from context data when component mounts
    useEffect(() => {
        if (
            contactInformation &&
            contactInformation.length > 0 &&
            contacts.length === 0
        ) {
            setContacts(contactInformation);
            setTableKey((prev) => prev + 1); // Force table to re-render
        }
    }, [contactInformation, contacts.length]);

    const formErrors: Record<string, string> =
        contextErrors.contactInformation &&
        Array.isArray(contextErrors.contactInformation) &&
        contextErrors.contactInformation.length > 0
            ? (contextErrors.contactInformation[0] as any)
            : {};

    const tableColumns: TableColumn[] = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "title",
            header: "Title",
            accessorKey: "title",
        },
        {
            id: "phoneNumber",
            header: "Phone Number",
            accessorKey: "phoneNumber",
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "hotline",
            header: "Hotline",
            accessorKey: "hotline",
        },
    ];

    // Use the local state if it has items, otherwise fall back to context data
    const tableData: TableData[] =
        contacts.length > 0
            ? contacts.map((contact, index) => ({
                  id: index.toString(),
                  columns: {
                      name: contact.name,
                      title: contact.title,
                      phoneNumber: `${contact.phoneCode} ${contact.phoneNumber}`,
                      email: contact.email,
                      hotline: contact.hotline,
                  },
              }))
            : (contactInformation || []).map((contact, index) => ({
                  id: index.toString(),
                  columns: {
                      name: contact.name,
                      title: contact.title,
                      phoneNumber: `${contact.phoneCode} ${contact.phoneNumber}`,
                      email: contact.email,
                      hotline: contact.hotline,
                  },
              }));

    const { control, handleSubmit, formState, reset, setValue } =
        useForm<ContactInformation>({
            resolver: zodResolver(contactInformationSchema) as any,
            defaultValues: {
                name: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                title: "",
                hotline: "",
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

    const addContact = async (data: ContactInformation): Promise<void> => {
        const phoneCodeLength = data.phoneCode?.length || 0;
        const phoneNumberOnly = data.phoneNumber.substring(phoneCodeLength);

        const newContact = {
            name: data.name,
            title: data.title,
            phoneCode: data.phoneCode,
            phoneNumber: phoneNumberOnly,
            email: data.email,
            hotline: data.hotline,
        };

        console.log("Adding contact:", newContact);

        // Update the state with the new contact
        setContacts((prevContacts) => {
            const updatedContacts = [...prevContacts, newContact];
            console.log("Updated contacts array:", updatedContacts);
            return updatedContacts;
        });

        // Increment the table key to force a re-render
        setTableKey((prev) => prev + 1);

        addToast({
            type: "success",
            message: "Contact added to the list",
            title: "Success",
        });

        reset();
        return Promise.resolve();
    };

    const handleFinalSubmit = async () => {
        if (contacts.length === 0) {
            addToast({
                type: "error",
                message: "Please add at least one contact",
                title: "Error",
            });
            return;
        }

        console.log("Submitting contacts to context:", contacts);

        // Create a deep copy of the contacts to ensure it's a new reference
        const contactsCopy = JSON.parse(JSON.stringify(contacts));

        // Force update the context with all contacts
        updateContactInformation(contactsCopy);

        // Give React a moment to update the state
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Double-check that the context has been updated
        console.log("Context contacts before submission:", contactInformation);

        // Submit the form with explicit contacts data
        try {
            // Pass the contacts directly to the submitForm function
            // This ensures the contacts are available during form submission
            // even if the context state hasn't updated yet
            await submitForm(contactsCopy);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={addContact}
            removeBorder
        >
            <FormFieldsLayout cols="6">
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
                    onPhoneExtracted={handlePhoneExtracted}
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
                <FormButtons
                    isLoading={false}
                    disabled={!formState.isDirty || !formState.isValid}
                    submitText="Add to List"
                    removeCancel
                />
            </FormFieldsLayout>

            <DynamicTable
                key={`contact-table-${tableKey}`}
                title="Contact Information List"
                data={tableData}
                columns={tableColumns}
                disableRowClick
            />

            <FormButtons
                isLoading={isSubmitting}
                disabled={contacts.length === 0}
                cancelText="Back"
                className="mt-4"
                onCancel={() =>
                    handleChangeTab("quota-management-credit-limit")
                }
                onConfirm={handleFinalSubmit}
                removeCancel={lockTab}
            />
        </FormLayout>
    );
}

export default ContactInformationAddForm;
