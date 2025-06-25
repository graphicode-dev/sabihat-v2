import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { FormButtons } from "../../../../../components/form";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";

type ChartOfAccount = {
    trip: string;
};

const chartOfDescriptionSchema = z.object({
    trip: z.string(),
});

function CargoCheckInAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<ChartOfAccount>(
        {
            resolver: zodResolver(chartOfDescriptionSchema),
            defaultValues: {
                trip: "",
            },
            mode: "onChange",
        }
    );

    const onSubmit = async (formData: ChartOfAccount) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.trip) {
                apiFormData.append("trip", formData.trip);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Chart of Account updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Chart of Account:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.trip) {
                    mappedErrors.trip = error.errors.trip[0];
                }

                console.log("Mapped errors:", mappedErrors);
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
                <FormFieldsLayout>
                    {/* Ledger Type */}
                    <SearchedDropDown
                        name="trip"
                        control={control}
                        label="Choose Trip"
                        options={[
                            { value: "Trip 1", key: "Trip 1" },
                            { value: "Trip 2", key: "Trip 2" },
                            { value: "Trip 3", key: "Trip 3" },
                            { value: "Trip 4", key: "Trip 4" },
                            { value: "Trip 5", key: "Trip 5" },
                        ]}
                        value={selectedTrip}
                        onChange={(value) => setSelectedTrip(value)}
                        placeholder="Choose Trip"
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

export default CargoCheckInAddPage;
