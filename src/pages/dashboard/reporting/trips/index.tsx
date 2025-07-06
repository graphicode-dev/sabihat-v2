import Passenger from "../../../../components/reporting/trips/Passenger";
import Cargo from "../../../../components/reporting/trips/Cargo";
import Vehicle from "../../../../components/reporting/trips/Vehicle";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";

function TripsPage() {
    return (
        <PageLayout showBorder>
            <Tabs hideBorder>
                <Tabs.Item label="Passenger" value="passenger">
                    <Passenger />
                </Tabs.Item>
                <Tabs.Item label="Cargo" value="cargo">
                    <Cargo />
                </Tabs.Item>
                <Tabs.Item label="Vehicle" value="vehicle">
                    <Vehicle />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default TripsPage;
