import Tabs from "../../../../../components/ui/Tabs";
import PageLayout from "../../../../../layout/PageLayout";
import ShipInformationAddForm from "../../../../../components/ship-trip-management/add/ShipInformationAddForm";
import PassengersCabinsAddForm from "../../../../../components/ship-trip-management/add/PassengersCabinsAddForm";
import CargoCompartmentsAddForm from "../../../../../components/ship-trip-management/add/CargoCompartmentsAddForm";
import VehiclesParkingAddForm from "../../../../../components/ship-trip-management/add/VehiclesParkingAddForm";

function ScheduleNewShipsAddPage() {
    return (
        <PageLayout showBorder>
            <h1 className="text-xl text-left font-bold px-5">Add</h1>
            <Tabs hideBorder>
                <Tabs.Item label="Ship information" value="ship-information">
                    <ShipInformationAddForm />
                </Tabs.Item>
                <Tabs.Item label="Passengers Cabins" value="passengers-cabins">
                    <PassengersCabinsAddForm />
                </Tabs.Item>
                <Tabs.Item
                    label="Cargo Compartments"
                    value="cargo-compartments"
                >
                    <CargoCompartmentsAddForm />
                </Tabs.Item>
                <Tabs.Item label="Vehicles Parking's" value="vehicles-parkings">
                    <VehiclesParkingAddForm />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default ScheduleNewShipsAddPage;
