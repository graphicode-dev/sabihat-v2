import { z } from "zod";
import { FormButtons, FormInput } from "../../../../../../components/form";
import { DynamicTable } from "../../../../../../components/table";
import FormFieldsLayout from "../../../../../../layout/FormFieldsLayout";
import FormLayout from "../../../../../../layout/FormLayout";
import { useToast } from "../../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TableColumn, TableData } from "../../../../../../types/table";
import PageLayout from "../../../../../../layout/PageLayout";
import { SearchedDropDown } from "../../../../../../components/SearchedDropDown";

type VerificationEdit = {
    tagNumber: string;
    type: string;
    weight: string;
    trollyNumber: string;
};

const VerificationEditSchema = z.object({
    tagNumber: z.string(),
    type: z.string(),
    weight: z.string(),
    trollyNumber: z.string(),
});

function VehicleCheckInVerificationEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<VerificationEdit>({
        tagNumber: "",
        type: "",
        weight: "",
        trollyNumber: "",
    });
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } =
        useForm<VerificationEdit>({
            resolver: zodResolver(VerificationEditSchema),
            defaultValues: {
                tagNumber: "",
                type: "",
                weight: "",
                trollyNumber: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: VerificationEdit) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.tagNumber) {
                apiFormData.append("tagNumber", formData.tagNumber);
            }
            if (formData.type) {
                apiFormData.append("type", formData.type);
            }
            if (formData.weight) {
                apiFormData.append("weight", formData.weight);
            }
            if (formData.trollyNumber) {
                apiFormData.append("trollyNumber", formData.trollyNumber);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Passengers Verification added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate("/check-in-boarding/vehicle-check-in/payment/invoice");
        } catch (error: any) {
            console.error("Error adding passengers verification:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.tagNumber) {
                    mappedErrors.tagNumber = error.errors.tagNumber[0];
                }
                if (error.errors.type) {
                    mappedErrors.type = error.errors.type[0];
                }
                if (error.errors.weight) {
                    mappedErrors.weight = error.errors.weight[0];
                }
                if (error.errors.trollyNumber) {
                    mappedErrors.trollyNumber = error.errors.trollyNumber[0];
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

    const columns: TableColumn[] = [
        {
            id: "tagNumber",
            header: "Tag Number",
            accessorKey: "tagNumber",
        },
        {
            id: "weight",
            header: "Weight",
            accessorKey: "weight",
        },
        {
            id: "type",
            header: "Type",
            accessorKey: "type",
        },
        {
            id: "trollyNumber",
            header: "Trolly Number",
            accessorKey: "trollyNumber",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                tagNumber: "*****",
                weight: "*****",
                type: "*****",
                trollyNumber: "*****",
            },
        },
        {
            id: "2",
            columns: {
                tagNumber: "*****",
                weight: "*****",
                type: "*****",
                trollyNumber: "*****",
            },
        },
        {
            id: "3",
            columns: {
                tagNumber: "*****",
                weight: "*****",
                type: "*****",
                trollyNumber: "*****",
            },
        },
        {
            id: "4",
            columns: {
                tagNumber: "*****",
                weight: "*****",
                type: "*****",
                trollyNumber: "*****",
            },
        },
    ];

    return (
        <PageLayout showBorder>
            <FormLayout
                className="relative flex flex-col justify-between"
                handleSubmit={handleSubmit}
                handleFormSubmit={onSubmit}
                removeBorder
            >
                <div className="fixed top-20 right-52 w-full max-w-[600px] bg-primary-50 rounded-3xl shadow-md py-5 px-6 z-40">
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary-500 rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary-500 rounded-bl-3xl" />

                    <div className="py-4 flex justify-around">
                        <div className="flex flex-col justify-center items-start border-r border-primary-100 pr-7">
                            <h3 className="text-dark-100">Pieces</h3>
                            <p className="text-sm">20</p>
                        </div>
                        <div className="flex flex-col justify-center items-start border-r border-primary-100 pr-7">
                            <h3 className="text-dark-100">Allowed Weight</h3>
                            <p className="text-sm">20</p>
                        </div>
                        <div className="flex flex-col justify-center items-start border-r border-primary-100 pr-7">
                            <h3 className="text-dark-100">Total Weight</h3>
                            <p className="text-sm">30</p>
                        </div>
                        <div className="flex flex-col justify-center items-start">
                            <h3 className="text-dark-100">Excess Baggage</h3>
                            <p className="text-sm text-primary-500">50</p>
                        </div>
                    </div>
                </div>

                <FormLayout
                    handleSubmit={handleSubmit}
                    handleFormSubmit={onSubmit}
                    removeBorder
                >
                    <FormFieldsLayout title="Edit" cols="3">
                        {/* tag number */}
                        <FormInput
                            name="tagNumber"
                            control={control}
                            label="Tag Number"
                            type="text"
                            placeholder="Enter Tag Number"
                            error={errors.tagNumber}
                        />

                        {/* type */}
                        <SearchedDropDown
                            name="type"
                            control={control}
                            label="Type"
                            options={[
                                { key: "type1", value: "Type 1" },
                                { key: "type2", value: "Type 2" },
                                { key: "type3", value: "Type 3" },
                            ]}
                            value={selectedType}
                            onChange={(value) => {
                                setSelectedType(value);
                            }}
                            placeholder="Select Type"
                        />

                        {/* weight */}
                        <FormInput
                            name="weight"
                            control={control}
                            label="Weight"
                            type="text"
                            placeholder="Enter Weight"
                            error={errors.weight}
                        />

                        {/* trolly number */}
                        <FormInput
                            name="trollyNumber"
                            control={control}
                            label="Trolly Number"
                            type="text"
                            placeholder="Enter Trolly Number"
                            error={errors.trollyNumber}
                        />

                        <FormButtons
                            isLoading={isLoading}
                            disabled={!formState.isDirty}
                            submitText="Add"
                            removeCancel
                        />
                    </FormFieldsLayout>
                </FormLayout>

                <DynamicTable
                    title="Page Baggage Check-In"
                    data={data}
                    columns={columns}
                />
                <FormButtons
                    className="absolute -bottom-48 "
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default VehicleCheckInVerificationEditPage;
