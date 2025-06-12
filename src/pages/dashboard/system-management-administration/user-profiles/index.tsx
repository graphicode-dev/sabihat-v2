import PageLayout from "../../../../layout/PageLayout";
import { DynamicTable } from "../../../../components/table";
import { columns, mockData } from "../../../../data/mockData";
import { useToast } from "../../../../hooks/useToast";
import Tabs from "../../../../components/ui/Tabs";

function UserProfilesPage() {
    const { addToast } = useToast();

    // const addErrorToast = () => {
    //     addToast({
    //         type: "error",
    //         title: "Error message",
    //         message: "This is an error message",
    //         duration: 5000,
    //         position: "top-right",
    //     });
    // };

    // const addWarningToast = () => {
    //     addToast({
    //         type: "warning",
    //         title: "Warning message",
    //         message: "This is a warning message",
    //         duration: 5000,
    //         position: "top-right",
    //     });
    // };

    const addSuccessToast = () => {
        addToast({
            type: "success",
            title: "Success message",
            message: "This is a success message",
            duration: 5000,
            position: "top-right",
        });
    };

    // const addInfoToast = () => {
    //     addToast({
    //         type: "info",
    //         title: "Info message",
    //         message: "This is an info message",
    //         duration: 5000,
    //         position: "top-right",
    //     });
    // };

    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item value="all" label="All">
                    <DynamicTable
                        title="All Users"
                        data={mockData}
                        columns={columns}
                        initialView="grid"
                        itemsPerPage={10}
                        onAddClick={() => {
                            addSuccessToast();
                        }}
                        addLabel="Add User"
                        bulkActionLabel="Bulk Action"
                        onBulkAction={(selectedIds) => {
                            console.log("Selected IDs:", selectedIds);
                        }}
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item value="active" label="Active">
                    Active
                </Tabs.Item>
                <Tabs.Item value="inactive" label="Inactive">
                    Inactive
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default UserProfilesPage;
