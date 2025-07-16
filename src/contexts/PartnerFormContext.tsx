import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { ENDPOINTS } from "../config/endpoints";
import {
    PartnersMaster,
    QuotaManagement,
    ContactInformation,
    PartnersMasterError,
} from "../pages/dashboard/business-partners-management/partners/types";

export interface UserForm {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
}

// Define the structure for form errors
interface FormErrors {
    partnerMaster?: PartnersMasterError;
    quotaManagement?: QuotaManagement;
    contactInformation?: ContactInformation[];
    users?: Record<string, string>[];
    general?: string;
}

// Define which tab has errors
interface TabErrors {
    partnerMaster: boolean;
    quotaManagement: boolean;
    contactInformation: boolean;
    users: boolean;
}

// Define the context value type
interface PartnerFormContextType {
    partnerMaster: PartnersMaster;
    quotaManagement: QuotaManagement;
    contactInformation: ContactInformation[];
    users: UserForm[];
    errors: FormErrors;
    tabsWithErrors: TabErrors;
    isSubmitting: boolean;
    updatePartnerMaster: (data: Partial<PartnersMaster>) => void;
    updateQuotaManagement: (data: Partial<QuotaManagement>) => void;
    updateContactInformation: (data: ContactInformation[]) => void;
    updateUsers: (data: UserForm[]) => void;
    submitForm: () => Promise<void>;
    resetErrors: () => void;
    lockTab: boolean;
}

// Create the context with default values
const PartnerFormContext = createContext<PartnerFormContextType | undefined>(
    undefined
);

// Create a provider component
export const PartnerFormProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [lockTab, setLockTab] = useState(true);

    // Initialize form state
    const [partnerMaster, setPartnerMaster] = useState<PartnersMaster>({
        name: "",
        phoneCode: "",
        phoneNumber: "",
        email: "",
        address: "",
        layerId: "",
        image: null,
    });

    const [quotaManagement, setQuotaManagement] = useState<QuotaManagement>({
        limitAmount: "",
        ticketQuota: "",
    });

    const [contactInformation, setContactInformation] = useState<
        ContactInformation[]
    >([
        {
            name: "",
            phoneCode: "",
            phoneNumber: "",
            email: "",
            title: "",
            hotline: "",
        },
    ]);

    const [users, setUsers] = useState<UserForm[]>([
        { name: "", email: "", phoneNumber: "", role: "" },
    ]);

    const [errors, setErrors] = useState<FormErrors>({});
    const [tabsWithErrors, setTabsWithErrors] = useState<TabErrors>({
        partnerMaster: false,
        quotaManagement: false,
        contactInformation: false,
        users: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update functions for each form section
    const updatePartnerMaster = (data: Partial<PartnersMaster>) => {
        setPartnerMaster((prev) => ({ ...prev, ...data }));
    };

    const updateQuotaManagement = (data: Partial<QuotaManagement>) => {
        setQuotaManagement((prev) => ({ ...prev, ...data }));
    };

    const updateContactInformation = (data: ContactInformation[]) => {
        setContactInformation(data);
    };

    const updateUsers = (data: UserForm[]) => {
        setUsers(data);
    };

    const resetErrors = () => {
        setErrors({});
        setTabsWithErrors({
            partnerMaster: false,
            quotaManagement: false,
            contactInformation: false,
            users: false,
        });
    };

    // Helper function to handle navigation to tab with errors
    const handleTabWithErrors = (errorTab: string): void => {
        // This function doesn't need to return anything as it just triggers side effects
        // Map the error tab name to the corresponding URL tab parameter
        let urlTabParam = "";

        switch (errorTab) {
            case "partnerMaster":
                urlTabParam = "partnersMaster";
                break;
            case "quotaManagement":
                urlTabParam = "quota-management-credit-limit";
                break;
            case "contactInformation":
                urlTabParam = "contactInformation";
                break;
            case "users":
                urlTabParam = "users";
                break;
            default:
                urlTabParam = "partnersMaster";
        }

        // Update the URL to navigate to the tab with errors
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("tab", urlTabParam);
        navigate(`${window.location.pathname}?${searchParams.toString()}`);
    };

    // Process API validation errors and map them to the correct tabs
    const processErrors = (apiErrors: any) => {
        const formErrors: FormErrors = {};
        const tabs: TabErrors = {
            partnerMaster: false,
            quotaManagement: false,
            contactInformation: false,
            users: false,
        };

        console.log("Processing API errors:", apiErrors);

        // Check if apiErrors is an object with field-specific errors
        if (apiErrors && typeof apiErrors === "object") {
            // Process partner master errors
            const partnerMasterErrors: PartnersMasterError = {
                name: "",
                phoneCode: "",
                phoneNumber: "",
                email: "",
                address: "",
                layerId: "",
                image: "",
            };

            // Handle partnerMaster errors with various formats
            Object.keys(apiErrors).forEach((key) => {
                if (key.startsWith("partnerMaster.")) {
                    const fieldName = key.includes(".")
                        ? key.split(".")[1]
                        : key;

                    if (Array.isArray(apiErrors[key])) {
                        partnerMasterErrors[
                            fieldName as keyof PartnersMasterError
                        ] = apiErrors[key][0];
                    } else {
                        partnerMasterErrors[
                            fieldName as keyof PartnersMasterError
                        ] = apiErrors[key];
                    }
                    tabs.partnerMaster = true;
                }
            });

            if (Object.keys(partnerMasterErrors).length > 0) {
                formErrors.partnerMaster = partnerMasterErrors;
            }

            // Process quota management errors
            const quotaErrors: QuotaManagement = {
                limitAmount: "",
                ticketQuota: "",
            };

            // Handle direct quotaManagement error
            if (apiErrors.quotaManagement) {
                if (Array.isArray(apiErrors.quotaManagement)) {
                    quotaErrors.limitAmount = apiErrors.quotaManagement[0];
                } else {
                    quotaErrors.limitAmount = apiErrors.quotaManagement;
                }
                tabs.quotaManagement = true;
            }

            // Handle specific quota management field errors
            Object.keys(apiErrors).forEach((key) => {
                if (key.startsWith("quotaManagement.")) {
                    const fieldName = key.includes(".")
                        ? key.split(".")[1]
                        : key;

                    if (Array.isArray(apiErrors[key])) {
                        quotaErrors[fieldName as keyof QuotaManagement] =
                            apiErrors[key][0];
                    } else {
                        quotaErrors[fieldName as keyof QuotaManagement] =
                            apiErrors[key];
                    }
                    tabs.quotaManagement = true;
                }
            });

            if (Object.keys(quotaErrors).length > 0) {
                formErrors.quotaManagement = quotaErrors;
            }

            // Process contact information errors (array of objects)
            const contactErrors: ContactInformation[] = [];
            let hasContactErrors = false;

            Object.keys(apiErrors).forEach((key) => {
                const dotMatches =
                    key.match(/^contactInformation\.(\d+)\.(\w+)$/) ||
                    key.match(/^contact_information\.(\d+)\.(\w+)$/);
                const bracketMatches =
                    key.match(/^contactInformation\[(\d+)\]\.(\w+)$/) ||
                    key.match(/^contact_information\[(\d+)\]\.(\w+)$/);

                const matches = dotMatches || bracketMatches;

                if (matches && matches.length === 3) {
                    hasContactErrors = true;
                    tabs.contactInformation = true;

                    const index = parseInt(matches[1]);
                    const fieldName = matches[2];

                    // Ensure the array has enough elements
                    while (contactErrors.length <= index) {
                        contactErrors.push({
                            name: "",
                            title: "",
                            phoneCode: "",
                            phoneNumber: "",
                            hotline: "",
                            email: "",
                        });
                    }

                    // Handle array of error messages
                    if (Array.isArray(apiErrors[key])) {
                        contactErrors[index][
                            fieldName as keyof ContactInformation
                        ] = apiErrors[key][0];
                    } else {
                        contactErrors[index][
                            fieldName as keyof ContactInformation
                        ] = apiErrors[key];
                    }
                }
            });

            if (hasContactErrors) {
                formErrors.contactInformation = contactErrors;
            }

            // Process users errors (array of objects)
            const userErrors: Record<string, string>[] = [];
            let hasUserErrors = false;

            Object.keys(apiErrors).forEach((key) => {
                // Match both users.0.field and users[0].field formats
                // Also match user_accounts.0.field format from API
                const dotMatches =
                    key.match(/^users\.(\d+)\.(\w+)$/) ||
                    key.match(/^user_accounts\.(\d+)\.(\w+)$/);
                const bracketMatches =
                    key.match(/^users\[(\d+)\]\.(\w+)$/) ||
                    key.match(/^user_accounts\[(\d+)\]\.(\w+)$/);

                const matches = dotMatches || bracketMatches;

                if (matches && matches.length === 3) {
                    hasUserErrors = true;
                    tabs.users = true;

                    const index = parseInt(matches[1]);
                    const fieldName = matches[2];

                    // Ensure the array has enough elements
                    while (userErrors.length <= index) {
                        userErrors.push({});
                    }

                    // Handle array of error messages
                    if (Array.isArray(apiErrors[key])) {
                        userErrors[index][fieldName] = apiErrors[key][0];
                    } else {
                        userErrors[index][fieldName] = apiErrors[key];
                    }
                }
            });

            if (hasUserErrors) {
                formErrors.users = userErrors;
            }

            // Check for general errors
            if (apiErrors.message || apiErrors.error) {
                formErrors.general = apiErrors.message || apiErrors.error;
            }
        } else if (typeof apiErrors === "string") {
            // If the error is just a string, set it as a general error
            formErrors.general = apiErrors;
        }

        setErrors(formErrors);
        setTabsWithErrors(tabs);

        // Return the tab that has errors for navigation
        return (
            Object.keys(tabs).find((tab) => tabs[tab as keyof TabErrors]) ||
            null
        );
    };

    // Submit form function
    const submitForm = async (): Promise<void> => {
        setIsSubmitting(true);
        resetErrors();

        // Create FormData object
        const formData = new FormData();

        // Add partner master data
        Object.entries(partnerMaster).forEach(([key, value]) => {
            formData.append(
                `partnerMaster[${key}]`,
                value !== null ? value.toString() : ""
            );
        });

        // Add quota management data
        Object.entries(quotaManagement).forEach(([key, value]) => {
            formData.append(
                `quotaManagement[${key}]`,
                value !== null ? value.toString() : ""
            );
        });

        // Add contact information data
        contactInformation.forEach((contact, index) => {
            Object.entries(contact).forEach(([key, value]) => {
                formData.append(
                    `contactInformation[${index}][${key}]`,
                    value !== null ? value.toString() : ""
                );
            });
        });

        // Add users data
        users.forEach((user, index) => {
            Object.entries(user).forEach(([key, value]) => {
                formData.append(
                    `users[${index}][${key}]`,
                    value !== null ? value.toString() : ""
                );
            });
        });

        await ENDPOINTS.partners
            .add(formData)
            .then(() => {
                addToast({
                    message: "Partner added successfully",
                    type: "success",
                    title: "Success!",
                });
                navigate("/business-partners-management/partners");
                setIsSubmitting(false);
                setLockTab(false);
            })
            .catch((error) => {
                const errorTab = processErrors(error);

                // If there are errors, show a toast notification
                addToast({
                    type: "error",
                    message: "Please fix the validation errors",
                });

                // If we know which tab has errors, navigate to it
                if (errorTab) {
                    // Navigate to the tab with errors
                    handleTabWithErrors(errorTab);
                }

                setIsSubmitting(false);
                setLockTab(false);
            });
    };

    const contextValue: PartnerFormContextType = {
        partnerMaster,
        quotaManagement,
        contactInformation,
        users,
        errors,
        tabsWithErrors,
        isSubmitting,
        updatePartnerMaster,
        updateQuotaManagement,
        updateContactInformation,
        updateUsers,
        submitForm,
        resetErrors,
        lockTab,
    };

    useEffect(() => {
        console.log("partnerMaster", partnerMaster);
        console.log("quotaManagement", quotaManagement);
        console.log("contactInformation", contactInformation);
        console.log("users", users);
    }, [partnerMaster, quotaManagement, contactInformation, users]);

    return (
        <PartnerFormContext.Provider value={contextValue}>
            {children}
        </PartnerFormContext.Provider>
    );
};

// Create a custom hook to use the context
export const usePartnerForm = () => {
    const context = useContext(PartnerFormContext);
    if (context === undefined) {
        throw new Error(
            "usePartnerForm must be used within a PartnerFormProvider"
        );
    }
    return context;
};
