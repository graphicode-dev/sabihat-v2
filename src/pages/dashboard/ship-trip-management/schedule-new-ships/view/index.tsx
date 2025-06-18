// import { useParams } from "react-router-dom";
import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useNavigate, useParams } from "react-router-dom";

function ScheduleNewShipsViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const data = {
        vesselName: "*******",
        vesselType: "*******",
        registrationNumber: "*******",
        operatingStatus: "*******",
        callSign: "*******",
        IMONumber: "*******",
        mmsiNumber: "*******",
        flag: "*******",
        grossWeight: "*******",
        deadWeight: "*******",
        breadth: "*******",
        ISMManager: "*******",
        shipCommercialManager: "*******",
        safetyManagementCertificate: "*******",
        classificationStatus: "*******",
        builder: "*******",
        yearOfBuild: "*******",
        passengersCabins: {
            cabinName: "*******",
            numberOfPassengers: "*******",
        },
        cargoCompartments: {
            cabinName: "*******",
            weight: "*******",
            size: "*******",
            quantity: "*******",
        },
        vehiclesParking: {
            cabinName: "*******",
            weight: "*******",
            size: "*******",
            quantity: "*******",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Vessel Name",
                                    value: data?.vesselName,
                                },
                                {
                                    label: "Vessel Type",
                                    value: data?.vesselType,
                                },
                                {
                                    label: "Registration Number",
                                    value: data?.registrationNumber,
                                },
                                {
                                    label: "Operating Status",
                                    value: data?.operatingStatus,
                                },
                                {
                                    label: "Call Sign",
                                    value: data?.callSign,
                                },
                                {
                                    label: "IMO Number",
                                    value: data?.IMONumber,
                                },
                                {
                                    label: "MMSI Number",
                                    value: data?.mmsiNumber,
                                },
                                {
                                    label: "Flag",
                                    value: data?.flag,
                                },
                                {
                                    label: "Gross Weight",
                                    value: data?.grossWeight,
                                },
                                {
                                    label: "Dead Weight",
                                    value: data?.deadWeight,
                                },
                                {
                                    label: "Breadth",
                                    value: data?.breadth,
                                },
                                {
                                    label: "ISM Manager",
                                    value: data?.ISMManager,
                                },
                                {
                                    label: "Ship Commercial Manager",
                                    value: data?.shipCommercialManager,
                                },
                                {
                                    label: "Safety Management Certificate",
                                    value: data?.safetyManagementCertificate,
                                },
                                {
                                    label: "Classification Status",
                                    value: data?.classificationStatus,
                                },
                                {
                                    label: "Builder",
                                    value: data?.builder,
                                },
                                {
                                    label: "Year Of Build",
                                    value: data?.yearOfBuild,
                                },
                            ],
                        },
                        {
                            title: "Passengers Cabins",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.passengersCabins.cabinName,
                                },
                                {
                                    label: "Number of Passengers",
                                    value: data?.passengersCabins
                                        .numberOfPassengers,
                                },
                            ],
                        },
                        {
                            title: "Cargo Compartments",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.cargoCompartments.cabinName,
                                },
                                {
                                    label: "Weight",
                                    value: data?.cargoCompartments.weight,
                                },
                                {
                                    label: "Size",
                                    value: data?.cargoCompartments.size,
                                },
                                {
                                    label: "Quantity",
                                    value: data?.cargoCompartments.quantity,
                                },
                            ],
                        },
                        {
                            title: "Vehicles Parking's",
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: data?.vehiclesParking.cabinName,
                                },
                                {
                                    label: "Weight",
                                    value: data?.vehiclesParking.weight,
                                },
                                {
                                    label: "Size",
                                    value: data?.vehiclesParking.size,
                                },
                                {
                                    label: "Quantity",
                                    value: data?.vehiclesParking.quantity,
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/ship-trip-management/schedule-new-ships/edit/${id}`
                    )
                }
                buttons
            />
        </PageLayout>
    );
}

export default ScheduleNewShipsViewPage;
