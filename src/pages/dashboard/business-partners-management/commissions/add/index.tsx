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

type Commissions = {
    id?: string;
    partnerLayer: string;
    partner: string;
    class: string;
    servicesType: string;
    passengerType: string;
    ticketType: string;
    cabin: string;
    portFrom: string;
    portTo: string;
    visitType: string;
    commissionType: string;
    commissionValue: string;
    effectiveDate: string;
    endDate: string;
};

const commissionsSchema = z.object({
    id: z.string().optional(),
    partnerLayer: z.string(),
    partner: z.string(),
    class: z.string(),
    servicesType: z.string(),
    passengerType: z.string(),
    ticketType: z.string(),
    cabin: z.string(),
    portFrom: z.string(),
    portTo: z.string(),
    visitType: z.string(),
    commissionType: z.string(),
    commissionValue: z.string(),
    effectiveDate: z.string(),
    endDate: z.string(),
});

function CommissionsAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Commissions>({
        partnerLayer: "",
        partner: "",
        class: "",
        servicesType: "",
        passengerType: "",
        ticketType: "",
        cabin: "",
        portFrom: "",
        portTo: "",
        visitType: "",
        commissionType: "",
        commissionValue: "",
        effectiveDate: "",
        endDate: "",
    });
    const [selectedPartnerLayer, setSelectedPartnerLayer] = useState<
        string | null
    >(null);
    const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [selectedServicesType, setSelectedServicesType] = useState<
        string | null
    >(null);
    const [selectedPassengerType, setSelectedPassengerType] = useState<
        string | null
    >(null);
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
            id: "",
            partnerLayer: "",
            partner: "",
            class: "",
            servicesType: "",
            passengerType: "",
            ticketType: "",
            cabin: "",
            portFrom: "",
            portTo: "",
            visitType: "",
            commissionType: "",
            commissionValue: "",
            effectiveDate: "",
            endDate: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Commissions) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.partnerLayer) {
                apiFormData.append("partnerLayer", formData.partnerLayer);
            }
            if (formData.partner) {
                apiFormData.append("partner", formData.partner);
            }
            if (formData.class) {
                apiFormData.append("class", formData.class);
            }
            if (formData.servicesType) {
                apiFormData.append("servicesType", formData.servicesType);
            }
            if (formData.passengerType) {
                apiFormData.append("passengerType", formData.passengerType);
            }
            if (formData.ticketType) {
                apiFormData.append("ticketType", formData.ticketType);
            }
            if (formData.cabin) {
                apiFormData.append("cabin", formData.cabin);
            }
            if (formData.portFrom) {
                apiFormData.append("portFrom", formData.portFrom);
            }
            if (formData.portTo) {
                apiFormData.append("portTo", formData.portTo);
            }
            if (formData.visitType) {
                apiFormData.append("visitType", formData.visitType);
            }
            if (formData.commissionType) {
                apiFormData.append("commissionType", formData.commissionType);
            }
            if (formData.commissionValue) {
                apiFormData.append("commissionValue", formData.commissionValue);
            }
            if (formData.effectiveDate) {
                apiFormData.append("effectiveDate", formData.effectiveDate);
            }
            if (formData.endDate) {
                apiFormData.append("endDate", formData.endDate);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Commission added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding commission:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.partnerLayer) {
                    mappedErrors.partnerLayer = error.errors.partnerLayer[0];
                }
                if (error.errors.partner) {
                    mappedErrors.partner = error.errors.partner[0];
                }
                if (error.errors.class) {
                    mappedErrors.class = error.errors.class[0];
                }
                if (error.errors.servicesType) {
                    mappedErrors.servicesType = error.errors.servicesType[0];
                }
                if (error.errors.passengerType) {
                    mappedErrors.passengerType = error.errors.passengerType[0];
                }
                if (error.errors.ticketType) {
                    mappedErrors.ticketType = error.errors.ticketType[0];
                }
                if (error.errors.cabin) {
                    mappedErrors.cabin = error.errors.cabin[0];
                }
                if (error.errors.portFrom) {
                    mappedErrors.portFrom = error.errors.portFrom[0];
                }
                if (error.errors.portTo) {
                    mappedErrors.portTo = error.errors.portTo[0];
                }
                if (error.errors.visitType) {
                    mappedErrors.visitType = error.errors.visitType[0];
                }
                if (error.errors.commissionType) {
                    mappedErrors.commissionType =
                        error.errors.commissionType[0];
                }
                if (error.errors.commissionValue) {
                    mappedErrors.commissionValue =
                        error.errors.commissionValue[0];
                }
                if (error.errors.effectiveDate) {
                    mappedErrors.effectiveDate = error.errors.effectiveDate[0];
                }
                if (error.errors.endDate) {
                    mappedErrors.endDate = error.errors.endDate[0];
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
                <FormFieldsLayout>
                    {/* Partner Layer */}
                    <SearchedDropDown
                        name="partnerLayer"
                        control={control}
                        label="Partner Layer"
                        options={[
                            {
                                key: "1",
                                value: "Layer 1",
                            },
                            {
                                key: "2",
                                value: "Layer 2",
                            },
                            {
                                key: "3",
                                value: "Layer 3",
                            },
                            {
                                key: "4",
                                value: "Layer 4",
                            },
                            {
                                key: "5",
                                value: "Layer 5",
                            },
                        ]}
                        value={selectedPartnerLayer}
                        onChange={(value) => {
                            setSelectedPartnerLayer(value);
                        }}
                        placeholder="Select Partner Layer"
                    />

                    {/* Partner */}
                    <SearchedDropDown
                        name="partner"
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
                    />

                    {/* Class */}
                    <SearchedDropDown
                        name="class"
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
                    />

                    {/* Services Type */}
                    <SearchedDropDown
                        name="servicesType"
                        control={control}
                        label="Services Type"
                        options={[
                            { key: "1", value: "Services Type 1" },
                            { key: "2", value: "Services Type 2" },
                            { key: "3", value: "Services Type 3" },
                            { key: "4", value: "Services Type 4" },
                            { key: "5", value: "Services Type 5" },
                        ]}
                        value={selectedServicesType}
                        onChange={(value) => {
                            setSelectedServicesType(value);
                        }}
                        placeholder="Select Services Type"
                    />

                    {/* Passenger Type */}
                    <SearchedDropDown
                        name="passengerType"
                        control={control}
                        label="Passenger Type"
                        options={[
                            { key: "1", value: "Passenger Type 1" },
                            { key: "2", value: "Passenger Type 2" },
                            { key: "3", value: "Passenger Type 3" },
                            { key: "4", value: "Passenger Type 4" },
                            { key: "5", value: "Passenger Type 5" },
                        ]}
                        value={selectedPassengerType}
                        onChange={(value) => {
                            setSelectedPassengerType(value);
                        }}
                        placeholder="Select Passenger Type"
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
                    />

                    {/* Cabin */}
                    <SearchedDropDown
                        name="cabin"
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
                    />

                    {/* Port From */}
                    <SearchedDropDown
                        name="portFrom"
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
                    />

                    {/* portTo */}
                    <SearchedDropDown
                        name="portTo"
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
                    />

                    {/* effectiveDate */}
                    <FormInput
                        name="effectiveDate"
                        control={control}
                        label="Effective Date"
                        placeholder="Enter Effective Date"
                        type="date"
                        error={errors.effectiveDate}
                    />

                    {/* endDate */}
                    <FormInput
                        name="endDate"
                        control={control}
                        label="End Date"
                        placeholder="Enter End Date"
                        type="date"
                        error={errors.endDate}
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
