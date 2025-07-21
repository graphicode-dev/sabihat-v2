import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useToast } from "../../../hooks/useToast";
import FormLayout from "../../../layout/FormLayout";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../form";
import {
    AuthoritiesContactInformation,
    AuthorityContactInformation,
} from "../../../pages/dashboard/business-partners-management/authorities/types";
import { useGenericForm } from "../../../contexts/GenericFormContext";
import { TableColumn, TableData } from "../../../types/table";
import { DynamicTable } from "../../table";

const contactInformationSchema = z.object({
    name: z.string(),
    title: z.string(),
    phoneCode: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    hotline: z.string(),
});

type AuthoritiesContactInformationAddFormProps = {
    handleChangeTab: (tab: string) => void;
};

function AuthoritiesContactInformationAddForm({
    handleChangeTab,
}: AuthoritiesContactInformationAddFormProps) {
    const { addToast } = useToast();
    const [contacts, setContacts] = useState<AuthoritiesContactInformation[]>(
        []
    );
    const [tableKey, setTableKey] = useState<number>(0);

    const {
        formData,
        updateFormSection,
        isSubmitting,
        errors: contextErrors,
        lockTab,
        submitForm,
    } = useGenericForm();

    const authoritiesContactInformation =
        formData.authoritiesContactInformation || [];

    // Session storage key for contacts
    const CONTACTS_STORAGE_KEY = "authority_contacts_data";

    // Save contacts to session storage
    const saveContactsToStorage = (
        contactsData: AuthoritiesContactInformation[]
    ) => {
        try {
            sessionStorage.setItem(
                CONTACTS_STORAGE_KEY,
                JSON.stringify(contactsData)
            );
            console.log("Saved contacts to session storage:", contactsData);
        } catch (error) {
            console.error("Error saving contacts to session storage:", error);
        }
    };

    // Load contacts from session storage
    const loadContactsFromStorage = ():
        | AuthoritiesContactInformation[]
        | null => {
        try {
            const storedContacts = sessionStorage.getItem(CONTACTS_STORAGE_KEY);
            if (storedContacts) {
                const parsedContacts = JSON.parse(storedContacts);
                console.log(
                    "Loaded contacts from session storage:",
                    parsedContacts
                );
                return parsedContacts;
            }
        } catch (error) {
            console.error(
                "Error loading contacts from session storage:",
                error
            );
        }
        return null;
    };

    // Clear contacts from session storage
    const clearContactsStorage = () => {
        try {
            sessionStorage.removeItem(CONTACTS_STORAGE_KEY);
            console.log("Cleared contacts from session storage");
        } catch (error) {
            console.error(
                "Error clearing contacts from session storage:",
                error
            );
        }
    };

    // Initialize contacts from context or session storage if available
    useEffect(() => {
        // First try to load from session storage (highest priority)
        const storedContacts = loadContactsFromStorage();

        if (storedContacts && storedContacts.length > 0) {
            setContacts(storedContacts);
            updateFormSection("contactInformation", storedContacts);
            setTableKey((prev) => prev + 1);
            console.log(
                "Restored contacts from session storage:",
                storedContacts
            );
        }
        // If no session storage data, try to use context data
        else if (
            authoritiesContactInformation &&
            authoritiesContactInformation.length > 0
        ) {
            setContacts(authoritiesContactInformation);
            setTableKey((prev) => prev + 1);
            console.log(
                "Updated contacts from context:",
                authoritiesContactInformation
            );
        }
    }, [authoritiesContactInformation]);

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const hasContactErrors = (index: number): boolean => {
        if (!contextErrors || !contextErrors.contactInformation) return false;

        const contactErrorKeys = Object.keys(formErrors).filter((key) =>
            key.startsWith(`contact_${index}_`)
        );

        console.log(contactErrorKeys);

        return contactErrorKeys.length > 0;
    };

    const clearContactErrors = (index: number) => {
        const newErrors = { ...formErrors };
        Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`contact_${index}_`)) {
                delete newErrors[key];
            }
        });
        setFormErrors(newErrors);
    };

    const getContactErrorMessage = (
        index: number,
        field: keyof AuthorityContactInformation
    ): string => {
        const errorKey = `contact_${index}_${field}`;
        return formErrors[errorKey] || "";
    };

    // Update form errors when context errors change
    useEffect(() => {
        const newErrors: Record<string, string> = {};
        console.log("Context errors:", contextErrors);

        // Check if we have contact information errors in the context
        if (contextErrors && contextErrors.contactInformation) {
            // If contactInformation errors are an array (for multiple contacts)
            if (Array.isArray(contextErrors.contactInformation)) {
                // Extract errors from each contact
                contextErrors.contactInformation.forEach(
                    (contactErrors, index) => {
                        if (
                            contactErrors &&
                            typeof contactErrors === "object"
                        ) {
                            Object.entries(contactErrors).forEach(
                                ([key, value]) => {
                                    // Format the error key to include the index
                                    newErrors[`contact_${index}_${key}`] =
                                        value as string;
                                }
                            );
                        }
                    }
                );
            } else {
                // Handle dot notation errors from API (contactInformation.0.phoneCode)
                Object.keys(contextErrors).forEach((key) => {
                    if (key.startsWith("contactInformation.")) {
                        const parts = key.split(".");
                        if (parts.length >= 3) {
                            const index = parseInt(parts[1]);
                            const field = parts[2];
                            if (!isNaN(index)) {
                                newErrors[`contact_${index}_${field}`] =
                                    Array.isArray(contextErrors[key])
                                        ? contextErrors[key][0]
                                        : contextErrors[key];
                            }
                        }
                    }
                });
            }

            console.log("Processed form errors:", newErrors);
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
                const hasError = getContactErrorMessage(index, "name");
                return (
                    <div
                        className={`flex items-center ${
                            hasError ? "text-red-500" : ""
                        }`}
                    >
                        {row.original?.name || row.columns?.name}
                        {hasError && (
                            <span
                                className="ml-1 text-red-500"
                                title={hasError}
                            >
                                ⚠️
                            </span>
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
                const hasError = getContactErrorMessage(index, "title");
                return (
                    <div
                        className={`flex items-center ${
                            hasError ? "text-red-500" : ""
                        }`}
                    >
                        {row.original?.title || row.columns?.title}
                        {hasError && (
                            <span
                                className="ml-1 text-red-500"
                                title={hasError}
                            >
                                ⚠️
                            </span>
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
                const hasPhoneCodeError = getContactErrorMessage(
                    index,
                    "phoneCode"
                );
                const hasPhoneNumberError = getContactErrorMessage(
                    index,
                    "phoneNumber"
                );
                const hasError = hasPhoneCodeError || hasPhoneNumberError;
                const errorMessage =
                    hasPhoneCodeError || hasPhoneNumberError || "";

                // Format phone number with country code
                const phoneCode =
                    row.original?.phoneCode || row.columns?.phoneCode || "";
                const phoneNumber =
                    row.original?.phoneNumber || row.columns?.phoneNumber || "";
                const formattedPhone = phoneCode + phoneNumber;

                return (
                    <div
                        className={`flex items-center ${
                            hasError ? "text-red-500" : ""
                        }`}
                    >
                        {formattedPhone}
                        {hasError && (
                            <span
                                className="ml-1 text-red-500"
                                title={errorMessage}
                            >
                                ⚠️
                            </span>
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
                const hasError = getContactErrorMessage(index, "email");
                return (
                    <div
                        className={`flex items-center ${
                            hasError ? "text-red-500" : ""
                        }`}
                    >
                        {row.original?.email || row.columns?.email}
                        {hasError && (
                            <span
                                className="ml-1 text-red-500"
                                title={hasError}
                            >
                                ⚠️
                            </span>
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
                const hasError = getContactErrorMessage(index, "hotline");
                return (
                    <div
                        className={`flex items-center ${
                            hasError ? "text-red-500" : ""
                        }`}
                    >
                        {row.original?.hotline || row.columns?.hotline}
                        {hasError && (
                            <span
                                className="ml-1 text-red-500"
                                title={hasError}
                            >
                                ⚠️
                            </span>
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
            : (authoritiesContactInformation || []).map(
                  (contact: AuthorityContactInformation, index: number) => ({
                      id: index.toString(),
                      columns: {
                          name: contact.name,
                          title: contact.title,
                          phoneNumber: `${contact.phoneCode} ${contact.phoneNumber}`,
                          email: contact.email,
                          hotline: contact.hotline,
                      },
                  })
              );

    const { control, handleSubmit, formState, reset, setValue } =
        useForm<AuthorityContactInformation>({
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

    const handlePhoneExtracted = (phoneData: {
        fullNumber: string;
        phoneCode: string;
        phoneNumber: string;
    }) => {
        setValue("phoneCode", phoneData.phoneCode);
        setValue("phoneNumber", phoneData.fullNumber);
    };

    const addContact = async (
        data: AuthorityContactInformation
    ): Promise<void> => {
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

        // Create a deep copy of the contacts to ensure it's a new reference
        const contactsCopy = JSON.parse(JSON.stringify(contacts));
        console.log("Submitting contacts to context:", contactsCopy);
        console.log("formData before update", formData);

        // Force update the context with all contacts
        updateFormSection("contactInformation", contactsCopy);

        // IMPORTANT: Store contacts in local state BEFORE submission
        // This ensures they're preserved regardless of API response
        setContacts(contactsCopy);

        // CRITICAL: Save contacts to session storage before submission
        // This ensures they can be recovered even if state is lost
        saveContactsToStorage(contactsCopy);

        // Force table to refresh immediately
        setTableKey((prev) => prev + 1);

        // Give React a moment to update the state
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Create a FormData object for submission
        const formDataToSubmit = new FormData();

        // Add authority data
        if (formData.authority) {
            Object.entries(formData.authority).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formDataToSubmit.append(
                        `authority[${key}]`,
                        value.toString()
                    );
                }
            });
        }

        // Add contact information data
        if (contactsCopy && contactsCopy.length > 0) {
            contactsCopy.forEach(
                (contact: AuthoritiesContactInformation, index: number) => {
                    Object.entries(contact).forEach(([key, value]) => {
                        if (value !== null && value !== undefined) {
                            formDataToSubmit.append(
                                `contactInformation[${index}][${key}]`,
                                value.toString()
                            );
                        }
                    });
                }
            );
        }

        console.log("Submitting FormData to API");

        // Submit the form with FormData
        try {
            await submitForm(formDataToSubmit);
            console.log("Form submitted successfully");

            // Clear session storage on successful submission
            clearContactsStorage();
        } catch (error) {
            console.error("Error submitting form:", error);

            // CRITICAL: Ensure contacts are preserved after error
            // First, try to load from session storage (most reliable source)
            const storedContacts = loadContactsFromStorage();
            if (storedContacts && storedContacts.length > 0) {
                setContacts(storedContacts);
                updateFormSection("contactInformation", storedContacts);
            } else {
                // Fallback to the copy we made before submission
                setContacts([...contactsCopy]);
            }

            // Force table to re-render
            setTableKey((prev) => prev + 1);

            // Force another re-render after a short delay to ensure UI updates
            setTimeout(() => {
                setTableKey((prev) => prev + 1);
                console.log(
                    "Re-rendered table after error with contacts:",
                    contacts
                );
            }, 200);

            // Show error toast but keep the contacts in the state
            addToast({
                type: "error",
                message:
                    "There was an error submitting the form. Please check all required fields.",
                title: "Error",
            });
        }
    };

    useEffect(() => {
        console.log("contacts", contacts);
        console.log("formData", formData);
    }, [contacts, formData]);

    return (
        <FormLayout handleSubmit={handleSubmit} handleFormSubmit={addContact}>
            <div id="contact-form">
                <FormFieldsLayout cols="6">
                    {/* Name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Contact Name"
                    />
                    {/* Title */}
                    <FormInput
                        name="title"
                        control={control}
                        label="Position"
                    />
                    {/* Phone */}
                    <FormInput
                        name="phoneNumber"
                        control={control}
                        label="Phone Number"
                        type="tel"
                        onPhoneExtracted={handlePhoneExtracted}
                    />
                    {/* Email */}
                    <FormInput name="email" control={control} label="Email" />
                    {/* Hotline */}
                    <FormInput
                        name="hotline"
                        control={control}
                        label="Hotline"
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
                    updateFormSection("contactInformation", newContacts);
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
                    const newContacts = contacts.filter(
                        (_, index) => index !== contactIndex
                    );
                    setContacts(newContacts);
                    updateFormSection("contactInformation", newContacts);
                    setTableKey((prev) => prev + 1);

                    // Clear errors for this contact
                    clearContactErrors(contactIndex);

                    // Scroll to form
                    document
                        .getElementById("contact-form")
                        ?.scrollIntoView({ behavior: "smooth" });
                }}
                rowClassName={(row) => {
                    const index = parseInt(row.id);
                    return hasContactErrors(index) ? "bg-red-50" : "";
                }}
            />

            <FormButtons
                isLoading={isSubmitting}
                disabled={contacts.length === 0}
                cancelText="Back"
                className="mt-4"
                onCancel={() => handleChangeTab("authority")}
                onConfirm={handleFinalSubmit}
                removeCancel={lockTab}
            />
        </FormLayout>
    );
}

export default AuthoritiesContactInformationAddForm;
