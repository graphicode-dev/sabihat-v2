import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";
import { useNavigate } from "react-router-dom";

function PaymentMethodsPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "accountName",
            header: "Account Name",
            accessorKey: "accountName",
        },
        {
            id: "accountType",
            header: "Account Type",
            accessorKey: "accountType",
        },
        {
            id: "currency",
            header: "Currency",
            accessorKey: "currency",
        },
        {
            id: "accountNumber",
            header: "Account Number",
            accessorKey: "accountNumber",
        },
        {
            id: "accountStatus",
            header: "Account Status",
            accessorKey: "accountStatus",
        },
        {
            id: "note",
            header: "Note",
            accessorKey: "note",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                accountName: "*******",
                accountType: "*******",
                currency: "*******",
                accountNumber: "*******",
                accountStatus: "*******",
                note: "*******",
            },
        },
        {
            id: "2",
            columns: {
                accountName: "*******",
                accountType: "*******",
                currency: "*******",
                accountNumber: "*******",
                accountStatus: "*******",
                note: "*******",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Payment Methods"
                data={data}
                columns={columns}
                initialView="grid"
                onAddClick={() => {
                    navigate(
                        "/system-management-administration/payment-methods/add"
                    );
                }}
                addLabel="Add Payment Method"
            />
        </PageLayout>
    );
}

export default PaymentMethodsPage;
