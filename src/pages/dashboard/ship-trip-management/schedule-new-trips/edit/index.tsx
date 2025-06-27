import PageLayout from "../../../../../layout/PageLayout";
import Tabs from "../../../../../components/ui/Tabs";
import TripInformationEditPage from "../../../../../components/ship-trip-management/edit/TripInformationEditPage";
import PassengersAgentAllocationEditPage from "../../../../../components/ship-trip-management/edit/PassengersAgentAllocationEditPage";
import CargoAgentAllocationEditPage from "../../../../../components/ship-trip-management/edit/CargoAgentAllocationEditPage";
import VehiclesAgentAllocationEditPage from "../../../../../components/ship-trip-management/edit/VehiclesAgentAllocationEditPage";

function ScheduleNewTripsEditPage() {
    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item label="Trip information" value="trip-information">
                    <TripInformationEditPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Passengers agent allocation"
                    value="passengers-agent-allocation"
                >
                    <PassengersAgentAllocationEditPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Cargo agent allocation"
                    value="cargo-agent-allocation"
                >
                    <CargoAgentAllocationEditPage />
                </Tabs.Item>
                <Tabs.Item
                    label="Vehicles agent allocation"
                    value="vehicles-agent-allocation"
                >
                    <VehiclesAgentAllocationEditPage />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default ScheduleNewTripsEditPage;
