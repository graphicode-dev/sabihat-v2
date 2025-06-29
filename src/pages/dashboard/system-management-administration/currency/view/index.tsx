import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableColumn, TableData } from "../../../../../types/table";
import { DynamicTable } from "../../../../../components/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";

function CurrencyViewPage() {
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();
    const { id } = useParams();

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
                    data={{
                        rows: [
                            {
                                fields: [
                                    {
                                        label: "Currency Name",
                                        value: data?.columns.currencyName.toString(),
                                    },
                                    {
                                        label: "Currency Code",
                                        value: data?.columns.currencyCode.toString(),
                                    },
                                    {
                                        label: "Currency Rate",
                                        value: data?.columns.currencyRate.toString(),
                                    },
                                    {
                                        label: "Last Date",
                                        value: data?.columns.lastDate.toString(),
                                    },
                                ],
                            },
                        ],
                    }}
                    onEdit={() =>
                        navigate(
                            `/system-management-administration/currency/edit/${id}`
                        )
                    }
                    onDelete={() => {
                        addAlertToast(
                            "Are you sure you want to delete this currency?",
                            [
                                {
                                    text: "OK",
                                    onClick: () => {
                                        addToast({
                                            type: "success",
                                            message:
                                                "Currency deleted successfully",
                                            title: "Success!",
                                        });
                                        navigate(-1);
                                    },
                                    variant: "primary",
                                },
                                {
                                    text: "Cancel",
                                    onClick: () => {},
                                    variant: "secondary",
                                },
                            ]
                        );
                    }}
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
                    disableRowClick
                />
            </div>
        </PageLayout>
    );
}

export default CurrencyViewPage;
