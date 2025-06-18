import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import PassengerPriceListPage from "./PassengerPriceList";
import CargoPriceListPage from "./CargoPriceList";
import VehiclePriceListPage from "./VehiclePriceList";

function priceListsB2BPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Price List"
                    value="passenger-price-list"
                >
                    <PassengerPriceListPage />
                </Tabs.Item>
                <Tabs.Item label="Cargo Price List" value="cargo-price-list">
                    <CargoPriceListPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Price List"
                    value="vehicle-price-list"
                >
                    <VehiclePriceListPage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default priceListsB2BPage;
