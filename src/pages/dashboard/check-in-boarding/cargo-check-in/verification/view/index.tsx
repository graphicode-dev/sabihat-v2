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
    cargoType: File | null;
    cargoDescription: string;
    cargoCertificate: File | null;
    invalidReason?: string;
};

const verificationSchema = z.object({
    cargoType: z.instanceof(File).nullable(),
    cargoDescription: z.string(),
    cargoCertificate: z.instanceof(File).nullable(),
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
    cargoDetails: {
        cargoType: "cargoType",
        QTY: "QTY",
        goodsType: "goodsType",
        totalWeight: "totalWeight",
        totalDimension: "totalDimension",
        goodsDescription: "goodsDescription",
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

function CargoCheckInVerificationViewPage() {
    const { id } = useParams();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [invalid, setInvalid] = useState(true);
    const [isCargoTypeChecked, setIsCargoTypeChecked] = useState(false);
    const [isCargoCertificateChecked, setIsCargoCertificateChecked] =
        useState(false);

    const { control, handleSubmit, reset, formState } = useForm<Verification>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            cargoType: null,
            cargoDescription: "",
            cargoCertificate: null,
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
            if (formData.cargoType) {
                apiFormData.append("cargoType", formData.cargoType);
            }

            if (formData.cargoDescription) {
                apiFormData.append(
                    "cargoDescription",
                    formData.cargoDescription
                );
            }

            if (formData.cargoCertificate) {
                apiFormData.append(
                    "cargoCertificate",
                    formData.cargoCertificate
                );
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
                `/check-in-boarding/cargo-check-in/verification/edit/${id}?invalid=${invalid}`
            );
        } catch (error: any) {
            console.error("Error updating Verification:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.cargoType) {
                    mappedErrors.cargoType = error.errors.cargoType[0];
                }

                if (error.errors.cargoDescription) {
                    mappedErrors.cargoDescription =
                        error.errors.cargoDescription[0];
                }

                if (error.errors.cargoCertificate) {
                    mappedErrors.cargoCertificate =
                        error.errors.cargoCertificate[0];
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
            case "cargoType":
                setIsCargoTypeChecked(!isCargoTypeChecked);
                break;
            case "cargoCertificate":
                setIsCargoCertificateChecked(!isCargoCertificateChecked);
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

                {/* Cargo Data */}
                <FormFieldsLayout greenTitle="Cargo Data">
                    <FormFieldWrapper label={"Cargo Type"}>
                        <input
                            type="text"
                            value={data.cargoDetails.cargoType}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"QTY"}>
                        <input
                            type="text"
                            value={data.cargoDetails.QTY}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Goods Type"}>
                        <input
                            type="text"
                            value={data.cargoDetails.goodsType}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Total Weight"}>
                        <input
                            type="text"
                            value={data.cargoDetails.totalWeight}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Total Dimension"}>
                        <input
                            type="text"
                            value={data.cargoDetails.totalDimension}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                </FormFieldsLayout>

                {/* Goods description */}
                <FormFieldsLayout cols="1">
                    <FormFieldWrapper label={"Goods Description"}>
                        <textarea
                            value={data.cargoDetails.goodsDescription}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none resize-none"
                            rows={4}
                            cols={1}
                            style={{
                                resize: "none",
                            }}
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
                    {/* Cargo Type */}
                    <FormCheckBoxWrapper
                        label="Cargo Type"
                        isChecked={isCargoTypeChecked}
                        handleCheck={() => handleCheck("cargoType")}
                    >
                        <FormInput
                            name="cargoType"
                            control={control}
                            fileLabel="cargoType"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                            disabled={isCargoTypeChecked}
                        />
                    </FormCheckBoxWrapper>

                    {/* Description */}
                    <FormInput
                        name="cargoDescription"
                        control={control}
                        label="Description"
                        type="textarea"
                        rows={3}
                        textareaResize="none"
                        disabled={!isCargoTypeChecked}
                    />

                    {/* cargo Certificate */}
                    <FormCheckBoxWrapper
                        label="Cargo Certificate"
                        isChecked={isCargoCertificateChecked}
                        handleCheck={() => handleCheck("cargoCertificate")}
                    >
                        <FormInput
                            name="cargoCertificate"
                            control={control}
                            fileLabel="cargoCertificate"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                            disabled={isCargoCertificateChecked}
                        />
                    </FormCheckBoxWrapper>
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

export default CargoCheckInVerificationViewPage;
