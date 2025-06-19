import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

const ChartOfAccountPage = () => {
    const columns: TableColumn[] = [
        {
            id: "recordNo",
            header: "Record No",
            accessorKey: "recordNo",
        },
        {
            id: "ledgerDescription",
            header: "Ledger Description",
            accessorKey: "ledgerDescription",
        },
        {
            id: "ledgerType",
            header: "Ledger Type",
            accessorKey: "ledgerType",
        },
        {
            id: "sequence",
            header: "Sequence",
            accessorKey: "sequence",
        },
    ];
    const data: TableData[] = [
        {
            id: "1",
            columns: {
                recordNo: "1",
                ledgerDescription: "Ledger Description",
                ledgerType: "Ledger Type",
                sequence: "Sequence",
            },
        },
        {
            id: "2",
            columns: {
                recordNo: "2",
                ledgerDescription: "Ledger Description",
                ledgerType: "Ledger Type",
                sequence: "Sequence",
            },
        },
        {
            id: "3",
            columns: {
                recordNo: "3",
                ledgerDescription: "Ledger Description",
                ledgerType: "Ledger Type",
                sequence: "Sequence",
            },
        },
        {
            id: "4",
            columns: {
                recordNo: "4",
                ledgerDescription: "Ledger Description",
                ledgerType: "Ledger Type",
                sequence: "Sequence",
            },
        },
        {
            id: "5",
            columns: {
                recordNo: "5",
                ledgerDescription: "Ledger Description",
                ledgerType: "Ledger Type",
                sequence: "Sequence",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Chart of Account"
                columns={columns}
                data={data}
                addLabel="Add Chart of Account"
                onAddClick={() => {}}
            />
        </PageLayout>
    );
};

export default ChartOfAccountPage;
