import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";
import defaultUser from "../../../../../assets/images/default-user.png";

function UserProfilesViewPage() {
    // const { id } = useParams();
    const data: TableData = {
        id: "1",
        avatar: defaultUser,
        columns: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "123-456-7890",
            address: "123 Main St, Anytown, USA",
            role: "Admin",
        },
    };

    return (
        <PageLayout>
            <ViewCard
                title={data?.columns.name.toString()}
                subtitle={data?.columns.role.toString()}
                variant="user"
                image={data?.avatar}
                data={
                    {
                        email: data?.columns.email,
                        phone: data?.columns.phone,
                        address: data?.columns.address,
                    } as ViewCardData
                }
                buttons
            />
        </PageLayout>
    );
}

export default UserProfilesViewPage;
