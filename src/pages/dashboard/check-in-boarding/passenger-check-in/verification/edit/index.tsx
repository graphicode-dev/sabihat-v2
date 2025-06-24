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

type VerificationEdit = {
    weight: string;
    trollyNumber: string;
};

const VerificationEditSchema = z.object({
    weight: z.string(),
    trollyNumber: z.string(),
});

function PassengerCheckInVerificationEditPage() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<VerificationEdit>({
        weight: "",
        trollyNumber: "",
    });

    const { control, handleSubmit, reset, formState } =
        useForm<VerificationEdit>({
            resolver: zodResolver(VerificationEditSchema),
            defaultValues: {
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
            navigate("/check-in-boarding/passenger-check-in/payment/invoice");
        } catch (error: any) {
            console.error("Error adding passengers verification:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

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
                trollyNumber: "*****",
            },
        },
        {
            id: "2",
            columns: {
                tagNumber: "*****",
                weight: "*****",
                trollyNumber: "*****",
            },
        },
        {
            id: "3",
            columns: {
                tagNumber: "*****",
                weight: "*****",
                trollyNumber: "*****",
            },
        },
        {
            id: "4",
            columns: {
                tagNumber: "*****",
                weight: "*****",
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
                    <FormFieldsLayout title="Edit" cols="4">
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
                            className="justify-end!"
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

export default PassengerCheckInVerificationEditPage;
