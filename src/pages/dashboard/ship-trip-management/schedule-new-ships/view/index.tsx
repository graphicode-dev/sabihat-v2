// import { useParams } from "react-router-dom";
import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { ViewCardData } from "../../../../../types";
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
                data={
                    {
                        "vessel name": data?.vesselName,
                        "vessel type": data?.vesselType,
                        "registration number": data?.registrationNumber,
                        "operating status": data?.operatingStatus,
                        "call sign": data?.callSign,
                        "IMO number": data?.IMONumber,
                        "mmsi number": data?.mmsiNumber,
                        flag: data?.flag,
                        "gross weight": data?.grossWeight,
                        "dead weight": data?.deadWeight,
                        breadth: data?.breadth,
                        "ISM Manager": data?.ISMManager,
                        "Ship Commercial Manager": data?.shipCommercialManager,
                        "Safety Management Certificate":
                            data?.safetyManagementCertificate,
                        "Classification Status": data?.classificationStatus,
                        Builder: data?.builder,
                        "Year Of Build": data?.yearOfBuild,

                        "Passengers Cabins": {
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
                        "Cargo Compartments": {
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
                        "Vehicles Parking's": {
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
                    } as ViewCardData
                }
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
