import { useParams } from "react-router-dom";
import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useEffect, useState } from "react";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";
import { statuses } from "../../../../../components/statusColors";

function ScheduleNewShipsViewPage() {
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
        const status =
            Object.keys(statuses)[
                Math.floor(Math.random() * Object.keys(statuses).length)
            ];
        return {
            id: (index + 1).toString(),
            statusType:
                status === "In Transit"
                    ? "orange"
                    : status === "Active"
                    ? "green"
                    : status === "Maintenance"
                    ? "red"
                    : "teal",
            columns: {
                "vessel name": "*******",
                "vessel type": "*******",
                "registration number": "*******",
                "IMO number": "*******",
                "mmsi number": "*******",
                flag: "*******",
                "operating status": status,
            },
        };
    });

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={
                    {
                        "vessel name": userData?.columns["vessel name"],
                        "vessel type": userData?.columns["vessel type"],
                        "registration number":
                            userData?.columns["registration number"],
                        "operating status":
                            userData?.columns["operating status"],
                        "IMO number": userData?.columns["IMO number"],
                        "mmsi number": userData?.columns["mmsi number"],
                        flag: userData?.columns.flag,
                        "Passengers Cabins": {
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: "",
                                },
                                {
                                    label: "Number of Passengers",
                                    value: "",
                                },
                            ],
                        },
                        "Cargo Compartments": {
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: "",
                                },
                                {
                                    label: "Weight",
                                    value: "",
                                },
                                {
                                    label: "Size",
                                    value: "",
                                },
                                {
                                    label: "Quantity",
                                    value: "",
                                },
                            ],
                        },
                        "Vehicles Parking's": {
                            fields: [
                                {
                                    label: "Cabin Name",
                                    value: "",
                                },
                                {
                                    label: "Weight",
                                    value: "",
                                },
                                {
                                    label: "Size",
                                    value: "",
                                },
                                {
                                    label: "Quantity",
                                    value: "",
                                },
                            ],
                        },
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default ScheduleNewShipsViewPage;
