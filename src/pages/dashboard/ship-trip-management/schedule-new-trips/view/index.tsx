import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";

function ScheduleNewTripsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();

    const data = {
        id: "1",
        portFrom: "*******",
        portTo: "*******",
        ETD: "*********************************************************",
        ETA: "*******",
        description:
            "********************************************************************************************************************",
        ticketRules: "*******",
        promotion: "*******",
        beforeDeparture:
            "*********************************************************",
        agentAllocation: {
            passengersCabins: {
                cabinName: "*******",
                agent1: "*******",
                numberOfPassengers: "*******",
            },
            cargoCompartments: {
                cabinName: "*******",
                agent1: "*******",
                availableWeight: "*******",
                availableSize: "*******",
                availableQuantity: "*******",
            },
            vehiclePackages: {
                cabinName: "*******",
                agent1: "*******",
                availableWeight: "*******",
                availableSize: "*******",
                availableQuantity: "*******",
            },
        },
        available: {
            passengersCabins: {
                cabinName: "*******",
                numberOfPassengers: "*******",
            },
        },
    };

    return (
        <PageLayout showBorder>
            <ViewCard
                title="Vessel Name"
                variant="vessel"
                subtitle="Voyage Number"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Port From",
                                    value: data?.portFrom?.toString(),
                                },
                                {
                                    label: "Port To",
                                    value: data?.portTo?.toString(),
                                },
                                {
                                    label: "ETD",
                                    value: data?.ETD?.toString(),
                                },
                                {
                                    label: "ETA",
                                    value: data?.ETA?.toString(),
                                },
                                {
                                    label: "Description",
                                    value: data?.description?.toString(),
                                    colSpan: 2,
                                },
                                {
                                    label: "Ticket Rules",
                                    value: data?.ticketRules?.toString(),
                                },
                                {
                                    label: "Promotion",
                                    value: data?.promotion?.toString(),
                                },
                                {
                                    label: "Before Departure",
                                    value: data?.beforeDeparture?.toString(),
                                },
                            ],
                        },
                        {
                            mainTitle: "Agent Allocation",
                            title: "Passengers Cabins",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.agentAllocation?.passengersCabins?.cabinName?.toString(),
                                },
                                {
                                    label: "Number of Passengers",
                                    value: data?.agentAllocation?.passengersCabins?.numberOfPassengers?.toString(),
                                },
                                {
                                    label: "Agent1",
                                    value: data?.agentAllocation?.passengersCabins?.agent1?.toString(),
                                },
                            ],
                        },
                        {
                            title: "Cargo Compartments",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.agentAllocation?.cargoCompartments?.cabinName?.toString(),
                                },
                                {
                                    label: "Agent1",
                                    value: data?.agentAllocation?.cargoCompartments?.agent1?.toString(),
                                },
                                {
                                    label: "Available weight",
                                    value: data?.agentAllocation?.cargoCompartments?.availableWeight?.toString(),
                                },
                                {
                                    label: "Available Size",
                                    value: data?.agentAllocation?.cargoCompartments?.availableSize?.toString(),
                                },
                                {
                                    label: "Available Quantity",
                                    value: data?.agentAllocation?.cargoCompartments?.availableQuantity?.toString(),
                                },
                            ],
                        },
                        {
                            title: "Vehicle Packages",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.agentAllocation?.vehiclePackages?.cabinName?.toString(),
                                },
                                {
                                    label: "Agent1",
                                    value: data?.agentAllocation?.vehiclePackages?.agent1?.toString(),
                                },
                                {
                                    label: "Available Size",
                                    value: data?.agentAllocation?.vehiclePackages?.availableSize?.toString(),
                                },
                                {
                                    label: "Available Quantity",
                                    value: data?.agentAllocation?.vehiclePackages?.availableQuantity?.toString(),
                                },
                            ],
                        },
                        {
                            mainTitle: "Available",
                            title: "Passengers Cabins",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.available?.passengersCabins?.cabinName?.toString(),
                                },
                                {
                                    label: "Number of Passengers",
                                    value: data?.available?.passengersCabins?.numberOfPassengers?.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/ship-trip-management/schedule-new-trips/edit/${id}`
                    )
                }
                buttons
                onTicket={() =>
                    navigate(
                        `/ship-trip-management/schedule-new-trips/tickets/${id}`
                    )
                }

                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this trip?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Trip deleted successfully",
                                        title: "Success!",
                                    });
                                    navigate(-1);
                                },
                                variant: "primary",
                            },
                            {
                                text: "Cancel",
                                onClick: () => {},
                                variant: "secondary",
                            },
                        ]
                    );
                }}
                ticketButton
                hideBorder
            />
        </PageLayout>
    );
}

export default ScheduleNewTripsViewPage;
