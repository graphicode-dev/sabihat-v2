import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import FormInput from "../../../../../components/ui/FormInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import FormButtons from "../../../../../components/form/FormButtons";
import { useNavigate } from "react-router-dom";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";

type Error = {
    numCode?: string;
    code?: string;
    name?: string;
};

type Service = {
    id?: string;
    numCode: string;
    code: string;
    name: string;
    type?: string;
};

const medicalServiceSchema = z.object({
    id: z.string().optional(),
    numCode: z.string(),
    code: z.string(),
    name: z.string(),
    type: z.string().optional(),
});

function UserProfilesAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        numCode: "Please enter num code is required",
        code: "",
        name: "",
    });
    const [selectedService, setSelectedService] = useState<string | null>(null);

    const { control, handleSubmit, reset } = useForm<Service>({
        resolver: zodResolver(medicalServiceSchema),
        defaultValues: {
            numCode: "",
            code: "",
            name: "",
        },

        mode: "onChange",
    });

    const onSubmit = async (formData: Service) => {
        setIsLoading(true);
        try {
            const validatedData = medicalServiceSchema.parse(formData);
            console.log("Validated data:", validatedData);

            // Create data object with the correct field names the API expects
            const serviceData = {
                num_code: validatedData.numCode,
                code: validatedData.code,
                name: validatedData.name,
            };

            console.log("Sending to API:", serviceData);
            addToast({
                message: "Medical service created successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error creating medical service:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.num_code) {
                    mappedErrors.numCode = error.errors.num_code[0];
                }
                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.code) {
                    mappedErrors.code = error.errors.code[0];
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
                <FormFieldsLayout title="User Profiles Add" separator cols="2">
                    {/* Num Code */}
                    <FormInput
                        name="numCode"
                        control={control}
                        label="Num Code"
                        type="text"
                        error={errors.numCode}
                    />

                    <SearchedDropDown
                        name="code"
                        control={control}
                        label="Services"
                        required
                        options={[
                            { key: "Service 1", value: "Service 1" },
                            { key: "Service 2", value: "Service 2" },
                            { key: "Service 3", value: "Service 3" },
                            { key: "Service 4", value: "Service 4" },
                            { key: "Service 5", value: "Service 5" },
                            { key: "Service 6", value: "Service 6" },
                            { key: "Service 7", value: "Service 7" },
                            { key: "Service 8", value: "Service 8" },
                            { key: "Service 9", value: "Service 9" },
                            { key: "Service 10", value: "Service 10" },
                            { key: "Service 11", value: "Service 11" },
                            { key: "Service 12", value: "Service 12" },
                            { key: "Service 13", value: "Service 13" },
                            { key: "Service 14", value: "Service 14" },
                            { key: "Service 15", value: "Service 15" },
                        ]}
                        value={selectedService || ""}
                        onChange={(serviceId) => {
                            setSelectedService(serviceId);
                        }}
                        placeholder="Select service"
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    submitText="add"
                    disabled={!selectedService}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default UserProfilesAddPage;
