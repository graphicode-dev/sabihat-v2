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
import { ENDPOINTS } from "../../../../../config/endpoints";

type UserProfiles = {
    name: string;
    email: string;
    phone_code: string;
    phone_number: string;
    password: string;
    address: string;
    is_salesman: number;
    business_partner_id: number;
    roles: string[];
};

const userProfilesSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone_code: z.string(),
    phone_number: z.string(),
    password: z.string(),
    address: z.string(),
    is_salesman: z.number(),
    business_partner_id: z.number(),
    roles: z.array(z.string()),
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

function UserProfilesAddPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<UserProfiles>({
        name: "",
        email: "",
        phone_code: "",
        phone_number: "",
        password: "",
        address: "",
        is_salesman: 0,
        business_partner_id: 0,
        roles: [],
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

    const { control, handleSubmit, reset, formState, setValue } =
        useForm<UserProfiles>({
            resolver: zodResolver(userProfilesSchema),
            defaultValues: {
                name: "",
                email: "",
                phone_code: "",
                phone_number: "",
                password: "",
                address: "",
                is_salesman: 0,
                business_partner_id: 0,
                roles: [],
            },

            mode: "onChange",
        });

    // Handle phone extraction
    const handlePhoneExtracted = (phoneData: {
        fullNumber: string;
        phoneCode: string;
        phoneNumber: string;
    }) => {
        setValue("phone_code", phoneData.phoneCode);
        setValue("phone_number", phoneData.fullNumber);
    };

    const onSubmit = async (formData: UserProfiles) => {
        setIsLoading(true);
        const validatedData = userProfilesSchema.parse(formData);
        console.log("Validated data:", validatedData);

        const phoneCodeLength = formData.phone_code?.length || 0;
        const phoneNumberOnly =
            formData.phone_number.substring(phoneCodeLength);

        const apiFormData = new FormData();

        apiFormData.append(
            "user",
            JSON.stringify({
                name: formData.name,
                email: formData.email,
                phone_code: formData.phone_code,
                phone_number: phoneNumberOnly,
                address: formData.address,
                password: formData.password,
                is_salesman: formData.is_salesman,
                business_partner_id: formData.business_partner_id,
                roles: formData.roles,
            })
        );

        await ENDPOINTS.users
            .add(apiFormData)
            .then(() => {
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
                <FormFieldsLayout title="Add" separator>
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
                        name="phone_number"
                        control={control}
                        label="Phone"
                        type="tel"
                        error={errors.phone_number}
                        onPhoneExtracted={handlePhoneExtracted}
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
                </FormFieldsLayout>

                <FormFieldsLayout title="Layer">
                    {/* Layers */}
                    <SearchedDropDown
                        name="code"
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
                        name="code"
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
                    submitText="add"
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default UserProfilesAddPage;
