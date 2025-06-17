import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { useNavigate } from "react-router-dom";

function PortPage() {
    const navigate = useNavigate();
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

    const columns = [
        {
            id: "Port Name",
            header: "Port Name",
            accessorKey: "Port Name",
            sortable: true,
        },
        {
            id: "Abbreviation Code",
            header: "Abbreviation Code",
            accessorKey: "Abbreviation Code",
            sortable: true,
        },
        {
            id: "Country",
            header: "Country",
            accessorKey: "Country",
            sortable: true,
        },
    ];
    return (
        <PageLayout>
            <DynamicTable
                title="All Ports"
                data={data}
                columns={columns}
                addLabel="Add Port"
                onAddClick={() => {
                    navigate(`/ship-trip-management/port/add`);
                }}
            />
        </PageLayout>
    );
}

export default PortPage;
