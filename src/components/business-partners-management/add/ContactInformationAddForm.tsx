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

    // Process and extract contact information errors from context
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    
    // Function to check if a specific contact has errors
    const hasContactErrors = (index: number): boolean => {
        if (!contextErrors || !contextErrors.contactInformation) return false;
        
        // Check if we have errors for this specific contact index
        const contactErrorKeys = Object.keys(formErrors).filter(key => 
            key.startsWith(`contact_${index}_`)
        );
        
        return contactErrorKeys.length > 0;
    };
    
    // Function to clear errors for a specific contact
    const clearContactErrors = (index: number) => {
        const newErrors = { ...formErrors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`contact_${index}_`)) {
                delete newErrors[key];
            }
        });
        setFormErrors(newErrors);
    };
    
    // Function to get error message for a specific contact field
    const getContactErrorMessage = (index: number, field: keyof ContactInformation): string => {
        const errorKey = `contact_${index}_${field}`;
        return formErrors[errorKey] || '';
    };
    
    // Update form errors when context errors change
    useEffect(() => {
        const newErrors: Record<string, string> = {};
        
        // Check if we have contact information errors in the context
        if (contextErrors && contextErrors.contactInformation) {
            // If contactInformation errors are an array (for multiple contacts)
            if (Array.isArray(contextErrors.contactInformation)) {
                // Extract errors from each contact
                contextErrors.contactInformation.forEach((contactErrors, index) => {
                    if (contactErrors && typeof contactErrors === 'object') {
                        Object.entries(contactErrors).forEach(([key, value]) => {
                            // Format the error key to include the index
                            newErrors[`contact_${index}_${key}`] = value as string;
                        });
                    }
                });
            }
            
            setFormErrors(newErrors);
        }
    }, [contextErrors]);

    const tableColumns: TableColumn[] = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
            cell: ({ row }: { row: any }) => {
                const index = parseInt(row.id);
                const hasError = getContactErrorMessage(index, 'name');
                return (
                    <div className={`flex items-center ${hasError ? 'text-red-500' : ''}`}>
                        {row.original?.name || row.columns?.name}
                        {hasError && (
                            <span className="ml-1 text-red-500" title={hasError}>⚠️</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "title",
            header: "Title",
            accessorKey: "title",
            cell: ({ row }: { row: any }) => {
                const index = parseInt(row.id);
                const hasError = getContactErrorMessage(index, 'title');
                return (
                    <div className={`flex items-center ${hasError ? 'text-red-500' : ''}`}>
                        {row.original?.title || row.columns?.title}
                        {hasError && (
                            <span className="ml-1 text-red-500" title={hasError}>⚠️</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "phoneNumber",
            header: "Phone Number",
            accessorKey: "phoneNumber",
            cell: ({ row }: { row: any }) => {
                const index = parseInt(row.id);
                const hasPhoneCodeError = getContactErrorMessage(index, 'phoneCode');
                const hasPhoneNumberError = getContactErrorMessage(index, 'phoneNumber');
                const hasError = hasPhoneCodeError || hasPhoneNumberError;
                const errorMessage = hasPhoneCodeError || hasPhoneNumberError || '';
                
                // Format phone number with country code
                const phoneCode = row.original?.phoneCode || row.columns?.phoneCode || '';
                const phoneNumber = row.original?.phoneNumber || row.columns?.phoneNumber || '';
                const formattedPhone = phoneCode + phoneNumber;
                
                return (
                    <div className={`flex items-center ${hasError ? 'text-red-500' : ''}`}>
                        {formattedPhone}
                        {hasError && (
                            <span className="ml-1 text-red-500" title={errorMessage}>⚠️</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
            cell: ({ row }: { row: any }) => {
                const index = parseInt(row.id);
                const hasError = getContactErrorMessage(index, 'email');
                return (
                    <div className={`flex items-center ${hasError ? 'text-red-500' : ''}`}>
                        {row.original?.email || row.columns?.email}
                        {hasError && (
                            <span className="ml-1 text-red-500" title={hasError}>⚠️</span>
                        )}
                    </div>
                );
            },
        },
        {
            id: "hotline",
            header: "Hotline",
            accessorKey: "hotline",
            cell: ({ row }: { row: any }) => {
                const index = parseInt(row.id);
                const hasError = getContactErrorMessage(index, 'hotline');
                return (
                    <div className={`flex items-center ${hasError ? 'text-red-500' : ''}`}>
                        {row.original?.hotline || row.columns?.hotline}
                        {hasError && (
                            <span className="ml-1 text-red-500" title={hasError}>⚠️</span>
                        )}
                    </div>
                );
            },
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

        // console.log("Adding contact:", newContact);

        // Update the state with the new contact
        setContacts((prevContacts) => {
            const updatedContacts = [...prevContacts, newContact];
            // console.log("Updated contacts array:", updatedContacts);
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

        // console.log("Submitting contacts to context:", contacts);

        // Create a deep copy of the contacts to ensure it's a new reference
        const contactsCopy = JSON.parse(JSON.stringify(contacts));

        // Force update the context with all contacts
        updateContactInformation(contactsCopy);

        // Give React a moment to update the state
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Double-check that the context has been updated
        // console.log("Context contacts before submission:", contactInformation);

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
            <div id="contact-form">
                <FormFieldsLayout cols="6">
                    {/* Display any general contact errors */}
                    {Object.keys(formErrors).length > 0 && (
                        <div className="col-span-6 text-red-500 text-sm mb-2">
                            Please fix the validation errors below
                        </div>
                    )}
                    
                    {/* Name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Contact Name"
                        error={getContactErrorMessage(0, 'name') || formState.errors.name?.message?.toString()}
                    />
                    {/* Title */}
                    <FormInput
                        name="title"
                        control={control}
                        label="Position"
                        error={getContactErrorMessage(0, 'title') || formState.errors.title?.message?.toString()}
                    />
                    {/* Phone */}
                    <FormInput
                        name="phoneNumber"
                        control={control}
                        label="Phone Number"
                        type="tel"
                        error={getContactErrorMessage(0, 'phoneNumber') || formState.errors.phoneNumber?.message?.toString()}
                        onPhoneExtracted={handlePhoneExtracted}
                    />
                    {/* Hidden phone code field */}
                    <input 
                        type="hidden" 
                        {...control.register("phoneCode")} 
                    />
                    {getContactErrorMessage(0, 'phoneCode') && (
                        <div className="col-span-6 text-red-500 text-sm">
                            {getContactErrorMessage(0, 'phoneCode')}
                        </div>
                    )}
                    {/* Email */}
                    <FormInput
                        name="email"
                        control={control}
                        label="Email"
                        error={getContactErrorMessage(0, 'email') || formState.errors.email?.message?.toString()}
                    />
                    {/* Hotline */}
                    <FormInput
                        name="hotline"
                        control={control}
                        label="Hotline"
                        error={getContactErrorMessage(0, 'hotline') || formState.errors.hotline?.message?.toString()}
                    />
                    <FormButtons
                        isLoading={false}
                        disabled={!formState.isDirty || !formState.isValid}
                        submitText="Add to List"
                        removeCancel
                    />
                </FormFieldsLayout>
            </div>

            <DynamicTable
                key={`contact-table-${tableKey}`}
                title="Contact Information List"
                data={tableData}
                columns={tableColumns}
                disableRowClick
                onDelete={(id) => {
                    const index = parseInt(id);
                    const newContacts = contacts.filter((_, i) => i !== index);
                    setContacts(newContacts);
                    updateContactInformation(newContacts);
                    setTableKey((prev) => prev + 1);
                    
                    // Clear errors for this contact
                    clearContactErrors(index);
                }}
                onEdit={(id) => {
                    // Get the contact to edit
                    const contactIndex = parseInt(id);
                    const contact = contacts[contactIndex];
                    
                    // Set form values
                    reset({
                        name: contact.name,
                        title: contact.title,
                        phoneCode: contact.phoneCode,
                        phoneNumber: contact.phoneNumber,
                        email: contact.email,
                        hotline: contact.hotline || "",
                    });
                    
                    // Remove the contact from the list
                    const newContacts = contacts.filter((_, index) => index !== contactIndex);
                    setContacts(newContacts);
                    updateContactInformation(newContacts);
                    setTableKey((prev) => prev + 1);
                    
                    // Clear errors for this contact
                    clearContactErrors(contactIndex);
                    
                    // Scroll to form
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                rowClassName={(row) => {
                    const index = parseInt(row.id);
                    return hasContactErrors(index) ? 'bg-red-50' : '';
                }}
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
