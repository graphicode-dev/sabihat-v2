import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import ExcessBaggagePriceListsB2BPassengerPage from "./ExcessBaggagePriceB2BPassenger";
import ExcessBaggagePriceListsB2BCargoPage from "./ExcessBaggagePriceB2BCargo";
import ExcessBaggagePriceListsB2BVehiclePage from "./ExcessBaggagePriceB2BVehicle";

function ExcessBaggagePriceB2BPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Price List"
                    value="passenger-price-list"
                >
                    <ExcessBaggagePriceListsB2BPassengerPage />
                </Tabs.Item>
                <Tabs.Item label="Cargo Price List" value="cargo-price-list">
                    <ExcessBaggagePriceListsB2BCargoPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Price List"
                    value="vehicle-price-list"
                >
                    <ExcessBaggagePriceListsB2BVehiclePage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default ExcessBaggagePriceB2BPage;
