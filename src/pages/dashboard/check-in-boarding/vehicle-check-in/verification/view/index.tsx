import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../../../../../hooks/useToast";
import PageLayout from "../../../../../../layout/PageLayout";
import FormLayout from "../../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../../layout/FormFieldsLayout";
import {
    FormButtons,
    FormFieldWrapper,
    FormInput,
} from "../../../../../../components/form";
import { Image } from "lucide-react";
import { CheckBox } from "../../../../../../components/ui/CheckBox";
import FormCheckBoxWrapper from "../../../../../../components/form/FormCheckBoxWrapper";

type Verification = {
    registrationOwnership: File | null;
    cargoIfAny: File | null;
    checkTripTickCertificate: File | null;
    vehicleInspection: File | null;
    description: string;
    invalidReason?: string;
};

const verificationSchema = z.object({
    registrationOwnership: z.instanceof(File).nullable(),
    cargoIfAny: z.instanceof(File).nullable(),
    checkTripTickCertificate: z.instanceof(File).nullable(),
    vehicleInspection: z.instanceof(File).nullable(),
    description: z.string(),
    invalidReason: z.string().optional(),
});

const data = {
    tripData: {
        vesselName: "vesselName",
        voyageNumber: "voyageNumber",
        portForm: "portForm",
        portTo: "portTo",
        ETD: "ETD",
        ETA: "ETA",
    },
    vehicleDetails: {
        type: "type",
        makeModelChassesNumber: "Make Model Chasses Number",
        engineNumber: "Engine Number",
        plateNumber: "Plate Number",
    },
    ownerDetails: {
        name: "name",
        phone: "phone",
        passport: "passport",
        residencyId: "residencyId",
        licenseCard: "licenseCard",
    },
    consigneeDetails: {
        name: "name",
        phone: "phone",
        passport: "passport",
    },
    consignorDetails: {
        name: "name",
        phone: "phone",
        passport: "passport",
    },
    ticket: {
        cabin: "cabin",
        type: "type",
        visaType: "visaType",
        ticketNumber: "ticketNumber",
    },
};

function VehicleCheckInVerificationViewPage() {
    const { id } = useParams();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [invalid, setInvalid] = useState(true);

    const [isRegistrationOwnershipChecked, setIsRegistrationOwnershipChecked] =
        useState(false);
    const [isCargoIfAnyChecked, setIsCargoIfAnyChecked] = useState(false);
    const [
        isCheckTripTickCertificateChecked,
        setIsCheckTripTickCertificateChecked,
    ] = useState(false);
    const [isVehicleInspectionChecked, setIsVehicleInspectionChecked] =
        useState(false);

    const { control, handleSubmit, reset, formState } = useForm<Verification>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            registrationOwnership: null,
            cargoIfAny: null,
            checkTripTickCertificate: null,
            vehicleInspection: null,
            description: "",
            invalidReason: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (formData: Verification) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.registrationOwnership) {
                apiFormData.append(
                    "registrationOwnership",
                    formData.registrationOwnership
                );
            }

            if (formData.cargoIfAny) {
                apiFormData.append("cargoIfAny", formData.cargoIfAny);
            }

            if (formData.checkTripTickCertificate) {
                apiFormData.append(
                    "checkTripTickCertificate",
                    formData.checkTripTickCertificate
                );
            }

            if (formData.vehicleInspection) {
                apiFormData.append(
                    "vehicleInspection",
                    formData.vehicleInspection
                );
            }

            if (formData.description) {
                apiFormData.append("description", formData.description);
            }
            if (formData.invalidReason) {
                apiFormData.append("invalidReason", formData.invalidReason);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Verification updated successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(
                `/check-in-boarding/vehicle-check-in/verification/edit/${id}?invalid=${invalid}`
            );
        } catch (error: any) {
            console.error("Error updating Verification:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.registrationOwnership) {
                    mappedErrors.registrationOwnership =
                        error.errors.registrationOwnership[0];
                }

                if (error.errors.cargoIfAny) {
                    mappedErrors.cargoIfAny = error.errors.cargoIfAny[0];
                }

                if (error.errors.checkTripTickCertificate) {
                    mappedErrors.checkTripTickCertificate =
                        error.errors.checkTripTickCertificate[0];
                }

                if (error.errors.vehicleInspection) {
                    mappedErrors.vehicleInspection =
                        error.errors.vehicleInspection[0];
                }

                if (error.errors.description) {
                    mappedErrors.description = error.errors.description[0];
                }

                if (error.errors.invalidReason) {
                    mappedErrors.invalidReason = error.errors.invalidReason[0];
                }

                console.log("Mapped errors:", mappedErrors);
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

    const handleCheckInvalid = () => {
        setInvalid(!invalid);
    };

    const handleCheck = (type: string) => {
        switch (type) {
            case "registrationOwnership":
                setIsRegistrationOwnershipChecked(
                    !isRegistrationOwnershipChecked
                );
                break;
            case "cargoIfAny":
                setIsCargoIfAnyChecked(!isCargoIfAnyChecked);
                break;
            case "checkTripTickCertificate":
                setIsCheckTripTickCertificateChecked(
                    !isCheckTripTickCertificateChecked
                );
                break;
            case "vehicleInspection":
                setIsVehicleInspectionChecked(!isVehicleInspectionChecked);
                break;
            default:
                break;
        }
    };

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                {/* Trip Data */}
                <FormFieldsLayout
                    title="Documents Verification"
                    greenTitle="Trip Data"
                >
                    <FormFieldWrapper label={"Vessel Name"}>
                        <input
                            type="text"
                            value={data.tripData.vesselName}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Voyage Number"}>
                        <input
                            type="text"
                            value={data.tripData.voyageNumber}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Port From"}>
                        <input
                            type="text"
                            value={data.tripData.portForm}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Port To"}>
                        <input
                            type="text"
                            value={data.tripData.portTo}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"ETD"}>
                        <input
                            type="text"
                            value={data.tripData.ETD}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"ETA"}>
                        <input
                            type="text"
                            value={data.tripData.ETA}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                {/* Vehicle Details */}
                <FormFieldsLayout greenTitle="Vehicle Details">
                    <FormFieldWrapper label={"Type"}>
                        <input
                            type="text"
                            value={data.vehicleDetails.type}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Make Model Chasses Number"}>
                        <input
                            type="text"
                            value={data.vehicleDetails.makeModelChassesNumber}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Engine Number"}>
                        <input
                            type="text"
                            value={data.vehicleDetails.engineNumber}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Plate Number"}>
                        <input
                            type="text"
                            value={data.vehicleDetails.plateNumber}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                {/* Owner Details */}
                <FormFieldsLayout greenTitle="Owner Details">
                    <FormFieldWrapper label={"Name"}>
                        <input
                            type="text"
                            value={data.ownerDetails.name}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Phone"}>
                        <input
                            type="text"
                            value={data.ownerDetails.phone}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Passport"}>
                        <input
                            type="text"
                            value={data.ownerDetails.passport}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Residency ID"}>
                        <input
                            type="text"
                            value={data.ownerDetails.residencyId}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"License Card"}>
                        <input
                            type="text"
                            value={data.ownerDetails.licenseCard}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                {/*  consignee Details */}
                <FormFieldsLayout greenTitle="Consignee Details">
                    <FormFieldWrapper label={"Name"}>
                        <input
                            type="text"
                            value={data.consigneeDetails.name}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Phone"}>
                        <input
                            type="text"
                            value={data.consigneeDetails.phone}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Passport"}>
                        <input
                            type="text"
                            value={data.consigneeDetails.passport}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                {/* Consignor Details */}
                <FormFieldsLayout greenTitle="Consignor Details">
                    <FormFieldWrapper label={"Name"}>
                        <input
                            type="text"
                            value={data.consignorDetails.name}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Phone"}>
                        <input
                            type="text"
                            value={data.consignorDetails.phone}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Passport"}>
                        <input
                            type="text"
                            value={data.consignorDetails.passport}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                <FormFieldsLayout greenTitle="Ticket">
                    <FormFieldWrapper label={"Cabin"}>
                        <input
                            type="text"
                            value={data.ticket.cabin}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Type"}>
                        <input
                            type="text"
                            value={data.ticket.type}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Visa Type"}>
                        <input
                            type="text"
                            value={data.ticket.visaType}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Ticket Number"}>
                        <input
                            type="text"
                            value={data.ticket.ticketNumber}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                <FormFieldsLayout className="px-7" cols="1">
                    {/* registration & ownership */}
                    <FormCheckBoxWrapper
                        label="Registration & Ownership"
                        isChecked={isRegistrationOwnershipChecked}
                        handleCheck={() => handleCheck("registrationOwnership")}
                    >
                        <FormInput
                            name="registrationOwnership"
                            control={control}
                            fileLabel="registration & ownership"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                            disabled={!isRegistrationOwnershipChecked}
                        />
                    </FormCheckBoxWrapper>

                    {/* cargo if any */}
                    <FormCheckBoxWrapper
                        label="Cargo if any"
                        isChecked={isCargoIfAnyChecked}
                        handleCheck={() => handleCheck("cargoIfAny")}
                    >
                        <FormInput
                            name="cargoIfAny"
                            control={control}
                            fileLabel="cargo if any"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                            disabled={!isCargoIfAnyChecked}
                        />
                    </FormCheckBoxWrapper>

                    {/* Check trip tick Certificate */}
                    <FormCheckBoxWrapper
                        label="Check trip tick Certificate"
                        isChecked={isCheckTripTickCertificateChecked}
                        handleCheck={() =>
                            handleCheck("checkTripTickCertificate")
                        }
                    >
                        <FormInput
                            name="checkTripTickCertificate"
                            control={control}
                            fileLabel="check trip tick certificate"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                            disabled={!isCheckTripTickCertificateChecked}
                        />
                    </FormCheckBoxWrapper>

                    {/* vehicle inspection */}
                    <FormCheckBoxWrapper
                        label="Vehicle inspection"
                        isChecked={isVehicleInspectionChecked}
                        handleCheck={() => handleCheck("vehicleInspection")}
                    >
                        <FormInput
                            name="vehicleInspection"
                            control={control}
                            fileLabel="vehicle inspection"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                            disabled={!isVehicleInspectionChecked}
                        />
                    </FormCheckBoxWrapper>

                    {/* Description */}
                    <div className="flex items-center gap-2">
                        <FormInput
                            name="description"
                            control={control}
                            label="Description"
                            type="textarea"
                            rows={3}
                            textareaResize="none"
                        />
                    </div>
                </FormFieldsLayout>

                {/* Valid/Invalid */}
                <div className="px-7 flex gap-32 items-center mb-10">
                    <div className="flex items-center gap-2">
                        <CheckBox
                            checked={!invalid ? true : false}
                            onChange={handleCheckInvalid}
                        />
                        <label>Valid</label>
                    </div>

                    <div className="flex items-center gap-2">
                        <CheckBox
                            checked={invalid ? true : false}
                            onChange={handleCheckInvalid}
                        />

                        <label>Invalid</label>
                    </div>
                </div>

                {invalid && (
                    <FormFieldsLayout cols="1">
                        <FormInput
                            name="invalidReason"
                            control={control}
                            label="Invalid Reason"
                            type="textarea"
                            rows={3}
                            textareaResize="none"
                        />
                    </FormFieldsLayout>
                )}

                <FormButtons
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default VehicleCheckInVerificationViewPage;
