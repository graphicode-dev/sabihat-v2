import { useParams } from "react-router-dom";
import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { ViewCardData } from "../../../../../types";
import { useEffect, useState } from "react";
import { TableData } from "../../../../../types/table";

function ScheduleNewTripsViewPage() {
    const { id } = useParams();

    const [userData, setUserData] = useState<TableData | null>(null);

    useEffect(() => {
        // Fetch user data from API
        const fetchUserData = async () => {
            const user = data.find((item: TableData) => item.id === id);
            setUserData(user || null);
        };
        fetchUserData();
    }, []);

    const data = Array.from({ length: 100 }, (_, index) => {
        return {
            id: (index + 1).toString(),
            columns: {
                "vessel name": "*******",
                "Voyage Number": "*******",
                "Port From": "*******",
                "Port To": "*******",
                ETD: "*******",
                ETA: "*******",
            },
        };
    });

    return (
        <PageLayout>
            <ViewCard
                title="Vessel Name"
                variant="vessel"
                subtitle="Voyage Number"
                data={
                    {
                        "Port From": userData?.columns["Port From"],
                        "Port To": userData?.columns["Port To"],
                        ETD: userData?.columns["ETD"],
                        ETA: userData?.columns["ETA"],
                        Description: userData?.columns["Description"],

                        "Passengers Cabins": {
                            mainTitle: "Agent Allocation",
                            title: "Passengers Cabins",
                            fields: [
                                { label: "Cabin Name", value: "*******" },
                                { label: "Number of Passengers", value: "*******" },
                                { label: "Cabin Name", value: "*******" },
                                { label: "Number of Passengers", value: "*******" },
                            ],
                        },
                        "Cargo Compartments": {
                            fields: [
                                { label: "Cabin Name", value: "*******" },
                                { label: "Agent1", value: "*******" },
                                { label: "Available weight", value: "*******" },
                                { label: "Cabin Name", value: "*******" },
                                { label: "Agent1", value: "*******" },
                                { label: "Available weight", value: "*******" },
                            ],
                        },
                        "Vehicle Packages": {
                            fields: [
                                { label: "Cabin Name", value: "*******" },
                                { label: "Agent1", value: "*******" },
                                { label: "Available Size", value: "*******" },
                                { label: "Available Quantity", value: "*******" },
                            ],
                        },
                        "Available": {
                            fields: [
                                { label: "Cabin Name", value: "*******" },
                                { label: "Number of Passengers", value: "*******" },
                                { label: "Cabin Name", value: "*******" },
                                { label: "Number of Passengers", value: "*******" },
                            ],
                        },
                    } as ViewCardData
                }
                buttons
                ticketButton
            />
        </PageLayout>
    );
}

export default ScheduleNewTripsViewPage;
