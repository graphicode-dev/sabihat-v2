import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { useToast } from "../../../../../hooks/useToast";
import FormLayout from "../../../../../layout/FormLayout";
import FormFieldsLayout from "../../../../../layout/FormFieldsLayout";
import { FormButtons, FormInput } from "../../../../../components/form";
import PageLayout from "../../../../../layout/PageLayout";
import { SearchedDropDown } from "../../../../../components/SearchedDropDown";
import { DynamicTable } from "../../../../../components/table";
import { TableColumn, TableData } from "../../../../../types/table";

type PassengerPriceList = {
    id?: string;
    name: string;
    currency: string;
    passengerType: string;
    ticketType: string;
    cabin: string;
    portFrom: string;
    portTo: string;
    visaType: string;
    basicPrice: number;
    taxes: number;
    taxBase: number;
    effectiveDate: string;
};

const passengerPriceListSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    currency: z.string(),
    passengerType: z.string(),
    ticketType: z.string(),
    cabin: z.string(),
    portFrom: z.string(),
    portTo: z.string(),
    visaType: z.string(),
    basicPrice: z.number(),
    taxes: z.number(),
    taxBase: z.number(),
    effectiveDate: z.string(),
});

function PassengerPriceListAddPage() {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<PassengerPriceList>({
        name: "",
        currency: "",
        passengerType: "",
        ticketType: "",
        cabin: "",
        portFrom: "",
        portTo: "",
        visaType: "",
        basicPrice: 0,
        taxes: 0,
        taxBase: 0,
        effectiveDate: "",
    });

    const [selectedPassengerType, setSelectedPassengerType] = useState<
        string | null
    >(null);
    const [selectedTicketType, setSelectedTicketType] = useState<string | null>(
        null
    );
    const [selectedCabin, setSelectedCabin] = useState<string | null>(null);
    const [selectedPortFrom, setSelectedPortFrom] = useState<string | null>(
        null
    );
    const [selectedPortTo, setSelectedPortTo] = useState<string | null>(null);
    const [selectedVisaType, setSelectedVisaType] = useState<string | null>(
        null
    );
    const [selectedBasicPrice, setSelectedBasicPrice] = useState<string | null>(
        null
    );
    const [selectedTaxes, setSelectedTaxes] = useState<string | null>(null);
    const [selectedTaxBase, setSelectedTaxBase] = useState<string | null>(null);

    const { control, handleSubmit, reset, formState } =
        useForm<PassengerPriceList>({
            resolver: zodResolver(passengerPriceListSchema),
            defaultValues: {
                id: "",
                name: "",
                currency: "",
                passengerType: "",
                ticketType: "",
                cabin: "",
                portFrom: "",
                portTo: "",
                visaType: "",
                basicPrice: 0,
                taxes: 0,
                taxBase: 0,
                effectiveDate: "",
            },
            mode: "onChange",
        });

    const onSubmit = async (formData: PassengerPriceList) => {
        setIsLoading(true);
        try {
            // Create FormData object for file upload
            const apiFormData = new FormData();

            // Always append all fields, even if they're empty strings
            // This ensures the API receives all fields
            if (formData.name) {
                apiFormData.append("name", formData.name);
            }
            if (formData.currency) {
                apiFormData.append("currency", formData.currency);
            }
            if (formData.passengerType) {
                apiFormData.append("passengerType", formData.passengerType);
            }
            if (formData.ticketType) {
                apiFormData.append("ticketType", formData.ticketType);
            }
            if (formData.cabin) {
                apiFormData.append("cabin", formData.cabin);
            }
            if (formData.portFrom) {
                apiFormData.append("portFrom", formData.portFrom);
            }
            if (formData.portTo) {
                apiFormData.append("portTo", formData.portTo);
            }
            if (formData.visaType) {
                apiFormData.append("visaType", formData.visaType);
            }
            if (formData.basicPrice) {
                apiFormData.append(
                    "basicPrice",
                    formData.basicPrice.toString()
                );
            }
            if (formData.taxes) {
                apiFormData.append("taxes", formData.taxes.toString());
            }
            if (formData.taxBase) {
                apiFormData.append("taxBase", formData.taxBase.toString());
            }
            if (formData.effectiveDate) {
                apiFormData.append("effectiveDate", formData.effectiveDate);
            }

            // Simulate API call success
            // In a real app, you would send apiFormData to your backend
            // const response = await api.post('/company', apiFormData);

            addToast({
                message: "Passenger Price List added successfully",
                type: "success",
                title: "Success!",
            });

            reset();
        } catch (error: any) {
            console.error("Error adding Passenger Price List:", error);
            if (error?.errors) {
                // Map API error fields to our frontend field names
                const mappedErrors: any = {};

                if (error.errors.name) {
                    mappedErrors.name = error.errors.name[0];
                }
                if (error.errors.currency) {
                    mappedErrors.currency = error.errors.currency[0];
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
            id: "passengerType",
            header: "Passenger Type",
            accessorKey: "passengerType",
        },
        {
            id: "ticketType",
            header: "Ticket Type",
            accessorKey: "ticketType",
        },
        {
            id: "cabin",
            header: "Cabin",
            accessorKey: "cabin",
        },
        {
            id: "portFrom",
            header: "Port From",
            accessorKey: "portFrom",
        },
        {
            id: "portTo",
            header: "Port To",
            accessorKey: "portTo",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                passengerType: "Adult",
                ticketType: "Round Trip",
                cabin: "Economy",
                portFrom: "New York",
                portTo: "London",
            },
        },
        {
            id: "2",
            columns: {
                passengerType: "Child",
                ticketType: "One Way",
                cabin: "Business",
                portFrom: "New York",
                portTo: "London",
            },
        },
        {
            id: "3",
            columns: {
                passengerType: "Infant",
                ticketType: "Round Trip",
                cabin: "Economy",
                portFrom: "New York",
                portTo: "London",
            },
        },
        {
            id: "4",
            columns: {
                passengerType: "Adult",
                ticketType: "Round Trip",
                cabin: "Economy",
                portFrom: "New York",
                portTo: "London",
            },
        },
        {
            id: "5",
            columns: {
                passengerType: "Adult",
                ticketType: "Round Trip",
                cabin: "Economy",
                portFrom: "New York",
                portTo: "London",
            },
        },
    ];

    return (
        <PageLayout showBorder>
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
                    <FormFieldsLayout title="Edit">
                        {/* Name */}
                        <FormInput
                            name="name"
                            control={control}
                            label="Name"
                            error={errors.name}
                        />

                        {/* Currency */}
                        <FormInput
                            name="currency"
                            control={control}
                            label="Currency"
                            error={errors.currency}
                        />
                    </FormFieldsLayout>

                    <FormFieldsLayout>
                        {/* Passenger Type */}
                        <SearchedDropDown
                            name="passengerType"
                            control={control}
                            label="Passenger Type"
                            options={[
                                { key: "Adult", value: "Adult" },
                                { key: "Child", value: "Child" },
                                { key: "Infant", value: "Infant" },
                            ]}
                            value={selectedPassengerType}
                            onChange={(value) =>
                                setSelectedPassengerType(value)
                            }
                            placeholder="Select Passenger Type"
                        />

                        {/* Ticket Type */}
                        <SearchedDropDown
                            name="ticketType"
                            control={control}
                            label="Ticket Type"
                            options={[
                                { key: "Round Trip", value: "Round Trip" },
                                { key: "One Way", value: "One Way" },
                            ]}
                            value={selectedTicketType}
                            onChange={(value) => setSelectedTicketType(value)}
                            placeholder="Select Ticket Type"
                        />

                        {/* Cabin */}
                        <SearchedDropDown
                            name="cabin"
                            control={control}
                            label="Cabin"
                            options={[
                                { key: "First", value: "First" },
                                { key: "Business", value: "Business" },
                                { key: "Economy", value: "Economy" },
                            ]}
                            value={selectedCabin}
                            onChange={(value) => setSelectedCabin(value)}
                            placeholder="Select Cabin"
                        />

                        {/* portFrom */}
                        <SearchedDropDown
                            name="portFrom"
                            control={control}
                            label="Port From"
                            options={[
                                { key: "Port From", value: "Port From" },
                                { key: "Port To", value: "Port To" },
                            ]}
                            value={selectedPortFrom}
                            onChange={(value) => setSelectedPortFrom(value)}
                            placeholder="Select Port From"
                        />

                        {/* portTo */}
                        <SearchedDropDown
                            name="portTo"
                            control={control}
                            label="Port To"
                            options={[
                                { key: "Port From", value: "Port From" },
                                { key: "Port To", value: "Port To" },
                            ]}
                            value={selectedPortTo}
                            onChange={(value) => setSelectedPortTo(value)}
                            placeholder="Select Port To"
                        />

                        {/* visaType */}
                        <SearchedDropDown
                            name="visaType"
                            control={control}
                            label="Visa Type"
                            options={[
                                { key: "Visa Type", value: "Visa Type" },
                                { key: "Visa Type", value: "Visa Type" },
                            ]}
                            value={selectedVisaType}
                            onChange={(value) => setSelectedVisaType(value)}
                            placeholder="Select Visa Type"
                        />

                        {/* basicPrice */}
                        <SearchedDropDown
                            name="basicPrice"
                            control={control}
                            label="Basic Price"
                            options={[
                                { key: "Basic Price", value: "Basic Price" },
                                { key: "Basic Price", value: "Basic Price" },
                            ]}
                            value={selectedBasicPrice}
                            onChange={(value) => setSelectedBasicPrice(value)}
                            placeholder="Select Basic Price"
                        />

                        {/* taxes */}
                        <SearchedDropDown
                            name="taxes"
                            control={control}
                            label="Taxes"
                            options={[
                                { key: "Taxes", value: "Taxes" },
                                { key: "Taxes", value: "Taxes" },
                            ]}
                            value={selectedTaxes}
                            onChange={(value) => setSelectedTaxes(value)}
                            placeholder="Select Taxes"
                        />

                        {/* taxBase */}
                        <SearchedDropDown
                            name="taxBase"
                            control={control}
                            label="Tax Base"
                            options={[
                                { key: "Tax Base", value: "Tax Base" },
                                { key: "Tax Base", value: "Tax Base" },
                            ]}
                            value={selectedTaxBase}
                            onChange={(value) => setSelectedTaxBase(value)}
                            placeholder="Select Tax Base"
                        />
                    </FormFieldsLayout>

                    <FormFieldsLayout>
                        {/* effectiveDate */}
                        <FormInput
                            name="effectiveDate"
                            control={control}
                            label="Effective Date"
                            type="date"
                            error={errors.effectiveDate}
                        />
                    </FormFieldsLayout>

                    <FormButtons
                        isLoading={isLoading}
                        submitText="Add"
                        disabled={!formState.isDirty}
                        removeCancel
                    />
                </FormLayout>

                <FormFieldsLayout cols="1">
                    <DynamicTable
                        title="PriceList"
                        columns={columns}
                        data={data}
                    />
                </FormFieldsLayout>

                <FormButtons
                    isLoading={isLoading}
                    disabled={!formState.isDirty}
                />
            </FormLayout>
        </PageLayout>
    );
}

export default PassengerPriceListAddPage;
