import { FormInput } from "../../form";
import { FormButtons } from "../../form";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import { SearchedDropDown } from "../../SearchedDropDown";
import FormLayout from "../../../layout/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../hooks/useToast";
import { z } from "zod";

type Error = {
    name: string;
    phone: string;
    address: string;
    layer: string;
    image: string;
};

type PartnersMaster = {
    id?: string;
    name: string;
    phone: string;
    address: string;
    layer: string;
    image: File | null;
};

const partnersMasterSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    layer: z.string(),
    image: z.instanceof(File).nullable(),
});

function PartnersMasterAddForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        name: "",
        phone: "",
        address: "",
        layer: "",
        image: "",
    });
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<PartnersMaster>(
        {
            resolver: zodResolver(partnersMasterSchema),
            defaultValues: {
                id: "",
                name: "",
                phone: "",
                address: "",
                layer: "",
                image: null,
            },
            mode: "onChange",
        }
    );

    const onSubmit = async (formData: PartnersMaster) => {
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
            if (formData.layer) {
                apiFormData.append("layer", formData.layer);
            }
            if (formData.image instanceof File) {
                apiFormData.append("image", formData.image);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "About us updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error updating about us:", error);
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
                if (error.errors.layer) {
                    mappedErrors.layer = error.errors.layer[0];
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
                    error={errors.name}
                />

                {/* Phone */}
                <FormInput
                    name="phone"
                    control={control}
                    label="Phone"
                    error={errors.phone}
                />

                {/* Address */}
                <FormInput
                    name="address"
                    control={control}
                    label="Address"
                    error={errors.address}
                />

                {/* Layer */}
                <SearchedDropDown
                    name="layer"
                    control={control}
                    label="Layer"
                    options={[
                        { key: "1", value: "Layer 1" },
                        { key: "2", value: "Layer 2" },
                        { key: "3", value: "Layer 3" },
                        { key: "4", value: "Layer 4" },
                        { key: "5", value: "Layer 5" },
                    ]}
                    value={selectedLayer}
                    onChange={(value) => {
                        setSelectedLayer(value);
                    }}
                    placeholder="Select Layer"
                />
            </FormFieldsLayout>
            <FormFieldsLayout>
                {/* image */}
                <FormInput
                    name="image"
                    control={control}
                    type="file"
                    fileLabel="Image"
                    error={errors.image}
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isLoading}
                disabled={!formState.isDirty}
                cancelText="Cancel"
                className="mt-4"
                // Add explicit onCancel handler to ensure navigation works
            />
        </FormLayout>
    );
}

export default PartnersMasterAddForm;
