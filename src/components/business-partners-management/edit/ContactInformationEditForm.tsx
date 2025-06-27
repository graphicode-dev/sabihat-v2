import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { z } from "zod";

type Error = {
    name: string;
    title: string;
    phone: string;
    email: string;
    hotline: string;
};

type ContactInformation = {
    id?: string;
    name: string;
    title: string;
    phone: string;
    email: string;
    hotline: string;
};

const contactInformationSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    title: z.string(),
    phone: z.string(),
    email: z.string(),
    hotline: z.string(),
});
function ContactInformationEditForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        name: "",
        title: "",
        phone: "",
        email: "",
        hotline: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<ContactInformation>({
            resolver: zodResolver(contactInformationSchema),
            defaultValues: {
                id: "",
                name: "",
                title: "",
                phone: "",
                email: "",
                hotline: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: ContactInformation) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.name) {
                apiFormData.append("name", formData.name);
            }
            if (formData.title) {
                apiFormData.append("title", formData.title);
            }
            if (formData.phone) {
                apiFormData.append("phone", formData.phone);
            }
            if (formData.email) {
                apiFormData.append("email", formData.email);
            }
            if (formData.hotline) {
                apiFormData.append("hotline", formData.hotline);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Contact Information updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating Contact Information:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.title) {
                    mappedErrors.title = error.errors.title[0];
                }
                if (error.errors.phone) {
                    mappedErrors.phone = error.errors.phone[0];
                }
                if (error.errors.email) {
                    mappedErrors.email = error.errors.email[0];
                }
                if (error.errors.hotline) {
                    mappedErrors.hotline = error.errors.hotline[0];
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
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormFieldsLayout>
                {/* Name */}
                <FormInput
                    name="name"
                    control={control}
                    label="Name"
                    error={errors.name}
                />

                {/* Title */}
                <FormInput
                    name="title"
                    control={control}
                    label="Title"
                    error={errors.title}
                />

                {/* Phone */}
                <FormInput
                    name="phone"
                    control={control}
                    label="Phone"
                    error={errors.phone}
                />

                {/* Email */}
                <FormInput
                    name="email"
                    control={control}
                    label="Email"
                    error={errors.email}
                />

                {/* Hotline */}
                <FormInput
                    name="hotline"
                    control={control}
                    label="Hotline"
                    error={errors.hotline}
                />
            </FormFieldsLayout>

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default ContactInformationEditForm;
