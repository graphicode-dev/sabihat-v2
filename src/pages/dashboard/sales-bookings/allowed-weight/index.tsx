import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import AllowedWeightPassengerPage from "./AllowedWeightPassenger";
import AllowedWeightCargoPage from "./AllowedWeightCargo";
import AllowedWeightVehiclePage from "./AllowedWeightVehicle";

function AllowedWeightPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Allowed Weight"
                    value="passenger-allowed-weight"
                >
                    <AllowedWeightPassengerPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Cargo Allowed Weight"
                    value="cargo-allowed-weight"
                >
                    <AllowedWeightCargoPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Allowed Weight"
                    value="vehicle-allowed-weight"
                >
                    <AllowedWeightVehiclePage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default AllowedWeightPage;
