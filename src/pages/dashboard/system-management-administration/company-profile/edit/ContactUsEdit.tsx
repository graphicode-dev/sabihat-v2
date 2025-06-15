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

type Error = {
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    snapchat?: string;
    email?: string;
    hotLine?: string;
    phone?: string;
};

type ContactUS = {
    id?: string;
    facebook?: string;
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    snapchat?: string;
    email?: string;
    hotLine?: string;
    phone?: string;
};

const contactSchema = z.object({
    id: z.string().optional(),
    facebook: z.string().optional(),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    snapchat: z.string().optional(),
    email: z.string().optional(),
    hotLine: z.string().optional(),
    phone: z.string().optional(),
});

function ContactUsEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<Error>>({
        facebook: "",
        whatsapp: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        snapchat: "",
        email: "",
        hotLine: "",
        phone: "",
    });

    const { control, handleSubmit, reset, formState } = useForm<ContactUS>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            id: "",
            facebook: "",
            whatsapp: "",
            instagram: "",
            linkedin: "",
            twitter: "",
            snapchat: "",
            email: "",
            hotLine: "",
            phone: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: ContactUS) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.facebook) {
                apiFormData.append("facebook", formData.facebook);
            }
            if (formData.whatsapp) {
                apiFormData.append("whatsapp", formData.whatsapp);
            }
            if (formData.instagram) {
                apiFormData.append("instagram", formData.instagram);
            }
            if (formData.linkedin) {
                apiFormData.append("linkedin", formData.linkedin);
            }
            if (formData.twitter) {
                apiFormData.append("twitter", formData.twitter);
            }
            if (formData.snapchat) {
                apiFormData.append("snapchat", formData.snapchat);
            }
            if (formData.email) {
                apiFormData.append("email", formData.email);
            }
            if (formData.hotLine) {
                apiFormData.append("hotLine", formData.hotLine);
            }
            if (formData.phone) {
                apiFormData.append("phone", formData.phone);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Contact us updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating contact us:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.facebook) {
                    mappedErrors.facebook = error.errors.facebook[0];
                }
                if (error.errors.whatsapp) {
                    mappedErrors.whatsapp = error.errors.whatsapp[0];
                }
                if (error.errors.instagram) {
                    mappedErrors.instagram = error.errors.instagram[0];
                }
                if (error.errors.linkedin) {
                    mappedErrors.linkedin = error.errors.linkedin[0];
                }
                if (error.errors.twitter) {
                    mappedErrors.twitter = error.errors.twitter[0];
                }
                if (error.errors.snapchat) {
                    mappedErrors.snapchat = error.errors.snapchat[0];
                }
                if (error.errors.email) {
                    mappedErrors.email = error.errors.email[0];
                }
                if (error.errors.hotLine) {
                    mappedErrors.hotLine = error.errors.hotLine[0];
                }
                if (error.errors.phone) {
                    mappedErrors.phone = error.errors.phone[0];
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
                    {/* facebook */}
                    <FormInput
                        name="facebook"
                        control={control}
                        label="Facebook"
                        type="text"
                        error={errors.facebook}
                    />

                    {/* whatsapp */}
                    <FormInput
                        name="whatsapp"
                        control={control}
                        label="Whatsapp"
                        type="text"
                        error={errors.whatsapp}
                    />

                    {/* instagram */}
                    <FormInput
                        name="instagram"
                        control={control}
                        label="Instagram"
                        type="text"
                        error={errors.instagram}
                    />

                    {/* linkedin */}
                    <FormInput
                        name="linkedin"
                        control={control}
                        label="Linkedin"
                        type="text"
                        error={errors.linkedin}
                    />

                    {/* twitter */}
                    <FormInput
                        name="twitter"
                        control={control}
                        label="Twitter"
                        type="text"
                        error={errors.twitter}
                    />

                    {/* snapchat */}
                    <FormInput
                        name="snapchat"
                        control={control}
                        label="Snapchat"
                        type="text"
                        error={errors.snapchat}
                    />

                    {/* email */}
                    <FormInput
                        name="email"
                        control={control}
                        label="Email"
                        type="email"
                        error={errors.email}
                    />

                    {/* hotLine */}
                    <FormInput
                        name="hotLine"
                        control={control}
                        label="HotLine"
                        type="text"
                        error={errors.hotLine}
                    />

                    {/* phone */}
                    <FormInput
                        name="phone"
                        control={control}
                        label="Phone"
                        type="text"
                        error={errors.phone}
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

export default ContactUsEditPage;
