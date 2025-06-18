import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import PriceListsB2CPassengerPage from "./PriceListsB2CPassenger";
import PriceListsB2CCargoPage from "./PriceListsB2CCargo";
import PriceListsB2CVehiclePage from "./PriceListsB2CVehicle";

function PriceListsB2CPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Price List"
                    value="passenger-price-list"
                >
                    <PriceListsB2CPassengerPage />
                </Tabs.Item>
                <Tabs.Item label="Cargo Price List" value="cargo-price-list">
                    <PriceListsB2CCargoPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Price List"
                    value="vehicle-price-list"
                >
                    <PriceListsB2CVehiclePage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default PriceListsB2CPage;
