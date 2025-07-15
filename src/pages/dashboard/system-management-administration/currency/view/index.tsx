import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams, useSearchParams } from "react-router-dom";
import { TableColumn } from "../../../../../types/table";
import { DynamicTable } from "../../../../../components/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { Currency, CurrencyRate } from "../types";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../../utils";
import { useEffect } from "react";

const useInfiniteCurrencyRates = (
    page: number = 1,
    currencyId: string,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<CurrencyRate>({
        queryKey: ["currencyRates", currencyId, page.toString()],
        endpointKey: "currencyRate",
        enabled: options?.enabled ?? true,
        additionalParams: [currencyId],
    });
};

const useCurrencyById = (id: string) => {
    return useQuery({
        queryKey: ["currency", id],
        queryFn: async () => {
            const response = await ENDPOINTS.currency.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};

function CurrencyViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: currencyRatesData,
        error: currencyRatesError,
        isLoading: currencyRatesLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteCurrencyRates(currentPage, id || "");

    const flattenedData = transformPaginatedDataToTableData<CurrencyRate>(
        currencyRatesData,
        (item) => ({
            currencyRate: item.rate,
            effectiveDate: item.createdAt,
        })
    );

    const {
        data: currency,
        isLoading: currencyLoading,
        error: currencyError,
    } = useCurrencyById(id || "");

    const currencyData = (currency?.data as Currency) || ({} as Currency);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };

    const TABLE_COLUMNS: TableColumn[] = [
        {
            id: "currencyName",
            header: "Currency Name",
            accessorKey: "currencyName",
        },
        {
            id: "currencyCode",
            header: "Currency Code",
            accessorKey: "currencyCode",
        },
        {
            id: "currencyRate",
            header: "Currency Rate",
            accessorKey: "currencyRate",
        },
        {
            id: "effectiveDate",
            header: "Effective Date",
            accessorKey: "effectiveDate",
        },
    ];

    useEffect(() => {
        if (
            currentPage > 1 &&
            currencyRatesData?.pages &&
            currencyRatesData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, currencyRatesData?.pages, fetchNextPage]);

    if (currencyLoading || (currencyRatesLoading && !currencyRatesData))
        return <Loading />;
    if (currencyError || currencyRatesError)
        return <Error message={currencyError?.message || "Unknown error"} />;

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
                                        value: currencyData?.name.toString(),
                                    },
                                    {
                                        label: "Currency Code",
                                        value: currencyData?.code.toString(),
                                    },
                                    {
                                        label: "Currency Rate",
                                        value: currencyData?.lastRate.rate.toString(),
                                    },
                                    {
                                        label: "Effective Date",
                                        value: currencyData?.lastRate.createdAt.toString(),
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
                    data={flattenedData}
                    columns={TABLE_COLUMNS}
                    addLabel="Add Rate"
                    onAddClick={() =>
                        navigate(
                            `/system-management-administration/currency/view/${id}/add_rate`
                        )
                    }
                    onRowClick={(rowId) =>
                        navigate(
                            `/system-management-administration/currency/view/${id}/view_rate/${rowId}`
                        )
                    }
                    itemsPerPage={currencyRatesData?.pages[0]?.perPage}
                    currentPage={currentPage}
                    lastPage={currencyRatesData?.pages[0]?.lastPage}
                    totalCount={currencyRatesData?.pages[0]?.totalCount}
                    onPageChange={handlePageChange}
                />
                {isFetchingNextPage && (
                    <div className="flex justify-center mt-4">
                        <Loading />
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

export default CurrencyViewPage;
