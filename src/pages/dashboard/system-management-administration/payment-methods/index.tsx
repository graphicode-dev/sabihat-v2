import { DynamicTable } from "../../../../components/table";
import { columns, mockData } from "../../../../data/mockData";
import { useToast } from "../../../../hooks/useToast";
import PageLayout from "../../../../layout/PageLayout";

function PaymentMethodsPage() {
    const { addToast } = useToast();

    const addSuccessToast = () => {
        addToast({
            type: "success",
            title: "Success message",
            message: "This is a success message",
            duration: 5000,
            position: "top-right",
        });
    };

    return (
        <PageLayout>
            <DynamicTable
                title="All Employees"
                data={mockData}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
                onAddClick={() => {
                    addSuccessToast();
                }}
                addLabel="Add Employee"
            />
        </PageLayout>
    );
}

export default PaymentMethodsPage;
