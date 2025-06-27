import { z } from "zod";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import FormLayout from "../../../layout/FormLayout";
import { FormButtons, FormInput } from "../../form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SearchedDropDown } from "../../SearchedDropDown";

type TripInformation = {
    id?: string;
    vesselName: string;
    voyageNumber: string;
    portFrom: string;
    portTo: string;
    ETD: string;
    ETA: string;
    description: string;
    ticketRules: string;
    promotion: string;
    beforeDeparture: string;
    poster: File | null;
};

const tripInformationSchema = z.object({
    id: z.string().optional(),
    vesselName: z.string(),
    voyageNumber: z.string(),
    portFrom: z.string(),
    portTo: z.string(),
    ETD: z.string(),
    ETA: z.string(),
    description: z.string(),
    ticketRules: z.string(),
    promotion: z.string(),
    beforeDeparture: z.string(),
    poster: z.instanceof(File).nullable(),
});

function TripInformationEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<TripInformation>({
        vesselName: "",
        voyageNumber: "",
        portFrom: "",
        portTo: "",
        ETD: "",
        ETA: "",
        description: "",
        ticketRules: "",
        promotion: "",
        beforeDeparture: "",
        poster: null,
    });

    const [selectedVesselName, setSelectedVesselName] = useState<string | null>(
        null
    );
    const [selectedTicketRules, setSelectedTicketRules] = useState<
        string | null
    >(null);
    const [selectedPromotion, setSelectedPromotion] = useState<string | null>(
        null
    );
    const [selectedBeforeDeparture, setSelectedBeforeDeparture] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } =
        useForm<TripInformation>({
            resolver: zodResolver(tripInformationSchema),
            defaultValues: {
                id: "",
                vesselName: "",
                voyageNumber: "",
                portFrom: "",
                portTo: "",
                ETD: "",
                ETA: "",
                description: "",
                ticketRules: "",
                promotion: "",
                beforeDeparture: "",
                poster: null,
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: TripInformation) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.vesselName) {
                apiFormData.append("vesselName", formData.vesselName);
            }
            if (formData.voyageNumber) {
                apiFormData.append("voyageNumber", formData.voyageNumber);
            }
            if (formData.portFrom) {
                apiFormData.append("portFrom", formData.portFrom);
            }
            if (formData.portTo) {
                apiFormData.append("portTo", formData.portTo);
            }
            if (formData.ETD) {
                apiFormData.append("ETD", formData.ETD);
            }
            if (formData.ETA) {
                apiFormData.append("ETA", formData.ETA);
            }
            if (formData.description) {
                apiFormData.append("description", formData.description);
            }
            if (formData.ticketRules) {
                apiFormData.append("ticketRules", formData.ticketRules);
            }
            if (formData.promotion) {
                apiFormData.append("promotion", formData.promotion);
            }
            if (formData.beforeDeparture) {
                apiFormData.append("beforeDeparture", formData.beforeDeparture);
            }
            if (formData.poster instanceof File) {
                apiFormData.append("poster", formData.poster);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Trip Information added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding trip information:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.vesselName) {
                    mappedErrors.vesselName = error.errors.vesselName[0];
                }
                if (error.errors.voyageNumber) {
                    mappedErrors.voyageNumber = error.errors.voyageNumber[0];
                }
                if (error.errors.portFrom) {
                    mappedErrors.portFrom = error.errors.portFrom[0];
                }
                if (error.errors.portTo) {
                    mappedErrors.portTo = error.errors.portTo[0];
                }
                if (error.errors.ETD) {
                    mappedErrors.ETD = error.errors.ETD[0];
                }
                if (error.errors.ETA) {
                    mappedErrors.ETA = error.errors.ETA[0];
                }
                if (error.errors.description) {
                    mappedErrors.description = error.errors.description[0];
                }
                if (error.errors.ticketRules) {
                    mappedErrors.ticketRules = error.errors.ticketRules[0];
                }
                if (error.errors.promotion) {
                    mappedErrors.promotion = error.errors.promotion[0];
                }
                if (error.errors.beforeDeparture) {
                    mappedErrors.beforeDeparture =
                        error.errors.beforeDeparture[0];
                }
                if (error.errors.poster) {
                    mappedErrors.poster = error.errors.poster[0];
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
                <SearchedDropDown
                    name="vesselName"
                    control={control}
                    label="Vessel Name"
                    options={[
                        { key: "1", value: "Vessel Name 1" },
                        { key: "2", value: "Vessel Name 2" },
                        { key: "3", value: "Vessel Name 3" },
                        { key: "4", value: "Vessel Name 4" },
                        { key: "5", value: "Vessel Name 5" },
                    ]}
                    value={selectedVesselName}
                    onChange={(value) => {
                        setSelectedVesselName(value);
                    }}
                    placeholder="Select Vessel Name"
                />

                <FormInput
                    name="voyageNumber"
                    label="Voyage Number"
                    control={control}
                    type="text"
                    error={errors.voyageNumber}
                />
                <FormInput
                    name="portFrom"
                    label="Port From"
                    control={control}
                    type="text"
                    error={errors.portFrom}
                />
                <FormInput
                    name="portTo"
                    label="Port To"
                    control={control}
                    type="text"
                    error={errors.portTo}
                />
                <FormInput
                    name="ETD"
                    label="ETD"
                    control={control}
                    type="text"
                    error={errors.ETD}
                />
                <FormInput
                    name="ETA"
                    label="ETA"
                    control={control}
                    type="text"
                    error={errors.ETA}
                />
                <FormInput
                    name="description"
                    label="Description"
                    control={control}
                    type="textarea"
                    error={errors.description}
                    rows={4}
                    textareaResize="none"
                    colSpan={3}
                />
                <SearchedDropDown
                    name="ticketRules"
                    control={control}
                    label="Ticket Rules"
                    options={[
                        { key: "1", value: "Ticket Rules 1" },
                        { key: "2", value: "Ticket Rules 2" },
                        { key: "3", value: "Ticket Rules 3" },
                        { key: "4", value: "Ticket Rules 4" },
                        { key: "5", value: "Ticket Rules 5" },
                    ]}
                    value={selectedTicketRules}
                    onChange={(value) => {
                        setSelectedTicketRules(value);
                    }}
                    placeholder="Select Ticket Rules"
                />
                <SearchedDropDown
                    name="promotion"
                    control={control}
                    label="Promotion"
                    options={[
                        { key: "1", value: "Promotion 1" },
                        { key: "2", value: "Promotion 2" },
                        { key: "3", value: "Promotion 3" },
                        { key: "4", value: "Promotion 4" },
                        { key: "5", value: "Promotion 5" },
                    ]}
                    value={selectedPromotion}
                    onChange={(value) => {
                        setSelectedPromotion(value);
                    }}
                    placeholder="Select Promotion"
                />
                <SearchedDropDown
                    name="beforeDeparture"
                    control={control}
                    label="Before Departure"
                    options={[
                        { key: "1", value: "Before Departure 1" },
                        { key: "2", value: "Before Departure 2" },
                        { key: "3", value: "Before Departure 3" },
                        { key: "4", value: "Before Departure 4" },
                        { key: "5", value: "Before Departure 5" },
                    ]}
                    value={selectedBeforeDeparture}
                    onChange={(value) => {
                        setSelectedBeforeDeparture(value);
                    }}
                    placeholder="Select Before Departure"
                />

                <FormInput name="poster" control={control} type="file" />
            </FormFieldsLayout>

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default TripInformationEditPage;
