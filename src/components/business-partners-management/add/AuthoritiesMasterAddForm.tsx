import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../../hooks/useToast";
import FormLayout from "../../../layout/FormLayout";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../form";

type Error = {
    name: string;
    phone: string;
    address: string;
    image: string;
};

type AuthoritiesMaster = {
    id?: string;
    name: string;
    phone: string;
    address: string;
    image: File | null;
};

const authoritiesMasterSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    image: z.instanceof(File).nullable(),
});

function AuthoritiesMasterEditForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        name: "",
        phone: "",
        address: "",
        image: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<AuthoritiesMaster>({
            resolver: zodResolver(authoritiesMasterSchema),
            defaultValues: {
                id: "",
                name: "",
                phone: "",
                address: "",
                image: null,
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: AuthoritiesMaster) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.name) {
                apiFormData.append("name", formData.name);
            }
            if (formData.phone) {
                apiFormData.append("phone", formData.phone);
            }
            if (formData.address) {
                apiFormData.append("address", formData.address);
            }
            if (formData.image instanceof File) {
                apiFormData.append("image", formData.image);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Authorities Master added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding authorities master:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.phone) {
                    mappedErrors.phone = error.errors.phone[0];
                }
                if (error.errors.address) {
                    mappedErrors.address = error.errors.address[0];
                }
                if (error.errors.image) {
                    mappedErrors.image = error.errors.image[0];
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
                    placeholder="Enter Name"
                    error={errors.name}
                />

                {/* Phone */}
                <FormInput
                    name="phone"
                    control={control}
                    label="Phone"
                    type="tel"
                    placeholder="Enter Phone"
                    error={errors.phone}
                />

                {/* Address */}
                <FormInput
                    name="address"
                    control={control}
                    label="Address"
                    placeholder="Enter Address"
                    error={errors.address}
                />

                {/* Image */}
                <FormInput
                    name="image"
                    control={control}
                    error={errors.image}
                    type="file"
                    placeholder="Image"
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isLoading}
                submitText="Add"
                disabled={!formState.isDirty}
                cancelText="Cancel"
            />
        </FormLayout>
    );
}

export default AuthoritiesMasterEditForm;
