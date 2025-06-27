import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";

function PortViewPage() {
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();
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
                "Port Name": "*******",
                "Abbreviation Code": "*******",
                Country: "*******",
            },
        };
    });

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Port Name",
                                    value: userData?.columns[
                                        "Port Name"
                                    ]?.toString(),
                                },
                                {
                                    label: "Abbreviation Code",
                                    value: userData?.columns[
                                        "Abbreviation Code"
                                    ]?.toString(),
                                },
                                {
                                    label: "Country",
                                    value: userData?.columns.Country?.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() => {
                    navigate(`/ship-trip-management/port/edit/${id}`);
                }}
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this port?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Port deleted successfully",
                                        title: "Success!",
                                    });
                                    navigate(-1);
                                },
                                variant: "primary",
                            },
                            {
                                text: "Cancel",
                                onClick: () => {},
                                variant: "secondary",
                            },
                        ]
                    );
                }}
                buttons
            />
        </PageLayout>
    );
}

export default PortViewPage;
