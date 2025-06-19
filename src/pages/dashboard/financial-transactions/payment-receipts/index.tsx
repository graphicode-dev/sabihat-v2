import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

const PaymentReceiptsPage = () => {
    const columns: TableColumn[] = [
        {
            id: "date",
            header: "Date",
            accessorKey: "date",
        },
        {
            id: "journalNo",
            header: "Journal No",
            accessorKey: "journalNo",
        },
        {
            id: "layer",
            header: "Layer",
            accessorKey: "layer",
        },
        {
            id: "ledgerAccount",
            header: "Ledger Account",
            accessorKey: "ledgerAccount",
        },
        {
            id: "debit",
            header: "Debit",
            accessorKey: "debit",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                date: "1",
                journalNo: "Ledger Description",
                layer: "Ledger Type",
                ledgerAccount: "Sequence",
                debit: "Sequence",
            },
        },
        {
            id: "2",
            columns: {
                date: "2",
                journalNo: "Ledger Description",
                layer: "Ledger Type",
                ledgerAccount: "Sequence",
                debit: "Sequence",
            },
        },
        {
            id: "3",
            columns: {
                date: "3",
                journalNo: "Ledger Description",
                layer: "Ledger Type",
                ledgerAccount: "Sequence",
                debit: "Sequence",
            },
        },
        {
            id: "4",
            columns: {
                date: "4",
                journalNo: "Ledger Description",
                layer: "Ledger Type",
                ledgerAccount: "Sequence",
                debit: "Sequence",
            },
        },
        {
            id: "5",
            columns: {
                date: "5",
                journalNo: "Ledger Description",
                layer: "Ledger Type",
                ledgerAccount: "Sequence",
                debit: "Sequence",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Payment & Receipts"
                columns={columns}
                data={data}
                addLabel="Add Payment"
                onAddClick={() => {}}
            />
        </PageLayout>
    );
};

export default PaymentReceiptsPage;
