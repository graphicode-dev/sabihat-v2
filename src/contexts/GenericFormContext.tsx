import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";

// Generic types for form data and errors
export type FormData = Record<string, any>;
export type FormErrors = Record<string, any>;

// Tab configuration interface
export interface TabConfig {
    id: string; // Internal ID used for state management
    urlParam: string; // URL parameter value for this tab
    initialState: any; // Initial state for this tab's form data
    errorSchema: any; // Schema for error structure
}

// Tab errors tracking
export type TabErrorsState = Record<string, boolean>;

// Form submission configuration
export interface SubmitConfig {
    endpoint: (formData: FormData | FormData) => Promise<any>;
    successMessage: string;
    successRedirect: string;
    errorMessage: string;
    formDataTransformer?: (formData: FormData) => any;
}

// Context value type
export interface GenericFormContextType {
    formData: FormData;
    errors: FormErrors;
    tabsWithErrors: TabErrorsState;
    isSubmitting: boolean;
    lockTab: boolean;
    updateFormSection: (sectionId: string, data: any) => void;
    submitForm: (additionalData?: any) => Promise<void>;
    resetErrors: () => void;
    getTabErrorStatus: (tabId: string) => boolean;
}

// Create context
const GenericFormContext = createContext<GenericFormContextType | undefined>(
    undefined
);

// Provider props
export interface GenericFormProviderProps {
    children: React.ReactNode;
    tabConfigs: TabConfig[];
    submitConfig: SubmitConfig;
}

export const GenericFormProvider: React.FC<GenericFormProviderProps> = ({
    children,
    tabConfigs,
    submitConfig,
}) => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [lockTab, setLockTab] = useState(true);

    // Initialize form state from tab configs
    const initialFormData: FormData = {};
    const initialTabErrors: TabErrorsState = {};

    tabConfigs.forEach((tab: TabConfig) => {
        initialFormData[tab.id] = tab.initialState;
        initialTabErrors[tab.id] = false;
    });

    // State hooks
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [tabsWithErrors, setTabsWithErrors] =
        useState<TabErrorsState>(initialTabErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update function for any form section
    const updateFormSection = (sectionId: string, data: any) => {
        setFormData((prev) => ({
            ...prev,
            [sectionId]:
                typeof data === "function"
                    ? data(prev[sectionId])
                    : Array.isArray(prev[sectionId]) && Array.isArray(data)
                    ? data // Replace arrays completely
                    : { ...prev[sectionId], ...data }, // Merge objects
        }));
    };

    const resetErrors = () => {
        setErrors({});
        setTabsWithErrors(initialTabErrors);
    };

    // Helper function to handle navigation to tab with errors
    const handleTabWithErrors = (errorTabId: string): void => {
        // Find the tab config for this error
        const errorTab = tabConfigs.find(
            (tab: TabConfig) => tab.id === errorTabId
        );
        if (!errorTab) return;

        // Update the URL to navigate to the tab with errors
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("tab", errorTab.urlParam);
        navigate(`${window.location.pathname}?${searchParams.toString()}`);
    };

    // Process API validation errors and map them to the correct tabs
    const processErrors = (apiErrors: any) => {
        const formErrors: FormErrors = {};
        const tabErrors: TabErrorsState = { ...initialTabErrors };
        
        console.log("Processing API errors:", apiErrors);

        // Check if we have errors object from API response
        if (apiErrors && apiErrors.errors && typeof apiErrors.errors === "object") {
            apiErrors = apiErrors.errors; // Use the errors object directly
        }

        // General error handling
        if (typeof apiErrors === "string") {
            formErrors.general = apiErrors;
            return null;
        }

        if (!apiErrors || typeof apiErrors !== "object") {
            return null;
        }

        // Check for general errors
        if (apiErrors.message || apiErrors.error) {
            formErrors.general = apiErrors.message || apiErrors.error;
        }

        // Process dot notation errors first (authority.name, contactInformation.0.phoneCode)
        Object.keys(apiErrors).forEach(key => {
            if (key.includes('.')) {
                const parts = key.split('.');
                const tabId = parts[0]; // e.g. 'authority', 'contactInformation'
                
                // Find the tab config for this error
                const tabConfig = tabConfigs.find(tab => tab.id === tabId);
                if (tabConfig) {
                    tabErrors[tabId] = true;
                    
                    // Initialize tab error object if needed
                    if (!formErrors[tabId]) {
                        formErrors[tabId] = { ...tabConfig.errorSchema };
                    }
                    
                    // Handle array notation (contactInformation.0.phoneCode)
                    if (parts.length >= 3 && !isNaN(parseInt(parts[1]))) {
                        const index = parseInt(parts[1]);
                        const field = parts[2];
                        
                        // Initialize array if needed
                        if (!Array.isArray(formErrors[tabId])) {
                            formErrors[tabId] = [];
                        }
                        
                        // Ensure array has enough elements
                        const errorArray = formErrors[tabId] as any[];
                        while (errorArray.length <= index) {
                            errorArray.push({ ...tabConfig.errorSchema[0] });
                        }
                        
                        // Set the error
                        errorArray[index][field] = Array.isArray(apiErrors[key])
                            ? apiErrors[key][0]
                            : apiErrors[key];
                    } else {
                        // Regular field error (authority.name)
                        const fieldName = parts[1];
                        (formErrors[tabId] as any)[fieldName] = Array.isArray(apiErrors[key])
                            ? apiErrors[key][0]
                            : apiErrors[key];
                    }
                }
            }
        });

        // Process errors for each tab (standard format)
        tabConfigs.forEach((tab: TabConfig) => {
            // Check for direct tab errors
            if (apiErrors[tab.id]) {
                tabErrors[tab.id] = true;
                formErrors[tab.id] = apiErrors[tab.id];
            }

            // Check for errors in this tab's fields (non-dot notation)
            const tabErrorKeys = Object.keys(apiErrors).filter(
                (key) =>
                    key === tab.id ||
                    (key.startsWith(`${tab.id}.`) && !key.includes('.', tab.id.length + 1)) || // Only first-level dots
                    key.startsWith(`${tab.id}[`)
            );

            if (tabErrorKeys.length > 0) {
                tabErrors[tab.id] = true;

                // Create error object for this tab if not already created
                if (!formErrors[tab.id]) {
                    formErrors[tab.id] = { ...tab.errorSchema };
                }
                
                let tabErrorObj = formErrors[tab.id];

                tabErrorKeys.forEach((key) => {
                    // Extract field name from error key
                    let fieldName = key;

                    if (key.includes(".")) {
                        fieldName = key.split(".")[1];
                    } else if (key.includes("[")) {
                        // Handle array notation like contactInformation[0].name
                        const matches = key.match(/\[(\d+)\]\.(\w+)/);
                        if (matches && matches.length >= 3) {
                            // This is array-based error handling
                            const index = parseInt(matches[1]);
                            const field = matches[2];

                            // Initialize array if needed
                            if (!Array.isArray(tabErrorObj)) {
                                tabErrorObj = [];
                                formErrors[tab.id] = tabErrorObj;
                            }

                            // Ensure the array has enough elements
                            while (tabErrorObj.length <= index) {
                                tabErrorObj.push({ ...tab.errorSchema[0] });
                            }

                            // Set the error
                            tabErrorObj[index][field] = Array.isArray(
                                apiErrors[key]
                            )
                                ? apiErrors[key][0]
                                : apiErrors[key];

                            // Skip the rest of this iteration
                            return;
                        }
                    }

                    // Handle snake_case to camelCase conversion
                    if (fieldName.includes("_")) {
                        const parts = fieldName.split("_");
                        fieldName =
                            parts[0] +
                            parts
                                .slice(1)
                                .map(
                                    (part) =>
                                        part.charAt(0).toUpperCase() +
                                        part.slice(1)
                                )
                                .join("");
                    }

                    // Set the error message
                    if (fieldName in tabErrorObj) {
                        tabErrorObj[fieldName] = Array.isArray(apiErrors[key])
                            ? apiErrors[key][0]
                            : apiErrors[key];
                    }
                });
            }
        });
        
        console.log("Processed form errors:", formErrors);
        setErrors(formErrors);
        setTabsWithErrors(tabErrors);

        // Return the tab that has errors for navigation
        return Object.keys(tabErrors).find((tab) => tabErrors[tab]) || null;
    };

    // Get error status for a specific tab
    const getTabErrorStatus = (tabId: string): boolean => {
        return !!tabsWithErrors[tabId];
    };

    // Submit form function
    const submitForm = async (additionalData?: any): Promise<void> => {
        setIsSubmitting(true);
        resetErrors();

        // Prepare data for submission
        let dataToSubmit = { ...formData };

        // Handle FormData objects specially
        if (additionalData instanceof FormData) {
            // Use the FormData object directly
            try {
                await submitConfig.endpoint(additionalData);

                addToast({
                    message: submitConfig.successMessage,
                    type: "success",
                    title: "Success!",
                });

                navigate(submitConfig.successRedirect);
                setIsSubmitting(false);
                setLockTab(false);
                return; // Exit early since we've handled the submission
            } catch (error) {
                const errorTab = processErrors(error);

                // If there are errors, show a toast notification
                addToast({
                    type: "error",
                    message: submitConfig.errorMessage,
                });

                // If we know which tab has errors, navigate to it
                if (errorTab) {
                    handleTabWithErrors(errorTab);
                }

                setIsSubmitting(false);
                setLockTab(false);
                return; // Exit early
            }
        }

        // Handle regular object data
        // Add any additional data passed to submitForm
        if (additionalData) {
            if (
                typeof additionalData === "object" &&
                !Array.isArray(additionalData)
            ) {
                // If it's an object with section keys
                Object.entries(additionalData).forEach(([key, value]) => {
                    // Special handling for arrays to ensure they're preserved
                    if (Array.isArray(value)) {
                        // Make a deep copy of array data to ensure it's preserved
                        dataToSubmit[key] = JSON.parse(JSON.stringify(value));
                    } else {
                        dataToSubmit[key] = value;
                    }
                });
            }
        }

        // Transform form data if needed
        if (submitConfig.formDataTransformer) {
            dataToSubmit = submitConfig.formDataTransformer(dataToSubmit);
        }

        try {
            await submitConfig.endpoint(dataToSubmit);

            addToast({
                message: submitConfig.successMessage,
                type: "success",
                title: "Success!",
            });

            navigate(submitConfig.successRedirect);
            setIsSubmitting(false);
            setLockTab(false);
        } catch (error) {
            const errorTab = processErrors(error);

            // If there are errors, show a toast notification
            addToast({
                type: "error",
                message: submitConfig.errorMessage,
            });

            // If we know which tab has errors, navigate to it
            if (errorTab) {
                handleTabWithErrors(errorTab);
            }

            setIsSubmitting(false);
            setLockTab(false);
        }
    };

    const contextValue: GenericFormContextType = {
        formData,
        errors,
        tabsWithErrors,
        isSubmitting,
        lockTab,
        updateFormSection,
        submitForm,
        resetErrors,
        getTabErrorStatus,
    };

    return (
        <GenericFormContext.Provider value={contextValue}>
            {children}
        </GenericFormContext.Provider>
    );
};

// Create a custom hook to use the context
export const useGenericForm = () => {
    const context = useContext(GenericFormContext);
    if (context === undefined) {
        throw new Error(
            "useGenericForm must be used within a GenericFormProvider"
        );
    }
    return context;
};
