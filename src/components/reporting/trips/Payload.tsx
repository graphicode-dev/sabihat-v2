import { useEffect, useState } from "react";
import ReportingDropDown from "../ReportingDropDown";

interface PayloadSectionProps {
    title: string;
    columns: string[];
    data: Array<Record<string, string | number>>;
}

const PayloadSection = ({ title, columns, data }: PayloadSectionProps) => {
    return (
        <div className="mt-6">
            {/* Title */}
            <div className="px-4 py-3">
                <h3 className="text-xl text-green-600 font-medium text-left">
                    {title}
                </h3>
            </div>

            {/* Table */}
            {data.length === 0 ? (
                <div className="px-4 py-3 text-gray-700 text-center">
                    No data available
                </div>
            ) : (
                <div className="mt-2">
                    <div
                        className="grid"
                        style={{
                            gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                        }}
                    >
                        {/* Headers */}
                        {columns.map((column, index) => (
                            <div
                                key={`header-${index}`}
                                className="px-4 py-3 text-gray-500 text-left"
                            >
                                {column}
                            </div>
                        ))}

                        {/* Data rows */}
                        {data.map((row, rowIndex) => (
                            <>
                                {columns.map((column, colIndex) => {
                                    const key = column
                                        .toLowerCase()
                                        .replace(/\s+/g, " ");
                                    return (
                                        <div
                                            key={`cell-${rowIndex}-${colIndex}`}
                                            className="px-4 py-3 text-gray-700 text-left"
                                        >
                                            {row[key] || "*****"}
                                        </div>
                                    );
                                })}
                            </>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

function Payload() {
    // Sample data for passenger section
    const passengerData = [
        {
            "passenger type": "Adult",
            "cabin class": "Economy",
            qty: 24,
            "total weight": "1,920 kg",
            trip: "today",
        },
        {
            "passenger type": "Child",
            "cabin class": "Economy",
            qty: 8,
            "total weight": "320 kg",
            trip: "today",
        },
        {
            "passenger type": "Adult",
            "cabin class": "Business",
            qty: 6,
            "total weight": "480 kg",
            trip: "yesterday",
        },
        {
            "passenger type": "Child",
            "cabin class": "Business",
            qty: 2,
            "total weight": "80 kg",
            trip: "this week",
        },
    ];

    // Sample data for cargo section
    const cargoData = [
        {
            "cargo type": "Luggage",
            weight: "540 kg",
            volume: "3.6 m³",
            trip: "today",
        },
        {
            "cargo type": "Mail",
            weight: "120 kg",
            volume: "0.8 m³",
            trip: "today",
        },
        {
            "cargo type": "Freight",
            weight: "860 kg",
            volume: "4.2 m³",
            trip: "yesterday",
        },
    ];

    const vehicleData = [
        {
            "vehicle type": "Car",
            weight: "1,200 kg",
            volume: "2.5 m³",
            trip: "today",
        },
        {
            "vehicle type": "Truck",
            weight: "5,000 kg",
            volume: "10 m³",
            trip: "today",
        },
        {
            "vehicle type": "Bus",
            weight: "2,500 kg",
            volume: "5 m³",
            trip: "yesterday",
        },
    ];

    const [trips] = useState<{ key: string; value: string }[]>([
        { key: "all", value: "All" },
        { key: "today", value: "Today" },
        { key: "yesterday", value: "Yesterday" },
        { key: "this week", value: "This Week" },
        { key: "this month", value: "This Month" },
        { key: "this year", value: "This Year" },
    ]);
    const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

    const [filteredPassengerData, setFilteredPassengerData] =
        useState(passengerData);
    const [filteredCargoData, setFilteredCargoData] = useState(cargoData);
    const [filteredVehicleData, setFilteredVehicleData] = useState(vehicleData);

    useEffect(() => {
        if (selectedTrip && selectedTrip !== "all") {
            // Filter passenger data
            const filteredPassengers = passengerData.filter(
                (item) => item.trip === selectedTrip.toLowerCase()
            );
            setFilteredPassengerData(filteredPassengers);

            // Filter cargo data
            const filteredCargo = cargoData.filter(
                (item) => item.trip === selectedTrip.toLowerCase()
            );
            setFilteredCargoData(filteredCargo);

            // Filter vehicle data
            const filteredVehicle = vehicleData.filter(
                (item) => item.trip === selectedTrip.toLowerCase()
            );
            setFilteredVehicleData(filteredVehicle);
        } else {
            // Show all data
            setFilteredPassengerData(passengerData);
            setFilteredCargoData(cargoData);
            setFilteredVehicleData(vehicleData);
        }
    }, [selectedTrip]);

    return (
        <div className="p-4">
            <div className="space-y-4">
                <div className="flex justify-start items-center gap-5">
                    {/* Trip */}
                    <div className="w-1/7">
                        <ReportingDropDown
                            options={trips}
                            value={selectedTrip}
                            onChange={(value) => setSelectedTrip(value)}
                            placeholder="Choose Trip"
                        />
                    </div>
                </div>

                {/* Data */}
                <div className="mt-4">
                    {/* Passenger Section */}
                    <PayloadSection
                        title="Passenger"
                        columns={[
                            "Passenger Type",
                            "Cabin Class",
                            "Qty",
                            "Total Weight",
                        ]}
                        data={filteredPassengerData}
                    />

                    {/* Cargo Section */}
                    <PayloadSection
                        title="Cargo"
                        columns={[
                            "Cargo Type",
                            "Cabin Class",
                            "Qty",
                            "Total Weight",
                        ]}
                        data={filteredCargoData}
                    />

                    {/* Vehicles Section */}
                    <PayloadSection
                        title="vehicles"
                        columns={[
                            "Vehicle Type",
                            "Cabin Class",
                            "Qty",
                            "Total Weight",
                        ]}
                        data={filteredVehicleData}
                    />
                </div>

                {/* Total */}
                <div className="mt-4">
                    <div className="w-full flex justify-between px-3">
                        <h3 className="text-xl text-green-600 font-medium text-left w-3/4">
                            Total Payload
                        </h3>
                        <h3 className="text-xl text-green-600 font-medium text-left w-1/4">
                            **********
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payload;
