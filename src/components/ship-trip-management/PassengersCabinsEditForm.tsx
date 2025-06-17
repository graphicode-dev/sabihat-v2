import { z } from "zod";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormLayout from "../../layout/FormLayout";
import FormFieldsLayout from "../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../form";
import { SearchedDropDown } from "../SearchedDropDown";
import { DynamicTable } from "../table";
import { TableColumn, TableData } from "../../types/table";
import defaultImage from "../../assets/images/default-user.png";

type PassengersCabins = {
    id?: string;
    cabin: string;
    passengers: string;
    image: File | null;
};

const passengersCabinsSchema = z.object({
    id: z.string().optional(),
    cabin: z.string(),
    passengers: z.string(),
    image: z.instanceof(File).nullable(),
});

function PassengersCabinsEditForm() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PassengersCabins>({
        cabin: "",
        passengers: "",
        image: null,
    });
    const [selectedCabin, setSelectedCabin] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } =
        useForm<PassengersCabins>({
            resolver: zodResolver(passengersCabinsSchema),
            defaultValues: {
                id: "",
                cabin: "",
                passengers: "",
                image: null,
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: PassengersCabins) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.cabin) {
                apiFormData.append("cabin", formData.cabin);
            }
            if (formData.passengers) {
                apiFormData.append("passengers", formData.passengers);
            }
            if (formData.image instanceof File) {
                apiFormData.append("image", formData.image);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Passengers Cabins added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
            navigate(-1);
        } catch (error: any) {
            console.error("Error adding passengers cabins:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.cabin) {
                    mappedErrors.cabin = error.errors.cabin[0];
                }
                if (error.errors.passengers) {
                    mappedErrors.passengers = error.errors.passengers[0];
                }
                if (error.errors.image) {
                    mappedErrors.image = error.errors.image[0];
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
            id: "image",
            header: "Image",
            accessorKey: "image",
            cell(props) {
                const image = props.row.original.image;
                return (
                    <img
                        src={image}
                        alt="Passenger Image"
                        className="w-16 h-16 rounded-xl object-cover"
                    />
                );
            },
        },
        {
            id: "cabin",
            header: "Cabin",
            accessorKey: "cabin",
        },
        {
            id: "numberOfPassengers",
            header: "Number of Passengers",
            accessorKey: "numberOfPassengers",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                image: defaultImage,
                cabin: "*****",
                numberOfPassengers: "*****",
            },
        },
        {
            id: "2",
            columns: {
                image: defaultImage,
                cabin: "*****",
                numberOfPassengers: "*****",
            },
        },
        {
            id: "3",
            columns: {
                image: defaultImage,
                cabin: "*****",
                numberOfPassengers: "*****",
            },
        },
        {
            id: "4",
            columns: {
                image: defaultImage,
                cabin: "*****",
                numberOfPassengers: "*****",
            },
        },
    ];

    return (
        <FormLayout
            handleSubmit={handleSubmit}
            handleFormSubmit={onSubmit}
            removeBorder
        >
            <FormLayout
                handleSubmit={handleSubmit}
                handleFormSubmit={onSubmit}
                removeBorder
            >
                <FormFieldsLayout cols="4">
                    {/* cabin */}
                    <SearchedDropDown
                        name="cabin"
                        control={control}
                        label="Cabin"
                        options={[
                            { key: "Cabin 1", value: "cabin1" },
                            { key: "Cabin 2", value: "cabin2" },
                            { key: "Cabin 3", value: "cabin3" },
                        ]}
                        value={selectedCabin}
                        onChange={(value) => {
                            setSelectedCabin(value);
                        }}
                        placeholder="Select Cabin"
                    />

                    {/* passengers */}
                    <FormInput
                        name="passengers"
                        control={control}
                        label="Passengers"
                        type="text"
                        placeholder="Enter Passengers"
                        error={errors.passengers}
                        requiredLabel="Available 40"
                    />

                    {/* image */}
                    <FormInput
                        name="image"
                        control={control}
                        label="Image"
                        type="file"
                        placeholder="Passenger Image"
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
                title="Passengers Cabins"
                data={data}
                columns={columns}
                hideBorder
            />

            <FormButtons isLoading={isLoading} disabled={!formState.isDirty} />
        </FormLayout>
    );
}

export default PassengersCabinsEditForm;
