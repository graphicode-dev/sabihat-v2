import PageLayout from "../../../../components/layout/PageLayout";
import ViewCard from "../../../../components/ui/ViewCard";

function SysMgmtAdminViewPage() {
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
        "Port From": "Dubai",
        "Ship To": "Jeddah",
        ETA: "2023-05-15",
        ETD: "2023-05-12",
        Description: "Cargo vessel carrying containers and vehicles",
        cabinName: "Premium Suite",
        adultsAvailable: 24,
        childrenAvailable: 12,
        agent: "Maritime Services Inc.",
        cargoName: "Container Bay A",
        availableWeight: "500 tons",
        availableSize: "250 sq.m",
        availableQuantity: 50,
        cargoAgent: "Global Shipping Ltd.",
        vehicleName: "Deck C",
        vehicleWeight: "200 tons",
        vehicleSize: "100 sq.m",
        vehicleQuantity: 25,
    };

    // Example data for default view card
    const defaultData = {
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
        cabinName: "Standard Cabin",
        adultsCount: 120,
        childrenCount: 40,
        cargoName: "Main Hold",
        cargoWeight: "45,000 tons",
        cargoSize: "12,000 sq.m",
        cargoQuantity: 1200,
        vehicleName: "Car Deck",
        vehicleWeight: "5,000 tons",
        vehicleSize: "2,500 sq.m",
        vehicleQuantity: 350,
    };

    return (
        <PageLayout>
            <h1 className="text-2xl font-bold mb-6">
                ViewCard Component Examples
            </h1>

            <div>
                <h2 className="text-xl font-bold mb-4">User View Card</h2>
                <ViewCard
                    title="Ahmad Percy"
                    subtitle="Admin"
                    variant="user"
                    image="/avatar.png"
                    data={userData}
                />
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4">Vessel View Card</h2>
                <ViewCard
                    title="Vessel Name"
                    subtitle="Voyage Number"
                    variant="vessel"
                    image="/ship.jpg"
                    data={vesselData}
                    actions={
                        <button className="bg-primary-500 text-white px-4 py-2 rounded-md">
                            Tickets
                        </button>
                    }
                />
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4">Default View Card</h2>
                <ViewCard
                    title="view"
                    variant="default"
                    data={defaultData}
                    actions={
                        <div className="flex space-x-2">
                            <button className="text-gray-500 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                    <span className="sr-only">Edit</span>
                                </svg>
                            </button>
                            <button className="text-gray-500 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    <span className="sr-only">Delete</span>
                                </svg>
                            </button>
                        </div>
                    }
                />
            </div>
        </PageLayout>
    );
}

export default SysMgmtAdminViewPage;
