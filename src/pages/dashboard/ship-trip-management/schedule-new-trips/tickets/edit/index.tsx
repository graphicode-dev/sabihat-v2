import { z } from "zod";
import { useToast } from "../../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLayout from "../../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../../components/form";
import PageLayout from "../../../../../../layout/PageLayout";

type Ticket = {
    id?: string;
    name: string;
    passportID: string;
};

const ticketAgentSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    passportID: z.string(),
});
function TicketEdit() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Ticket>({
        name: "",
        passportID: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<Ticket>({
        resolver: zodResolver(ticketAgentSchema),
        defaultValues: {
            id: "",
            name: "",
            passportID: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Ticket) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.name) {
                apiFormData.append("name", formData.name);
            }
            if (formData.passportID) {
                apiFormData.append("passportID", formData.passportID);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Ticket edited successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error editing ticket:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.passportID) {
                    mappedErrors.passportID = error.errors.passportID[0];
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
                    {/* Name */}
                    <FormInput
                        name="name"
                        label="Name"
                        control={control}
                        type="text"
                        error={errors.name}
                    />

                    {/* Passport ID */}
                    <FormInput
                        name="passportID"
                        label="Passport/ID"
                        control={control}
                        type="text"
                        error={errors.passportID}
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

export default TicketEdit;
