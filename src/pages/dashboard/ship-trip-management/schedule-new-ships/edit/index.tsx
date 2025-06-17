import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import ShipInformationEditForm from "../../../../../components/ship-trip-management/ShipInformationEditForm";
import PassengersCabinsEditForm from "../../../../../components/ship-trip-management/PassengersCabinsEditForm";
import CargoCompartmentsEditForm from "../../../../../components/ship-trip-management/CargoCompartmentsEditForm";
import VehiclesParkingEditForm from "../../../../../components/ship-trip-management/VehiclesParkingEditForm";

function ScheduleNewShipsEditPage() {
    return (
        <PageLayout showBorder>
            <h1 className="text-xl text-left font-bold px-5">Edit</h1>
            <Tabs hideBorder>
                <Tabs.Item label="Ship information" value="ship-information">
                    <ShipInformationEditForm />
                </Tabs.Item>
                <Tabs.Item label="Passengers Cabins" value="passengers-cabins">
                    <PassengersCabinsEditForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Cargo Compartments"
                    value="cargo-compartments"
                >
                    <CargoCompartmentsEditForm />
                </Tabs.Item>
                <Tabs.Item label="Vehicles Parking's" value="vehicles-parkings">
                    <VehiclesParkingEditForm />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default ScheduleNewShipsEditPage;
