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
import { ENDPOINTS } from "../../../../../config/endpoints";

type Port = {
    name: string;
    countryId: string;
    abbreviationCode: string;
};

const portSchema = z.object({
    name: z.string(),
    countryId: z.string(),
    abbreviationCode: z.string(),
});

function PortAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Port>({
        name: "",
        countryId: "",
        abbreviationCode: "",
    });

    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<Port>({
        resolver: zodResolver(portSchema),
        defaultValues: {
            name: "",
            countryId: "",
            abbreviationCode: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Port) => {
        setIsLoading(true);

        const apiFormData = new FormData();

        if (formData.name) {
            apiFormData.append("name", formData.name);
        }
        if (formData.abbreviationCode) {
            apiFormData.append("abbreviationCode", formData.abbreviationCode);
        }
        if (formData.countryId) {
            apiFormData.append("countryId", formData.countryId);
        }

        await ENDPOINTS.port
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Port added successfully",
                    type: "success",
                    title: "Success!",
                });
                reset();
                navigate(-1);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                return setErrors(error);
            });
    };

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Add">
                    {/* name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Port Name"
                        error={errors.name}
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
                        name="countryId"
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
                        error={errors.countryId}
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

export default PortAddPage;
