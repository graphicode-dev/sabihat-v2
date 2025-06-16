import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function CurrencyPage() {
    const navigate = useNavigate();
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Currency Name",
            accessorKey: "currencyName",
        },
        {
            id: "2",
            header: "Currency Code",
            accessorKey: "currencyCode",
        },
        {
            id: "3",
            header: "Currency Rate",
            accessorKey: "currencyRate",
        },
        {
            id: "4",
            header: "Last Date",
            accessorKey: "lastDate",
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                currencyName: "**********",
                currencyCode: "**********",
                currencyRate: "**********",
                lastDate: "**********",
            },
        },
        {
            id: "2",
            columns: {
                currencyName: "**********",
                currencyCode: "**********",
                currencyRate: "**********",
                lastDate: "**********",
            },
        },
        {
            id: "3",
            columns: {
                currencyName: "**********",
                currencyCode: "**********",
                currencyRate: "**********",
                lastDate: "**********",
            },
        },
        {
            id: "4",
            columns: {
                currencyName: "**********",
                currencyCode: "**********",
                currencyRate: "**********",
                lastDate: "**********",
            },
        },
        {
            id: "5",
            columns: {
                currencyName: "**********",
                currencyCode: "**********",
                currencyRate: "**********",
                lastDate: "**********",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Currency"
                data={data}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
                onAddClick={() =>
                    navigate("/system-management-administration/currency/add")
                }
                addLabel="Add Currency"
            />
        </PageLayout>
    );
}

export default CurrencyPage;
