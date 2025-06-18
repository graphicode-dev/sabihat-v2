import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import TicketsPassengerPage from "./TicketsPassenger";
import TicketsCargoPage from "./TicketsCargo";
import TicketsVehiclePage from "./TicketsVehiclePage";

function ticketsPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item
                    label="Passenger Price List"
                    value="passenger-price-list"
                >
                    <TicketsPassengerPage />
                </Tabs.Item>
                <Tabs.Item label="Cargo Price List" value="cargo-price-list">
                    <TicketsCargoPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicle Price List"
                    value="vehicle-price-list"
                >
                    <TicketsVehiclePage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default ticketsPage;
