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
import { logFormData } from "../../../../../utils";
import { formatDate } from "../../../../../components/ui/Calendar";
import { ENDPOINTS } from "../../../../../config/endpoints";

type Promotion = {
    name: string;
    type: string;
    value: string;
    fromDate: Date;
    toDate: Date;
};
type PromotionError = {
    name: string;
    type: string;
    value: string;
    fromDate: string;
    toDate: string;
};

const promotionSchema = z.object({
    name: z.string(),
    type: z.string(),
    value: z.string(),
    fromDate: z.date(),
    toDate: z.date(),
});

function PromotionAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PromotionError>({
        name: "",
        type: "",
        value: "",
        fromDate: "",
        toDate: "",
    });
    const [selectedPromotionType, setSelectedPromotionType] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<Promotion>({
        resolver: zodResolver(promotionSchema),
        defaultValues: {
            name: "",
            type: "",
            value: "",
            fromDate: new Date(),
            toDate: new Date(),
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Promotion) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("name", formData.name);
        apiFormData.append("type", formData.type);
        apiFormData.append("value", formData.value);

        // Format dates using the centralized utility
        const formattedFromDate = formatDate.apiFormat(formData.fromDate);
        const formattedToDate = formatDate.apiFormat(formData.toDate);

        apiFormData.append("fromDate", formattedFromDate);
        apiFormData.append("toDate", formattedToDate);

        logFormData(apiFormData);

        await ENDPOINTS.promotion
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Promotion added successfully",
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
                <FormFieldsLayout title="Add" cols="3">
                    {/* name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        type="text"
                        error={errors.name}
                    />

                    {/* promotion type */}
                    <SearchedDropDown
                        name="type"
                        control={control}
                        options={[
                            { key: "fixed", value: "fixed" },
                            { key: "percentage", value: "percentage" },
                        ]}
                        value={selectedPromotionType}
                        onChange={(value) => {
                            setSelectedPromotionType(value);
                        }}
                        label="Promotion Type"
                    />

                    {/* promotion value */}
                    <FormInput
                        name="value"
                        control={control}
                        label="Promotion Value"
                        type="number"
                        error={errors.value}
                    />

                    {/* from date */}
                    <FormInput
                        name="fromDate"
                        control={control}
                        label="From Date"
                        type="date"
                        error={errors.fromDate}
                    />

                    {/* to date */}
                    <FormInput
                        name="toDate"
                        control={control}
                        label="To Date"
                        type="date"
                        error={errors.toDate}
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

export default PromotionAddPage;
