import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import ExcessBaggagePriceB2CPassengerPage from "./ExcessBaggagePriceB2CPassenger";
import ExcessBaggagePriceB2CCargoPage from "./ExcessBaggagePriceB2CCargo";
import ExcessBaggagePriceB2CVehiclePage from "./ExcessBaggagePriceB2CVehicle";

function ExcessBaggagePriceB2CPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Price List"
                    value="passenger-price-list"
                >
                    <ExcessBaggagePriceB2CPassengerPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Cargo Price List"
                    value="cargo-price-list"
                >
                    <ExcessBaggagePriceB2CCargoPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Price List"
                    value="vehicle-price-list"
                >
                    <ExcessBaggagePriceB2CVehiclePage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default ExcessBaggagePriceB2CPage;
