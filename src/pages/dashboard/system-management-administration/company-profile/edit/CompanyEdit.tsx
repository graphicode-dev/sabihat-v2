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
import { logFormData } from "../../../../../lib/utils";

type Error = {
    name?: string;
    taxId?: string;
    street?: string;
    city?: string;
    country?: string;
    logo?: string;
};

type Company = {
    id?: string;
    name?: string;
    taxId?: string;
    street?: string;
    city?: string;
    country?: string;
    logo?: File | null;
};

const companySchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    taxId: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    logo: z.instanceof(File).optional().nullable(),
});

function CompanyEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        name: "",
        taxId: "",
        street: "",
        city: "",
        country: "",
        logo: "",
    });
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<Company>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            taxId: "",
            street: "",
            city: "",
            country: "",
            logo: null,
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Company) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.name) {
                apiFormData.append("name", formData.name);
            }
            if (formData.taxId) {
                apiFormData.append("tax_id", formData.taxId);
            }
            if (formData.street) {
                apiFormData.append("street", formData.street);
            }
            if (formData.city) {
                apiFormData.append("city", formData.city);
            }
            if (formData.country) {
                apiFormData.append("country", formData.country);
            }

            // Handle file upload separately
            if (formData.logo instanceof File) {
                apiFormData.append("logo", formData.logo);
            }

            // Better way to debug FormData contents
            logFormData(apiFormData, "Company Edit Form Data");

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Company profile updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            setSelectedCity(null);
            setSelectedCountry(null);
            navigate(-1);
        } catch (error: any) {
            console.error("Error creating company:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.tax_id) {
                    mappedErrors.taxId = error.errors.tax_id[0];
                }
                if (error.errors.street) {
                    mappedErrors.street = error.errors.street[0];
                }
                if (error.errors.city) {
                    mappedErrors.city = error.errors.city[0];
                }
                if (error.errors.country) {
                    mappedErrors.country = error.errors.country[0];
                }
                if (error.errors.logo) {
                    mappedErrors.logo = error.errors.logo[0];
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
                <FormFieldsLayout title="Add" cols="3">
                    {/* Logo */}
                    <FormInput
                        name="logo"
                        control={control}
                        type="file"
                        fileLabel="Upload Logo"
                    />

                    {/* Name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Company Name"
                        type="text"
                        error={errors.name}
                    />

                    {/* Tax Id */}
                    <FormInput
                        name="taxId"
                        control={control}
                        label="Tax Id"
                        type="text"
                        error={errors.taxId}
                    />
                </FormFieldsLayout>

                <FormFieldsLayout subtitle="Address" cols="3">
                    {/* Street */}
                    <FormInput
                        name="street"
                        control={control}
                        label="Street"
                        type="text"
                        error={errors.street}
                    />

                    {/* City */}
                    <SearchedDropDown
                        name="city"
                        control={control}
                        label="City"
                        options={[
                            { key: "City 1", value: "City 1" },
                            { key: "City 2", value: "City 2" },
                            { key: "City 3", value: "City 3" },
                            { key: "City 4", value: "City 4" },
                            { key: "City 5", value: "City 5" },
                            { key: "City 6", value: "City 6" },
                            { key: "City 7", value: "City 7" },
                            { key: "City 8", value: "City 8" },
                            { key: "City 9", value: "City 9" },
                            { key: "City 10", value: "City 10" },
                            { key: "City 11", value: "City 11" },
                            { key: "City 12", value: "City 12" },
                            { key: "City 13", value: "City 13" },
                            { key: "City 14", value: "City 14" },
                            { key: "City 15", value: "City 15" },
                        ]}
                        value={selectedCity || ""}
                        onChange={(cityId) => {
                            setSelectedCity(cityId);
                        }}
                        placeholder="Select city"
                        required={false}
                    />

                    {/* Country */}
                    <SearchedDropDown
                        name="country"
                        control={control}
                        label="Country"
                        options={[
                            { key: "Country 1", value: "Country 1" },
                            { key: "Country 2", value: "Country 2" },
                            { key: "Country 3", value: "Country 3" },
                            { key: "Country 4", value: "Country 4" },
                            { key: "Country 5", value: "Country 5" },
                            { key: "Country 6", value: "Country 6" },
                            { key: "Country 7", value: "Country 7" },
                            { key: "Country 8", value: "Country 8" },
                            { key: "Country 9", value: "Country 9" },
                            { key: "Country 10", value: "Country 10" },
                            { key: "Country 11", value: "Country 11" },
                            { key: "Country 12", value: "Country 12" },
                            { key: "Country 13", value: "Country 13" },
                            { key: "Country 14", value: "Country 14" },
                            { key: "Country 15", value: "Country 15" },
                        ]}
                        value={selectedCountry || ""}
                        onChange={(countryId) => {
                            setSelectedCountry(countryId);
                        }}
                        placeholder="Select country"
                        required={false}
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

export default CompanyEditPage;
