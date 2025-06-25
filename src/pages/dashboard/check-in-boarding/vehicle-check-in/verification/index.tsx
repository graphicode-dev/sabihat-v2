import { useState } from "react";
import Search from "../../../../../components/ui/Search";
import PageLayout from "../../../../../layout/PageLayout";
import { Link } from "react-router-dom";

interface Passenger {
    id: number;
    name: string;
    flight: string;
    status: string;
}

function VehicleCheckInVerificationPage() {
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Passenger[]>([]);

    // Mock data for search results
    const mockData: Passenger[] = [
        { id: 1, name: "John Doe", flight: "Flight 123", status: "Checked In" },
        { id: 2, name: "Jane Smith", flight: "Flight 456", status: "Pending" },
        {
            id: 3,
            name: "Bob Johnson",
            flight: "Flight 789",
            status: "Checked In",
        },
        { id: 4, name: "Alice Brown", flight: "Flight 101", status: "Pending" },
    ];

    return (
        <PageLayout showBorder>
            <h1 className="text-left text-xl font-bold mb-4">
                Travel Documents Verification
            </h1>
            <Search
                onSearch={(query) => setSearchQuery(query)}
                data={mockData}
                searchQuery={searchQuery || ""}
                setSearchQuery={setSearchQuery}
                setSearchResults={setSearchResults}
                searchFields={["name", "flight"]}
                placeholder="Search by name or flight number..."
            />

            {searchQuery && (
                <div className="mt-4">
                    {searchResults.length > 0 ? (
                        <>
                            <h3 className="text-lg font-semibold mb-2">
                                Search Results
                            </h3>
                            <div className="space-y-2">
                                {searchResults.map((result) => (
                                    <Link
                                        key={result.id}
                                        className="p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
                                        to={`/check-in-boarding/vehicle-check-in/verification/view/${result.id}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium">
                                                    {result.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Flight: {result.flight}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Status: {result.status}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-600">
                            No results found for "{searchQuery}"
                        </p>
                    )}
                </div>
            )}
        </PageLayout>
    );
}

export default VehicleCheckInVerificationPage;
