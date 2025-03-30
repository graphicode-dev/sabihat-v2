import PageLayout from "../../components/layout/PageLayout";
import { DynamicTable } from "../../components/table";
import { columns, mockData } from "../../data/mockData";

function DashboardHome() {
    return (
        <PageLayout>
            <DynamicTable
                title="All companies"
                data={mockData}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
                onAddClick={() => {
                    console.log("Add company clicked");
                }}
                addLabel="Add company"
                onBulkAction={(ids) => {
                    console.log("Bulk action on", ids);
                }}
                bulkActionLabel="Process selected"
            />
        </PageLayout>
    );
}

export default DashboardHome;
