import PageLayout from "../../../../../layout/PageLayout";
import FormLayout from "../../../../../layout/FormLayout";
import { FormInput, FormButtons } from "../../../../../components/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { useNavigate } from "react-router-dom";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { dirtyFields } from "../../../../../lib/utils";

type Error = {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    password?: string;
    photo?: string;
    layerId?: string;
    partnerId?: string;
    salesRoleId?: string;
    paymentLayerId?: string;
    checkInLayerId?: string;
    cargoLayerId?: string;
    auditingLayerId?: string;
};

type UserProfiles = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    password?: string;
    photo?: File | null;
    layerId?: string;
    partnerId?: string;
    salesRoleId?: string;
    paymentLayerId?: string;
    checkInLayerId?: string;
    cargoLayerId?: string;
    auditingLayerId?: string;
};

const userProfilesSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    password: z.string().optional(),
    photo: z.instanceof(File).nullable().optional(),
    layerId: z.string().optional(),
    partnerId: z.string().optional(),
    salesRoleId: z.string().optional(),
    paymentLayerId: z.string().optional(),
    checkInLayerId: z.string().optional(),
    cargoLayerId: z.string().optional(),
    auditingLayerId: z.string().optional(),
});

const ModuleRoleField = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="w-full flex justify-start items-center gap-56 mb-4 px-4">
            <h1 className="w-64 text-left text-sm capitalize">{title}</h1>
            <div className="w-1/3">{children}</div>
        </div>
    );
};

function UserProfilesEditPage() {
    const fetchedData = {
        name: "name",
        email: "email@gmail.com",
        phone: "phone",
        address: "address",
        password: "password",
        photo: null,
        layerId: "layerId",
        partnerId: "partnerId",
        salesRoleId: "salesRoleId",
        paymentLayerId: "paymentLayerId",
        checkInLayerId: "checkInLayerId",
        cargoLayerId: "cargoLayerId",
        auditingLayerId: "auditingLayerId",

        selectedLayer: "Layer 2",
        selectedPartner: "Partner 2",
        selectedSalesRole: "Role 2",
        selectedPaymentLayerId: "Layer 2",
        selectedCheckInLayerId: "Layer 2",
        selectedCargoLayerId: "Layer 2",
        selectedAuditingLayerId: "Layer 2",
    };

    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Error>({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        photo: "",
        layerId: "",
        partnerId: "",
        salesRoleId: "",
        paymentLayerId: "",
        checkInLayerId: "",
        cargoLayerId: "",
        auditingLayerId: "",
    });
    const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
    const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
    const [selectedSalesRole, setSelectedSalesRole] = useState<string | null>(
        null
    );
    const [selectedPaymentLayerId, setSelectedPaymentLayerId] = useState<
        string | null
    >(null);
    const [selectedCheckInLayerId, setSelectedCheckInLayerId] = useState<
        string | null
    >(null);
    const [selectedCargoLayerId, setSelectedCargoLayerId] = useState<
        string | null
    >(null);
    const [selectedAuditingLayerId, setSelectedAuditingLayerId] = useState<
        string | null
    >(null);

    const { control, handleSubmit, reset, formState } = useForm<UserProfiles>({
        resolver: zodResolver(userProfilesSchema),
        defaultValues: {
            name: fetchedData.name,
            email: fetchedData.email,
            phone: fetchedData.phone,
            address: fetchedData.address,
            password: fetchedData.password,
            photo: fetchedData.photo,
            layerId: fetchedData.layerId,
            partnerId: fetchedData.partnerId,
            salesRoleId: fetchedData.salesRoleId,
            paymentLayerId: fetchedData.paymentLayerId,
            checkInLayerId: fetchedData.checkInLayerId,
            cargoLayerId: fetchedData.cargoLayerId,
            auditingLayerId: fetchedData.auditingLayerId,
        },

        mode: "onChange",
    });

    const onSubmit = async (formData: UserProfiles) => {
        setIsLoading(true);
        try {
            const apiFormData = new FormData();

            if (dirtyFields(formState).includes("name") && formData.name) {
                apiFormData.append("name", formData.name);
            }

            if (dirtyFields(formState).includes("email") && formData.email) {
                apiFormData.append("email", formData.email);
            }

            if (dirtyFields(formState).includes("phone") && formData.phone) {
                apiFormData.append("phone", formData.phone);
            }

            if (
                dirtyFields(formState).includes("address") &&
                formData.address
            ) {
                apiFormData.append("address", formData.address);
            }

            if (
                dirtyFields(formState).includes("password") &&
                formData.password
            ) {
                apiFormData.append("password", formData.password);
            }

            if (
                dirtyFields(formState).includes("photo") &&
                formData.photo instanceof File
            ) {
                apiFormData.append("photo", formData.photo);
            }

            if (
                dirtyFields(formState).includes("layerId") &&
                formData.layerId
            ) {
                apiFormData.append("layerId", formData.layerId);
            }

            if (
                dirtyFields(formState).includes("partnerId") &&
                formData.partnerId
            ) {
                apiFormData.append("partnerId", formData.partnerId);
            }

            if (
                dirtyFields(formState).includes("salesRoleId") &&
                formData.salesRoleId
            ) {
                apiFormData.append("salesRoleId", formData.salesRoleId);
            }

            if (
                dirtyFields(formState).includes("paymentLayerId") &&
                formData.paymentLayerId
            ) {
                apiFormData.append("paymentLayerId", formData.paymentLayerId);
            }

            if (
                dirtyFields(formState).includes("checkInLayerId") &&
                formData.checkInLayerId
            ) {
                apiFormData.append("checkInLayerId", formData.checkInLayerId);
            }

            if (
                dirtyFields(formState).includes("cargoLayerId") &&
                formData.cargoLayerId
            ) {
                apiFormData.append("cargoLayerId", formData.cargoLayerId);
            }

            if (
                dirtyFields(formState).includes("auditingLayerId") &&
                formData.auditingLayerId
            ) {
                apiFormData.append("auditingLayerId", formData.auditingLayerId);
            }

            addToast({
                message: "User profile created successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            setSelectedLayer(null);
            setSelectedPartner(null);
            setSelectedSalesRole(null);
            setSelectedPaymentLayerId(null);
            setSelectedCheckInLayerId(null);
            setSelectedCargoLayerId(null);
            setSelectedAuditingLayerId(null);
            navigate(-1);
        } catch (error: any) {
            console.error("Error creating user profile:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};
                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.email) {
                    mappedErrors.email = error.errors.email[0];
                }
                if (error.errors.phone) {
                    mappedErrors.phone = error.errors.phone[0];
                }
                if (error.errors.address) {
                    mappedErrors.address = error.errors.address[0];
                }
                if (error.errors.password) {
                    mappedErrors.password = error.errors.password[0];
                }
                if (error.errors.photo) {
                    mappedErrors.photo = error.errors.photo[0];
                }
                if (error.errors.layerId) {
                    mappedErrors.layerId = error.errors.layerId[0];
                }
                if (error.errors.partnerId) {
                    mappedErrors.partnerId = error.errors.partnerId[0];
                }
                if (error.errors.salesRoleId) {
                    mappedErrors.salesRoleId = error.errors.salesRoleId[0];
                }
                if (error.errors.paymentLayerId) {
                    mappedErrors.paymentLayerId =
                        error.errors.paymentLayerId[0];
                }
                if (error.errors.checkInLayerId) {
                    mappedErrors.checkInLayerId =
                        error.errors.checkInLayerId[0];
                }
                if (error.errors.cargoLayerId) {
                    mappedErrors.cargoLayerId = error.errors.cargoLayerId[0];
                }
                if (error.errors.auditingLayerId) {
                    mappedErrors.auditingLayerId =
                        error.errors.auditingLayerId[0];
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

    useEffect(() => {
        if (fetchedData) {
            reset(fetchedData);
            setSelectedLayer(fetchedData.selectedLayer);
            setSelectedPartner(fetchedData.selectedPartner);
            setSelectedSalesRole(fetchedData.selectedSalesRole);
            setSelectedPaymentLayerId(fetchedData.selectedPaymentLayerId);
            setSelectedCheckInLayerId(fetchedData.selectedCheckInLayerId);
            setSelectedCargoLayerId(fetchedData.selectedCargoLayerId);
            setSelectedAuditingLayerId(fetchedData.selectedAuditingLayerId);
        }
    }, [reset]);

    return (
        <PageLayout>
            <FormLayout handleSubmit={handleSubmit} handleFormSubmit={onSubmit}>
                <FormFieldsLayout title="Edit" separator>
                    {/* Name */}
                    <FormInput
                        name="name"
                        control={control}
                        label="Name"
                        type="text"
                        error={errors.name}
                    />
                    {/* Email */}
                    <FormInput
                        name="email"
                        control={control}
                        label="Email"
                        type="email"
                        error={errors.email}
                    />
                    {/* Phone */}
                    <FormInput
                        name="phone"
                        control={control}
                        label="Phone"
                        type="tel"
                        error={errors.phone}
                    />
                    {/* Address */}
                    <FormInput
                        name="address"
                        control={control}
                        label="Address"
                        type="text"
                        error={errors.address}
                    />
                    {/* Password */}
                    <FormInput
                        name="password"
                        control={control}
                        label="Password"
                        type="password"
                        error={errors.password}
                    />
                    {/* Photo */}
                    <FormInput
                        name="photo"
                        control={control}
                        type="file"
                        error={errors.photo}
                        fileLabel="Upload Image"
                    />
                </FormFieldsLayout>

                <FormFieldsLayout title="Layer">
                    {/* Layers */}
                    <SearchedDropDown
                        name="layerId"
                        control={control}
                        label="Layer"
                        required
                        options={[
                            { key: "Layer 1", value: "Layer 1" },
                            { key: "Layer 2", value: "Layer 2" },
                            { key: "Layer 3", value: "Layer 3" },
                            { key: "Layer 4", value: "Layer 4" },
                            { key: "Layer 5", value: "Layer 5" },
                        ]}
                        value={selectedLayer || ""}
                        onChange={(layerId) => {
                            setSelectedLayer(layerId);
                        }}
                        placeholder="Select layer"
                    />

                    {/* Partners */}
                    <SearchedDropDown
                        name="partnerId"
                        control={control}
                        label="Partner"
                        required
                        options={[
                            { key: "Partner 1", value: "Partner 1" },
                            { key: "Partner 2", value: "Partner 2" },
                            { key: "Partner 3", value: "Partner 3" },
                            { key: "Partner 4", value: "Partner 4" },
                            { key: "Partner 5", value: "Partner 5" },
                        ]}
                        value={selectedPartner || ""}
                        onChange={(partnerId) => {
                            setSelectedPartner(partnerId);
                        }}
                        placeholder="Select partner"
                    />
                </FormFieldsLayout>

                <h1 className="w-fit text-left ml-5 text-xl my-12 border-b-2 border-primary-500">
                    Parent name{" "}
                    <span className="text-primary-500">*ahmed 50</span>
                </h1>

                {/* salesRole */}
                <ModuleRoleField title="Sales And Baking">
                    <SearchedDropDown
                        className="flex-1 "
                        name="salesRoleId"
                        control={control}
                        label="Role"
                        required
                        options={[
                            { key: "Role 1", value: "Role 1" },
                            { key: "Role 2", value: "Role 2" },
                            { key: "Role 3", value: "Role 3" },
                            { key: "Role 4", value: "Role 4" },
                            { key: "Role 5", value: "Role 5" },
                        ]}
                        value={selectedSalesRole || ""}
                        onChange={(salesRoleId) => {
                            setSelectedSalesRole(salesRoleId);
                        }}
                        placeholder="Select sales role"
                    />
                </ModuleRoleField>

                {/* payment& financial Transactions */}
                <ModuleRoleField title="Payment& Financial Transactions">
                    <SearchedDropDown
                        className="flex-1 w-full"
                        name="paymentLayerId"
                        control={control}
                        label="Layer"
                        required
                        options={[
                            { key: "Layer 1", value: "Layer 1" },
                            { key: "Layer 2", value: "Layer 2" },
                            { key: "Layer 3", value: "Layer 3" },
                            { key: "Layer 4", value: "Layer 4" },
                            { key: "Layer 5", value: "Layer 5" },
                        ]}
                        value={selectedPaymentLayerId || ""}
                        onChange={(paymentLayerId) => {
                            setSelectedPaymentLayerId(paymentLayerId);
                        }}
                        placeholder="Select payment layer"
                    />
                </ModuleRoleField>

                {/* checkInLayerId */}
                <ModuleRoleField title="Check In & Boarding">
                    <SearchedDropDown
                        className="flex-1 w-full"
                        name="checkInLayerId"
                        control={control}
                        label="Layer"
                        required
                        options={[
                            { key: "Layer 1", value: "Layer 1" },
                            { key: "Layer 2", value: "Layer 2" },
                            { key: "Layer 3", value: "Layer 3" },
                            { key: "Layer 4", value: "Layer 4" },
                            { key: "Layer 5", value: "Layer 5" },
                        ]}
                        value={selectedCheckInLayerId || ""}
                        onChange={(checkInLayerId) => {
                            setSelectedCheckInLayerId(checkInLayerId);
                        }}
                        placeholder="Select checkIn layer"
                    />
                </ModuleRoleField>

                {/* cargo & vehicle handling */}
                <ModuleRoleField title="Cargo & Vehicle Handling">
                    <SearchedDropDown
                        className="flex-1 w-full"
                        name="cargoLayerId"
                        control={control}
                        label="Layer"
                        required
                        options={[
                            { key: "Layer 1", value: "Layer 1" },
                            { key: "Layer 2", value: "Layer 2" },
                            { key: "Layer 3", value: "Layer 3" },
                            { key: "Layer 4", value: "Layer 4" },
                            { key: "Layer 5", value: "Layer 5" },
                        ]}
                        value={selectedCargoLayerId || ""}
                        onChange={(cargoLayerId) => {
                            setSelectedCargoLayerId(cargoLayerId);
                        }}
                        placeholder="Select cargo layer"
                    />
                </ModuleRoleField>

                {/* auditing */}
                <ModuleRoleField title="Financial Reporting & Auditing">
                    <SearchedDropDown
                        className="flex-1 w-full"
                        name="auditingLayerId"
                        control={control}
                        label="Layer"
                        required
                        options={[
                            { key: "Layer 1", value: "Layer 1" },
                            { key: "Layer 2", value: "Layer 2" },
                            { key: "Layer 3", value: "Layer 3" },
                            { key: "Layer 4", value: "Layer 4" },
                            { key: "Layer 5", value: "Layer 5" },
                        ]}
                        value={selectedAuditingLayerId || ""}
                        onChange={(auditingLayerId) => {
                            setSelectedAuditingLayerId(auditingLayerId);
                        }}
                        placeholder="Select auditing layer"
                    />
                </ModuleRoleField>

                <FormButtons
                    isLoading={isLoading}
                    submitText="Update"
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default UserProfilesEditPage;
