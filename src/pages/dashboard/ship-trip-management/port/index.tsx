import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";

function PortPage() {
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
                initialView="grid"
                itemsPerPage={10}
                addLabel="Add Port"
            />
        </PageLayout>
    );
}

export default PortPage;
