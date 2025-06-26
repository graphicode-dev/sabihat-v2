import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormInput, FormButtons } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate } from "react-router-dom";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { dirtyFields, logFormData } from "../../../../../lib/utils";

type Promotion = {
    id?: string;
    name: string;
    promotionType: string;
    promotionValue: string;
    fromDate: Date | null;
    toDate: Date | null;
};

const promotionSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    promotionType: z.string(),
    promotionValue: z.string(),
    fromDate: z.date().nullable(),
    toDate: z.date().nullable(),
});

function PromotionEditPage() {
    const fetchedData = {
        id: "",
        name: "name",
        promotionType: "2",
        promotionValue: "promotionValue",
        fromDate: "1/10/2025",
        toDate: "11/1/2025",
    };

    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Promotion>({
        name: "",
        promotionType: "",
        promotionValue: "",
        fromDate: null,
        toDate: null,
    });
    const [selectedPromotionType, setSelectedPromotionType] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<Promotion>({
        resolver: zodResolver(promotionSchema),
        defaultValues: {
            id: fetchedData.id,
            name: fetchedData.name,
            promotionType: fetchedData.promotionType,
            promotionValue: fetchedData.promotionValue,
            fromDate: new Date(fetchedData.fromDate),
            toDate: new Date(fetchedData.toDate),
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Promotion) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (dirtyFields(formState).includes("name") && formData.name)
                apiFormData.append("name", formData.name);
            if (
                dirtyFields(formState).includes("promotionType") &&
                formData.promotionType
            )
                apiFormData.append("promotion_type", formData.promotionType);
            if (
                dirtyFields(formState).includes("promotionValue") &&
                formData.promotionValue
            )
                apiFormData.append("promotion_value", formData.promotionValue);
            if (
                dirtyFields(formState).includes("fromDate") &&
                formData.fromDate
            )
                apiFormData.append("from_date", formData.fromDate.toString());
            if (dirtyFields(formState).includes("toDate") && formData.toDate)
                apiFormData.append("to_date", formData.toDate.toString());

            logFormData(apiFormData);

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Promotion updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            setSelectedPromotionType(null);
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding promotion:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }

                if (error.errors.promotionType) {
                    mappedErrors.promotionType = error.errors.promotionType[0];
                }

                if (error.errors.promotionValue) {
                    mappedErrors.promotionValue =
                        error.errors.promotionValue[0];
                }

                if (error.errors.fromDate) {
                    mappedErrors.fromDate = error.errors.fromDate[0];
                }

                if (error.errors.toDate) {
                    mappedErrors.toDate = error.errors.toDate[0];
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

    useEffect(() => {
        if (fetchedData) {
            reset({
                ...fetchedData,
                fromDate: new Date(fetchedData.fromDate),
                toDate: new Date(fetchedData.toDate),
            });
            setSelectedPromotionType(fetchedData.promotionType);
        }
    }, [reset]);

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Edit" cols="3">
                    {/* name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        type="text"
                        error={errors.name}
                    />

                    {/* promotion_type */}
                    <SearchedDropDown
                        name="promotionType"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedPromotionType}
                        onChange={(value) => {
                            setSelectedPromotionType(value);
                        }}
                        label="Promotion Type"
                    />

                    {/* promotion_value */}
                    <FormInput
                        name="promotionValue"
                        control={control}
                        label="Promotion Value"
                        type="text"
                        error={errors.promotionValue}
                    />

                    {/* from_date */}
                    <FormInput
                        name="fromDate"
                        control={control}
                        label="From Date"
                        type="date"
                    />

                    {/* to_date */}
                    <FormInput
                        name="toDate"
                        control={control}
                        label="To Date"
                        type="date"
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    submitText="Update"
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default PromotionEditPage;
