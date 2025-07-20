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

type Commissions = {
    businessPartnerId: string;
    partnersClassificationId: string;
    loadTypeId: string;
    loadId: string;
    cabinId: string;
    portFromId: string;
    portToId: string;
    ticketType: string;
    visitType: string;
    commissionType: string;
    commissionValue: string;
    effectiveDate: Date | null;
    endDate: Date | null;
};

const commissionsSchema = z.object({
    businessPartnerId: z.string(),
    partnersClassificationId: z.string(),
    loadTypeId: z.string(),
    loadId: z.string(),
    cabinId: z.string(),
    portFromId: z.string(),
    portToId: z.string(),
    ticketType: z.string(),
    visitType: z.string(),
    commissionType: z.string(),
    commissionValue: z.string(),
    effectiveDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

function CommissionsAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Commissions>({
        businessPartnerId: "",
        partnersClassificationId: "",
        loadTypeId: "",
        loadId: "",
        cabinId: "",
        portFromId: "",
        portToId: "",
        ticketType: "",
        visitType: "",
        commissionType: "",
        commissionValue: "",
        effectiveDate: null,
        endDate: null,
    });
    const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
        null
    );
    const [selectedCabin, setSelectedCabin] = useState<string | null>(null);
    const [selectedPortFrom, setSelectedPortFrom] = useState<string | null>(
        null
    );
    const [selectedPortTo, setSelectedPortTo] = useState<string | null>(null);
    const [selectedVisitType, setSelectedVisitType] = useState<string | null>(
        null
    );
    const [selectedCommissionType, setSelectedCommissionType] = useState<
        string | null
    >(null);
    const [selectedCommissionValue, setSelectedCommissionValue] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<Commissions>({
        resolver: zodResolver(commissionsSchema),
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
            commissionType: "",
            commissionValue: "",
            effectiveDate: null,
            endDate: null,
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Commissions) => {
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
        apiFormData.append("commissionType", formData.commissionType);
        apiFormData.append("commissionValue", formData.commissionValue);
        apiFormData.append(
            "effectiveDate",
            formData.effectiveDate?.toISOString() as string
        );
        apiFormData.append(
            "endDate",
            formData.endDate?.toISOString() as string
        );

        await ENDPOINTS.commissions
            .add(apiFormData)
            .then(() => {
                addToast({
                    message: "Commission added successfully",
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
                    {/* Partner */}
                    <SearchedDropDown
                        name="businessPartnerId"
                        control={control}
                        label="Partner"
                        options={[
                            { key: "1", value: "Partner 1" },
                            { key: "2", value: "Partner 2" },
                            { key: "3", value: "Partner 3" },
                            { key: "4", value: "Partner 4" },
                            { key: "5", value: "Partner 5" },
                        ]}
                        value={selectedPartner}
                        onChange={(value) => {
                            setSelectedPartner(value);
                        }}
                        placeholder="Select Partner"
                        error={errors.businessPartnerId}
                    />
                    {/* Class */}
                    <SearchedDropDown
                        name="partnersClassificationId"
                        control={control}
                        label="Class"
                        options={[
                            { key: "1", value: "Class 1" },
                            { key: "2", value: "Class 2" },
                            { key: "3", value: "Class 3" },
                            { key: "4", value: "Class 4" },
                            { key: "5", value: "Class 5" },
                        ]}
                        value={selectedClass}
                        onChange={(value) => {
                            setSelectedClass(value);
                        }}
                        placeholder="Select Class"
                        error={errors.partnersClassificationId}
                    />
                    {/* Ticket Type */}
                    <SearchedDropDown
                        name="ticketType"
                        control={control}
                        label="Ticket Type"
                        options={[
                            { key: "1", value: "Ticket Type 1" },
                            { key: "2", value: "Ticket Type 2" },
                            { key: "3", value: "Ticket Type 3" },
                            { key: "4", value: "Ticket Type 4" },
                            { key: "5", value: "Ticket Type 5" },
                        ]}
                        value={selectedTicketType}
                        onChange={(value) => {
                            setSelectedTicketType(value);
                        }}
                        placeholder="Select Ticket Type"
                        error={errors.ticketType}
                    />
                    {/* Cabin */}
                    <SearchedDropDown
                        name="cabinId"
                        control={control}
                        label="Cabin"
                        options={[
                            { key: "1", value: "Cabin 1" },
                            { key: "2", value: "Cabin 2" },
                            { key: "3", value: "Cabin 3" },
                            { key: "4", value: "Cabin 4" },
                            { key: "5", value: "Cabin 5" },
                        ]}
                        value={selectedCabin}
                        onChange={(value) => {
                            setSelectedCabin(value);
                        }}
                        placeholder="Select Cabin"
                        error={errors.cabinId}
                    />
                    {/* Port From */}
                    <SearchedDropDown
                        name="portFromId"
                        control={control}
                        label="Port From"
                        options={[
                            { key: "1", value: "Port From 1" },
                            { key: "2", value: "Port From 2" },
                            { key: "3", value: "Port From 3" },
                            { key: "4", value: "Port From 4" },
                            { key: "5", value: "Port From 5" },
                        ]}
                        value={selectedPortFrom}
                        onChange={(value) => {
                            setSelectedPortFrom(value);
                        }}
                        placeholder="Select Port From"
                        error={errors.portFromId}
                    />
                    {/* portTo */}
                    <SearchedDropDown
                        name="portToId"
                        control={control}
                        label="Port To"
                        options={[
                            { key: "1", value: "Port To 1" },
                            { key: "2", value: "Port To 2" },
                            { key: "3", value: "Port To 3" },
                            { key: "4", value: "Port To 4" },
                            { key: "5", value: "Port To 5" },
                        ]}
                        value={selectedPortTo}
                        onChange={(value) => {
                            setSelectedPortTo(value);
                        }}
                        placeholder="Select Port To"
                        error={errors.portToId}
                    />
                    {/* visitType */}
                    <SearchedDropDown
                        name="visitType"
                        control={control}
                        label="Visit Type"
                        options={[
                            { key: "1", value: "Visit Type 1" },
                            { key: "2", value: "Visit Type 2" },
                            { key: "3", value: "Visit Type 3" },
                            { key: "4", value: "Visit Type 4" },
                            { key: "5", value: "Visit Type 5" },
                        ]}
                        value={selectedVisitType}
                        onChange={(value) => {
                            setSelectedVisitType(value);
                        }}
                        placeholder="Select Visit Type"
                        error={errors.visitType}
                    />
                    {/* commissionType */}
                    <SearchedDropDown
                        name="commissionType"
                        control={control}
                        label="Commission Type"
                        options={[
                            { key: "1", value: "Commission Type 1" },
                            { key: "2", value: "Commission Type 2" },
                            { key: "3", value: "Commission Type 3" },
                            { key: "4", value: "Commission Type 4" },
                            { key: "5", value: "Commission Type 5" },
                        ]}
                        value={selectedCommissionType}
                        onChange={(value) => {
                            setSelectedCommissionType(value);
                        }}
                        placeholder="Select Commission Type"
                        error={errors.commissionType}
                    />
                    {/* commissionValue */}
                    <SearchedDropDown
                        name="commissionValue"
                        control={control}
                        label="Commission Value"
                        options={[
                            { key: "1", value: "Commission Value 1" },
                            { key: "2", value: "Commission Value 2" },
                            { key: "3", value: "Commission Value 3" },
                            { key: "4", value: "Commission Value 4" },
                            { key: "5", value: "Commission Value 5" },
                        ]}
                        value={selectedCommissionValue}
                        onChange={(value) => {
                            setSelectedCommissionValue(value);
                        }}
                        placeholder="Select Commission Value"
                        error={errors.commissionValue}
                    />
                    {/* effectiveDate */}
                    <FormInput
                        name="effectiveDate"
                        control={control}
                        label="Effective Date"
                        placeholder="Enter Effective Date"
                        type="date"
                        error={errors.effectiveDate?.toString()}
                    />
                    {/* endDate */}
                    <FormInput
                        name="endDate"
                        control={control}
                        label="End Date"
                        placeholder="Enter End Date"
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

export default CommissionsAddPage;
