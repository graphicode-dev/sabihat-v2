import PageLayout from "../../../../../../layout/PageLayout";
import ViewCard from "../../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockData } from "../../../../../../data/mockData";
import { TableData } from "../../../../../../types/table";
import { ViewCardData } from "../../../../../../types";
function MarineAgentViewPage() {
    const { id } = useParams();

    const [userData, setUserData] = useState<TableData | null>(null);

    useEffect(() => {
        // Fetch user data from API
        const fetchUserData = async () => {
            const user = mockData.find((item: TableData) => item.id === id);
            setUserData(user || null);
        };
        fetchUserData();
    }, []);

    return (
        <PageLayout>
            <ViewCard
                title={userData?.columns.name as string}
                subtitle={userData?.columns.role as string}
                variant="user"
                image={userData?.avatar}
                data={
                    {
                        Email: userData?.columns.email,
                        Phone: userData?.columns.phone,
                        "User ID": userData?.id,
                        Status: userData?.columns.status,
                        "Last Login": userData?.columns.lastLogin,
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default MarineAgentViewPage;
