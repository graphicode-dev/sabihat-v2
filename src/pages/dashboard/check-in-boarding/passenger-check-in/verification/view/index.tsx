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

type Verification = {
    ticket: File | null;
    passport: File | null;
    visa: File | null;
    healthyCertificate: File | null;
    invalidReason?: string;
};

const verificationSchema = z.object({
    ticket: z.instanceof(File).nullable(),
    passport: z.instanceof(File).nullable(),
    visa: z.instanceof(File).nullable(),
    healthyCertificate: z.instanceof(File).nullable(),
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
    passengerData: {
        name: "name",
        age: "age",
        passportNumber: "passportNumber",
        expiryDate: "expiryDate",
        gender: "gender",
        type: "type",
    },
    ticket: {
        cabin: "cabin",
        type: "type",
        visaType: "visaType",
        ticketNumber: "ticketNumber",
    },
};

function PassengerCheckInVerificationViewPage() {
    const { id } = useParams();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [invalid, setInvalid] = useState(true);
    const [isTicketChecked, setIsTicketChecked] = useState(false);
    const [isPassportChecked, setIsPassportChecked] = useState(false);
    const [isVisaChecked, setIsVisaChecked] = useState(false);
    const [isHealthyCertificateChecked, setIsHealthyCertificateChecked] =
        useState(false);

    const { control, handleSubmit, reset, formState } = useForm<Verification>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            ticket: null,
            passport: null,
            visa: null,
            healthyCertificate: null,
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
            if (formData.ticket) {
                apiFormData.append("ticket", formData.ticket);
            }

            if (formData.passport) {
                apiFormData.append("passport", formData.passport);
            }

            if (formData.visa) {
                apiFormData.append("visa", formData.visa);
            }

            if (formData.healthyCertificate) {
                apiFormData.append(
                    "healthyCertificate",
                    formData.healthyCertificate
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
                `/check-in-boarding/passenger-check-in/verification/edit/${id}?invalid=${invalid}`
            );
        } catch (error: any) {
            console.error("Error updating Verification:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.ticket) {
                    mappedErrors.ticket = error.errors.ticket[0];
                }

                if (error.errors.passport) {
                    mappedErrors.passport = error.errors.passport[0];
                }

                if (error.errors.visa) {
                    mappedErrors.visa = error.errors.visa[0];
                }

                if (error.errors.healthyCertificate) {
                    mappedErrors.healthyCertificate =
                        error.errors.healthyCertificate[0];
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
            case "ticket":
                setIsTicketChecked(!isTicketChecked);
                break;
            case "passport":
                setIsPassportChecked(!isPassportChecked);
                break;
            case "visa":
                setIsVisaChecked(!isVisaChecked);
                break;
            case "healthyCertificate":
                setIsHealthyCertificateChecked(!isHealthyCertificateChecked);
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

                {/* Passenger Data */}
                <FormFieldsLayout greenTitle="Passenger Data">
                    <FormFieldWrapper label={"Name"}>
                        <input
                            type="text"
                            value={data.passengerData.name}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Age"}>
                        <input
                            type="text"
                            value={data.passengerData.age}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Passport Number"}>
                        <input
                            type="text"
                            value={data.passengerData.passportNumber}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Expiry Date"}>
                        <input
                            type="text"
                            value={data.passengerData.expiryDate}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Gender"}>
                        <input
                            type="text"
                            value={data.passengerData.gender}
                            readOnly
                            tabIndex={-1}
                            className=" cursor-default h-10 w-full rounded-3xl ring-2 px-6 py-3 ring-dark-50  focus:outline-none"
                        />
                    </FormFieldWrapper>
                    <FormFieldWrapper label={"Type"}>
                        <input
                            type="text"
                            value={data.passengerData.type}
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

                <FormFieldsLayout className="px-7">
                    {/* Ticket */}
                    <div className="flex items-center gap-2">
                        <CheckBox
                            checked={isTicketChecked}
                            onChange={() => handleCheck("ticket")}
                        />
                        <FormInput
                            name="ticket"
                            control={control}
                            fileLabel="ticket"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                        />
                    </div>

                    {/* Passport */}
                    <div className="flex items-center gap-2">
                        <CheckBox
                            checked={isPassportChecked}
                            onChange={() => handleCheck("passport")}
                        />
                        <FormInput
                            name="passport"
                            control={control}
                            fileLabel="passport"
                            type="file"
                        />
                    </div>

                    {/* Visa */}
                    <div className="flex items-center gap-2">
                        <CheckBox
                            checked={isVisaChecked}
                            onChange={() => handleCheck("visa")}
                        />
                        <FormInput
                            name="visa"
                            control={control}
                            fileLabel="visa"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
                        />
                    </div>

                    {/* Healthy Certificate */}
                    <div className="flex items-center gap-2">
                        <CheckBox
                            checked={isHealthyCertificateChecked}
                            onChange={() => handleCheck("healthyCertificate")}
                        />
                        <FormInput
                            name="healthyCertificate"
                            control={control}
                            fileLabel="healthy certificate"
                            type="file"
                            fileIcon={<Image className="h-5 w-5" />}
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

export default PassengerCheckInVerificationViewPage;
