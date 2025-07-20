import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormLayout from "../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../components/form";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import PageLayout from "../../../../../layout/PageLayout";
import { ENDPOINTS } from "../../../../../config/endpoints";

type MarkUp = {
    businessPartnerId: string;
    partnersClassificationId: string;
    loadTypeId: string;
    loadId: string;
    cabinId: string;
    portFromId: string;
    portToId: string;
    ticketType: string;
    visitType: string;
    markupDiscount: string;
    markupDiscountType: string;
    markupDiscountValue: string;
    effectiveDate: Date | null;
    endDate: Date | null;
};

const markUpSchema = z.object({
    businessPartnerId: z.string(),
    partnersClassificationId: z.string(),
    loadTypeId: z.string(),
    loadId: z.string(),
    cabinId: z.string(),
    portFromId: z.string(),
    portToId: z.string(),
    ticketType: z.string(),
    visitType: z.string(),
    markupDiscount: z.string(),
    markupDiscountType: z.string(),
    markupDiscountValue: z.string(),
    effectiveDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

function MarkUpAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<MarkUp>({
        businessPartnerId: "",
        partnersClassificationId: "",
        loadTypeId: "",
        loadId: "",
        cabinId: "",
        portFromId: "",
        portToId: "",
        ticketType: "",
        visitType: "",
        markupDiscount: "",
        markupDiscountType: "",
        markupDiscountValue: "",
        effectiveDate: null,
        endDate: null,
    });
    const [selectedBusinessPartner, setSelectedBusinessPartner] = useState<
        string | null
    >(null);
    const [
        selectedPartnersClassificationId,
        setSelectedPartnersClassificationId,
    ] = useState<string | null>(null);
    const [selectedLoadTypeId, setSelectedLoadTypeId] = useState<string | null>(
        null
    );
    const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
    const [selectedCabinId, setSelectedCabinId] = useState<string | null>(null);
    const [selectedPortFromId, setSelectedPortFromId] = useState<string | null>(
        null
    );
    const [selectedPortToId, setSelectedPortToId] = useState<string | null>(
        null
    );
    const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
        null
    );
    const [selectedVisitType, setSelectedVisitType] = useState<string | null>(
        null
    );
    const [selectedMarkupDiscountType, setSelectedMarkupDiscountType] =
        useState<string | null>(null);

    const { control, handleSubmit, reset, formState } = useForm<MarkUp>({
        resolver: zodResolver(markUpSchema),
        defaultValues: {
            businessPartnerId: "",
            partnersClassificationId: "",
            loadTypeId: "",
            loadId: "",
            cabinId: "",
            portFromId: "",
            portToId: "",
            ticketType: "",
            visitType: "",
            markupDiscount: "",
            markupDiscountType: "",
            markupDiscountValue: "",
            effectiveDate: null,
            endDate: null,
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: MarkUp) => {
        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("businessPartnerId", formData.businessPartnerId);
        apiFormData.append(
            "partnersClassificationId",
            formData.partnersClassificationId
        );
        apiFormData.append("loadTypeId", formData.loadTypeId);
        apiFormData.append("loadId", formData.loadId);
        apiFormData.append("cabinId", formData.cabinId);
        apiFormData.append("portFromId", formData.portFromId);
        apiFormData.append("portToId", formData.portToId);
        apiFormData.append("ticketType", formData.ticketType);
        apiFormData.append("visitType", formData.visitType);
        apiFormData.append("markupDiscount", formData.markupDiscount);
        apiFormData.append("markupDiscountType", formData.markupDiscountType);
        apiFormData.append("markupDiscountValue", formData.markupDiscountValue);
        apiFormData.append(
            "effectiveDate",
            formData.effectiveDate?.toISOString() as string
        );
        apiFormData.append(
            "endDate",
            formData.endDate?.toISOString() as string
        );

        await ENDPOINTS.markupDiscounts
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Markup Discount added successfully",
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
                <FormFieldsLayout>
                    {/* businessPartnerId */}
                    <SearchedDropDown
                        name="businessPartnerId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedBusinessPartner}
                        onChange={(value) => {
                            setSelectedBusinessPartner(value);
                        }}
                        label="Business Partner"
                        error={errors.businessPartnerId}
                    />
                    {/* partnersClassificationId */}
                    <SearchedDropDown
                        name="partnersClassificationId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedPartnersClassificationId}
                        onChange={(value) => {
                            setSelectedPartnersClassificationId(value);
                        }}
                        label="Partners Classification"
                        error={errors.partnersClassificationId}
                    />
                    {/* loadTypeId */}
                    <SearchedDropDown
                        name="loadTypeId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedLoadTypeId}
                        onChange={(value) => {
                            setSelectedLoadTypeId(value);
                        }}
                        label="Load Type"
                        error={errors.loadTypeId}
                    />
                    {/* loadId */}
                    <SearchedDropDown
                        name="loadId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedLoadId}
                        onChange={(value) => {
                            setSelectedLoadId(value);
                        }}
                        label="Load"
                        error={errors.loadId}
                    />
                    {/* cabinId */}
                    <SearchedDropDown
                        name="cabinId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedCabinId}
                        onChange={(value) => {
                            setSelectedCabinId(value);
                        }}
                        label="Cabin"
                        error={errors.cabinId}
                    />
                    {/* portFromId */}
                    <SearchedDropDown
                        name="portFromId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedPortFromId}
                        onChange={(value) => {
                            setSelectedPortFromId(value);
                        }}
                        label="Port From"
                        error={errors.portFromId}
                    />
                    {/* portToId  */}
                    <SearchedDropDown
                        name="portToId"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedPortToId}
                        onChange={(value) => {
                            setSelectedPortToId(value);
                        }}
                        label="Port To"
                        error={errors.portToId}
                    />
                    {/* ticketType */}
                    <SearchedDropDown
                        name="ticketType"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedTicketType}
                        onChange={(value) => {
                            setSelectedTicketType(value);
                        }}
                        label="Ticket Type"
                        error={errors.ticketType}
                    />
                    {/* visitType */}
                    <SearchedDropDown
                        name="visitType"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedVisitType}
                        onChange={(value) => {
                            setSelectedVisitType(value);
                        }}
                        label="Visit Type"
                        error={errors.visitType}
                    />
                    {/* markupDiscount */}
                    <FormInput
                        name="markupDiscount"
                        control={control}
                        label="Markup Discount"
                        type="number"
                        error={errors.markupDiscount}
                    />
                    {/* markupDiscountType */}
                    <SearchedDropDown
                        name="markupDiscountType"
                        control={control}
                        options={[
                            { key: "1", value: "1" },
                            { key: "2", value: "2" },
                            { key: "3", value: "3" },
                            { key: "4", value: "4" },
                            { key: "5", value: "5" },
                        ]}
                        value={selectedMarkupDiscountType}
                        onChange={(value) => {
                            setSelectedMarkupDiscountType(value);
                        }}
                        label="Markup Discount Type"
                        error={errors.markupDiscountType}
                    />
                    {/* markupDiscountValue  */}
                    <FormInput
                        name="markupDiscountValue"
                        control={control}
                        label="Markup Discount Value"
                        type="number"
                        error={errors.markupDiscountValue}
                    />
                    {/* effectiveDate */}
                    <FormInput
                        name="effectiveDate"
                        control={control}
                        label="Effective Date"
                        type="date"
                        error={errors.effectiveDate?.toString()}
                    />
                    {/* endDate */}
                    <FormInput
                        name="endDate"
                        control={control}
                        label="End Date"
                        type="date"
                        error={errors.endDate?.toString()}
                    />
                </FormFieldsLayout>
                <FormButtons
                    isLoading={isLoading}
                    submitText="Add"
                    disabled={!formState.isDirty}
                    cancelText="Cancel"
                />
            </FormLayout>
        </PageLayout>
    );
}

export default MarkUpAddPage;
