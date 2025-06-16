import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { ViewCardData } from "../../../../../types";

function PortViewPage() {
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
                data={
                    {
                        "Port Name": userData?.columns["Port Name"],
                        "Abbreviation Code":
                            userData?.columns["Abbreviation Code"],
                        Country: userData?.columns.Country,
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default PortViewPage;
