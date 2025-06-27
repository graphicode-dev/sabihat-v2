import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useToast } from "../../../hooks/useToast";
import FormLayout from "../../../layout/FormLayout";
import FormFieldsLayout from "../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../form";
import { SearchedDropDown } from "../../SearchedDropDown";

type ShipInformation = {
    id?: string;
    vesselName: string;
    vesselType: string;
    registrationNumber: string;
    operatingStatus: string;
    callSign: string;
    IMONumber: string;
    MMSINumber: string;
    flag: string;
    grossWeight: string;
    deadWeight: string;
    breadth: string;
    ISMManager: string;
    shipCommercialManager: string;
    surveysClarification: string;
    classificationStatus: string;
    notes: string;
    builder: string;
    yearOfBuild: string;
    safetyManagementCertificate: File | null;
};

const shipInformationSchema = z.object({
    id: z.string().optional(),
    vesselName: z.string(),
    vesselType: z.string(),
    registrationNumber: z.string(),
    operatingStatus: z.string(),
    callSign: z.string(),
    IMONumber: z.string(),
    MMSINumber: z.string(),
    flag: z.string(),
    grossWeight: z.string(),
    deadWeight: z.string(),
    breadth: z.string(),
    ISMManager: z.string(),
    shipCommercialManager: z.string(),
    surveysClarification: z.string(),
    classificationStatus: z.string(),
    notes: z.string(),
    builder: z.string(),
    yearOfBuild: z.string(),
    safetyManagementCertificate: z.instanceof(File).nullable(),
});

function ShipInformationEditForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ShipInformation>({
        vesselName: "",
        vesselType: "",
        registrationNumber: "",
        operatingStatus: "",
        callSign: "",
        IMONumber: "",
        MMSINumber: "",
        flag: "",
        grossWeight: "",
        deadWeight: "",
        breadth: "",
        ISMManager: "",
        shipCommercialManager: "",
        surveysClarification: "",
        classificationStatus: "",
        notes: "",
        builder: "",
        yearOfBuild: "",
        safetyManagementCertificate: null,
    });
    const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } =
        useForm<ShipInformation>({
            resolver: zodResolver(shipInformationSchema),
            defaultValues: {
                id: "",
                vesselName: "",
                vesselType: "",
                registrationNumber: "",
                operatingStatus: "",
                callSign: "",
                IMONumber: "",
                MMSINumber: "",
                flag: "",
                grossWeight: "",
                deadWeight: "",
                breadth: "",
                ISMManager: "",
                shipCommercialManager: "",
                surveysClarification: "",
                classificationStatus: "",
                notes: "",
                builder: "",
                yearOfBuild: "",
                safetyManagementCertificate: null,
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: ShipInformation) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.vesselName) {
                apiFormData.append("vesselName", formData.vesselName);
            }
            if (formData.vesselType) {
                apiFormData.append("vesselType", formData.vesselType);
            }
            if (formData.registrationNumber) {
                apiFormData.append(
                    "registrationNumber",
                    formData.registrationNumber
                );
            }
            if (formData.operatingStatus) {
                apiFormData.append("operatingStatus", formData.operatingStatus);
            }
            if (formData.callSign) {
                apiFormData.append("callSign", formData.callSign);
            }
            if (formData.IMONumber) {
                apiFormData.append("IMONumber", formData.IMONumber);
            }
            if (formData.MMSINumber) {
                apiFormData.append("MMSINumber", formData.MMSINumber);
            }
            if (formData.flag) {
                apiFormData.append("flag", formData.flag);
            }
            if (formData.grossWeight) {
                apiFormData.append("grossWeight", formData.grossWeight);
            }
            if (formData.deadWeight) {
                apiFormData.append("deadWeight", formData.deadWeight);
            }
            if (formData.breadth) {
                apiFormData.append("breadth", formData.breadth);
            }
            if (formData.ISMManager) {
                apiFormData.append("ISMManager", formData.ISMManager);
            }
            if (formData.shipCommercialManager) {
                apiFormData.append(
                    "shipCommercialManager",
                    formData.shipCommercialManager
                );
            }
            if (formData.surveysClarification) {
                apiFormData.append(
                    "surveysClarification",
                    formData.surveysClarification
                );
            }
            if (formData.classificationStatus) {
                apiFormData.append(
                    "classificationStatus",
                    formData.classificationStatus
                );
            }
            if (formData.notes) {
                apiFormData.append("notes", formData.notes);
            }
            if (formData.builder) {
                apiFormData.append("builder", formData.builder);
            }
            if (formData.yearOfBuild) {
                apiFormData.append("yearOfBuild", formData.yearOfBuild);
            }
            if (formData.safetyManagementCertificate instanceof File) {
                apiFormData.append(
                    "safetyManagementCertificate",
                    formData.safetyManagementCertificate
                );
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Ship Information added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding ship information:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.vesselName) {
                    mappedErrors.vesselName = error.errors.vesselName[0];
                }
                if (error.errors.vesselType) {
                    mappedErrors.vesselType = error.errors.vesselType[0];
                }
                if (error.errors.registrationNumber) {
                    mappedErrors.registrationNumber =
                        error.errors.registrationNumber[0];
                }
                if (error.errors.operatingStatus) {
                    mappedErrors.operatingStatus =
                        error.errors.operatingStatus[0];
                }
                if (error.errors.callSign) {
                    mappedErrors.callSign = error.errors.callSign[0];
                }
                if (error.errors.IMONumber) {
                    mappedErrors.IMONumber = error.errors.IMONumber[0];
                }
                if (error.errors.MMSINumber) {
                    mappedErrors.MMSINumber = error.errors.MMSINumber[0];
                }
                if (error.errors.flag) {
                    mappedErrors.flag = error.errors.flag[0];
                }
                if (error.errors.grossWeight) {
                    mappedErrors.grossWeight = error.errors.grossWeight[0];
                }
                if (error.errors.deadWeight) {
                    mappedErrors.deadWeight = error.errors.deadWeight[0];
                }
                if (error.errors.breadth) {
                    mappedErrors.breadth = error.errors.breadth[0];
                }
                if (error.errors.ISMManager) {
                    mappedErrors.ISMManager = error.errors.ISMManager[0];
                }
                if (error.errors.shipCommercialManager) {
                    mappedErrors.shipCommercialManager =
                        error.errors.shipCommercialManager[0];
                }
                if (error.errors.surveysClarification) {
                    mappedErrors.surveysClarification =
                        error.errors.surveysClarification[0];
                }
                if (error.errors.classificationStatus) {
                    mappedErrors.classificationStatus =
                        error.errors.classificationStatus[0];
                }
                if (error.errors.notes) {
                    mappedErrors.notes = error.errors.notes[0];
                }
                if (error.errors.builder) {
                    mappedErrors.builder = error.errors.builder[0];
                }
                if (error.errors.yearOfBuild) {
                    mappedErrors.yearOfBuild = error.errors.yearOfBuild[0];
                }
                if (error.errors.safetyManagementCertificate) {
                    mappedErrors.safetyManagementCertificate =
                        error.errors.safetyManagementCertificate[0];
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
                {/* vesselName */}
                <FormInput
                    name="vesselName"
                    control={control}
                    label="Vessel Name"
                    type="text"
                    error={errors.vesselName}
                />
                {/* vesselType */}
                <FormInput
                    name="vesselType"
                    control={control}
                    label="Vessel Type"
                    type="text"
                    error={errors.vesselType}
                />
                {/* registrationNumber */}
                <FormInput
                    name="registrationNumber"
                    control={control}
                    label="Registration Number"
                    type="text"
                    error={errors.registrationNumber}
                />

                {/* operatingStatus */}
                <FormInput
                    name="operatingStatus"
                    control={control}
                    label="Operating Status"
                    type="text"
                    error={errors.operatingStatus}
                />
                {/* callSign */}
                <FormInput
                    name="callSign"
                    control={control}
                    label="Call Sign"
                    type="text"
                    error={errors.callSign}
                />

                {/* IMONumber */}
                <FormInput
                    name="IMONumber"
                    control={control}
                    label="IMONumber"
                    type="text"
                    error={errors.IMONumber}
                />

                {/* MMSINumber */}
                <FormInput
                    name="MMSINumber"
                    control={control}
                    label="MMSINumber"
                    type="text"
                    error={errors.MMSINumber}
                />
                {/* flag */}
                <SearchedDropDown
                    name="flag"
                    control={control}
                    label="Flag"
                    options={[
                        { key: "Flag 1", value: "flag1" },
                        { key: "Flag 2", value: "flag2" },
                        { key: "Flag 3", value: "flag3" },
                    ]}
                    value={selectedFlag}
                    onChange={(value) => {
                        setSelectedFlag(value);
                    }}
                    placeholder="Select Flag"
                />
                {/* grossWeight */}
                <FormInput
                    name="grossWeight"
                    control={control}
                    label="Gross Weight"
                    type="text"
                    error={errors.grossWeight}
                />
                {/* deadWeight */}
                <FormInput
                    name="deadWeight"
                    control={control}
                    label="Dead Weight"
                    type="text"
                    error={errors.deadWeight}
                />
                {/* breadth */}
                <FormInput
                    name="breadth"
                    control={control}
                    label="Breadth"
                    type="text"
                    error={errors.breadth}
                />
                {/* ISMManager */}
                <FormInput
                    name="ISMManager"
                    control={control}
                    label="ISMManager"
                    type="text"
                    error={errors.ISMManager}
                />

                {/* shipCommercialManager */}
                <FormInput
                    name="shipCommercialManager"
                    control={control}
                    label="Ship Commercial Manager"
                    type="text"
                    error={errors.shipCommercialManager}
                />
                {/* surveysClarification */}
                <FormInput
                    name="surveysClarification"
                    control={control}
                    label="Surveys Clarification"
                    type="text"
                    error={errors.surveysClarification}
                />
                {/* classificationStatus */}
                <FormInput
                    name="classificationStatus"
                    control={control}
                    label="Classification Status"
                    type="text"
                    error={errors.classificationStatus}
                />
            </FormFieldsLayout>

            <FormFieldsLayout cols="1">
                {/* notes */}
                <FormInput
                    name="notes"
                    control={control}
                    label="Notes"
                    type="textarea"
                    rows={4}
                    textareaResize="none"
                    error={errors.notes}
                />
            </FormFieldsLayout>

            <FormFieldsLayout>
                {/* builder */}
                <FormInput
                    name="builder"
                    control={control}
                    label="Builder"
                    type="text"
                    error={errors.builder}
                />
                {/* yearOfBuild */}
                <FormInput
                    name="yearOfBuild"
                    control={control}
                    label="Year Of Build"
                    type="text"
                    error={errors.yearOfBuild}
                />
            </FormFieldsLayout>

            <FormFieldsLayout>
                {/* safetyManagementCertificate */}
                <FormInput
                    name="safetyManagementCertificate"
                    control={control}
                    type="file"
                    fileLabel="Safety Management Certificate"
                />
            </FormFieldsLayout>

            <FormButtons
                isLoading={isLoading}
                submitText="Add"
                disabled={!formState.isDirty}
                cancelText="Cancel"
            />
        </FormLayout>
    );
}

export default ShipInformationEditForm;
