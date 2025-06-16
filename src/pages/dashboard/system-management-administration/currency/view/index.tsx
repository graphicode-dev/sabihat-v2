import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableColumn, TableData } from "../../../../../types/table";
import { ViewCardData } from "../../../../../types";
import { DynamicTable } from "../../../../../components/table";

function CurrencyViewPage() {
    // const { id } = useParams();

    const OLD_HISTORY_COLUMNS: TableColumn[] = [
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

    const OLD_HISTORY_DATA: TableData[] = [
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

    const data: TableData = {
        id: "1",
        columns: {
            currencyName: "**********",
            currencyCode: "**********",
            currencyRate: "**********",
            lastDate: "**********",
        },
    };

    return (
        <PageLayout className="flex flex-col gap-2" showBorder noPadding>
            <div className="p-5">
                <ViewCard
                    variant="default"
                    data={
                        {
                            "Currency Name": data?.columns.currencyName,
                            "Currency Code": data?.columns.currencyCode,
                            "Currency Rate": data?.columns.currencyRate,
                            "Last Date": data?.columns.lastDate,
                        } as ViewCardData
                    }
                    buttons
                    hideBorder
                />
            </div>
            {/* Separator */}
            <div className="border-b border-dark-50 my-4" />

            <div className="p-5">
                <DynamicTable
                    title="Old History"
                    data={OLD_HISTORY_DATA}
                    columns={OLD_HISTORY_COLUMNS}
                    initialView="grid"
                    itemsPerPage={10}
                    disableRowClick
                />
            </div>
        </PageLayout>
    );
}

export default CurrencyViewPage;
