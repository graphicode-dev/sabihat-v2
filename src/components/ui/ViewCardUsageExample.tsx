import PageLayout from "../layout/PageLayout";
import ViewCard from "./ViewCard";

function ViewCardUsageExample() {
    // Example data for user view card
    const userData = {
        Email: "ahmadp@gmail.com",
        Phone: "9704938765",
        "User ID": "1",
        Status: "Active",
        "Last Login": "Today at 2:34 PM",
    };

    // Example data for vessel view card
    const vesselData = {
        // Basic vessel info as regular fields
        "Port From": "Dubai",
        "Ship To": "Jeddah",
        ETA: "2023-05-15",
        ETD: "2023-05-12",
        Description: "Cargo vessel carrying containers and vehicles",

        // Sections with fields
        "Passengers Cabins": [
            { label: "Cabin Name", value: "Premium Suite" },
            { label: "Number of Adults Available", value: 24 },
            { label: "Number of Children Available", value: 12 },
        ],
        "Cargo Compartments": [
            { label: "Cabin Name", value: "Container Bay A" },
            { label: "Available Weight", value: "500 tons" },
            { label: "Available Size", value: "250 sq.m" },
            { label: "Available Quantity", value: 50 },
            { label: "Agent", value: "Maritime Services Inc." },
            { label: "Cargo Name", value: "Container Bay A" },
        ],
        "Vehicles Parking's": [
            { label: "Cabin Name", value: "Deck C" },
            { label: "Available Weight", value: "200 tons" },
            { label: "Available Size", value: "100 sq.m" },
            { label: "Available Quantity", value: 25 },
        ],
    };

    // Example data for default view card
    const defaultData = {
        // Basic vessel info as regular fields
        "Vessel Name": "Ocean Explorer",
        "Vessel Type": "Container Ship",
        "Registration Number": "REG-12345-XYZ",
        "Operating Status": "Active",
        "Call Sign": "OECP1",
        "IMO Number": "IMO9876543",
        "MMSI Number": "123456789",
        Flag: "Panama",
        "Gross Weight": "85,000 tons",
        "Dead Weight": "65,000 tons",
        Breadth: "32.2m",
        "ISM Manager": "Global Maritime Ltd.",
        "Ship Commercial Manager": "Ocean Freight Inc.",
        "Classification Status": "Class A",
        Builder: "Hyundai Heavy Industries",
        "Year Of Build": "2018",

        // Sections with fields
        "Passengers Cabins": [
            { label: "Cabin Name", value: "Standard Cabin" },
            { label: "Number of Adults", value: 120 },
            { label: "Number of Children", value: 40 },
        ],
        "Cargo Compartments": [
            { label: "Cabin Name", value: "Main Hold" },
            { label: "Weight", value: "45,000 tons" },
            { label: "Size", value: "12,000 sq.m" },
            { label: "Quantity", value: 1200 },
        ],
        "Vehicles Parking's": [
            { label: "Cabin Name", value: "Car Deck" },
            { label: "Weight", value: "5,000 tons" },
            { label: "Size", value: "2,500 sq.m" },
            { label: "Quantity", value: 350 },
        ],
    };

    return (
        <PageLayout>
            <div className="flex flex-col gap-6">
                <ViewCard
                    title="Ahmad Percy"
                    subtitle="Admin"
                    variant="user"
                    image="/images/default-user.png"
                    data={userData}
                    buttons
                />

                <ViewCard
                    title="Vessel Name"
                    subtitle="Voyage Number"
                    variant="vessel"
                    image="/images/default-ship.png"
                    data={vesselData}
                    buttons
                    ticketButton
                />

                <ViewCard
                    title="view"
                    variant="default"
                    data={defaultData}
                    buttons
                />
            </div>
        </PageLayout>
    );
}

export default ViewCardUsageExample;
