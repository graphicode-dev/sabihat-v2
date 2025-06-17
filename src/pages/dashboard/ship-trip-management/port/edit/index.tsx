import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLayout from "../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../components/form";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import PageLayout from "../../../../../layout/PageLayout";

type Port = {
    id?: string;
    portName: string;
    abbreviationCode: string;
    country: string;
};

const portSchema = z.object({
    id: z.string().optional(),
    portName: z.string(),
    abbreviationCode: z.string(),
    country: z.string(),
});

function PortEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Port>({
        portName: "",
        abbreviationCode: "",
        country: "",
    });

    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<Port>({
        resolver: zodResolver(portSchema),
        defaultValues: {
            id: "",
            portName: "",
            abbreviationCode: "",
            country: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Port) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.portName) {
                apiFormData.append("portName", formData.portName);
            }
            if (formData.abbreviationCode) {
                apiFormData.append(
                    "abbreviationCode",
                    formData.abbreviationCode
                );
            }
            if (formData.country) {
                apiFormData.append("country", formData.country);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Port updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating port:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.portName) {
                    mappedErrors.portName = error.errors.portName[0];
                }
                if (error.errors.abbreviationCode) {
                    mappedErrors.abbreviationCode =
                        error.errors.abbreviationCode[0];
                }
                if (error.errors.country) {
                    mappedErrors.country = error.errors.country[0];
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
                <FormFieldsLayout title="Edit">
                    {/* portName */}
                    <FormInput
                        name="portName"
                        control={control}
                        label="Port Name"
                        error={errors.portName}
                    />

                    {/* abbreviationCode */}
                    <FormInput
                        name="abbreviationCode"
                        control={control}
                        label="Abbreviation Code"
                        error={errors.abbreviationCode}
                    />

                    {/* country */}
                    <SearchedDropDown
                        name="country"
                        control={control}
                        label="Country"
                        options={[
                            { key: "1", value: "Country 1" },
                            { key: "2", value: "Country 2" },
                            { key: "3", value: "Country 3" },
                            { key: "4", value: "Country 4" },
                            { key: "5", value: "Country 5" },
                        ]}
                        value={selectedCountry}
                        onChange={(value) => {
                            setSelectedCountry(value);
                        }}
                        placeholder="Select Country"
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default PortEditPage;
