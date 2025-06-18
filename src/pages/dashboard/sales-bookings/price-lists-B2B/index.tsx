import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import PriceListsB2BPassengerPage from "./PriceListsB2BPassenger";
import PriceListsB2BCargoPage from "./PriceListsB2BCargo";
import PriceListsB2BVehiclePage from "./PriceListsB2BVehiclePage";

function priceListsB2BPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Price List"
                    value="passenger-price-list"
                >
                    <PriceListsB2BPassengerPage />
                </Tabs.Item>
                <Tabs.Item label="Cargo Price List" value="cargo-price-list">
                    <PriceListsB2BCargoPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Price List"
                    value="vehicle-price-list"
                >
                    <PriceListsB2BVehiclePage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default priceListsB2BPage;
