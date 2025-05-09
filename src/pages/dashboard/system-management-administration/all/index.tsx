import PageLayout from "../../../../layout/PageLayout";
import { DynamicTable } from "../../../../components/table";
import { columns, mockData } from "../../../../data/mockData";
import { useToast } from "../../../../hooks/useToast";

function SystemManagementAdministrationPage() {
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
            />
        </PageLayout>
    );
}

export default SystemManagementAdministrationPage;
