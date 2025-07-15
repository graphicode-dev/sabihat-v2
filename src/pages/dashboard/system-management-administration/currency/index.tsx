import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useInfinitePaginatedQuery } from "../../../../utils";
import { Currency } from "./types";
import { transformPaginatedDataToTableData } from "../../../../utils";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfiniteCurrency = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<Currency>({
        queryKey: ["currency", page.toString()],
        endpointKey: "currency",
        enabled: options?.enabled ?? true,
    });
};

function CurrencyPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: currencyData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteCurrency(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };
    const columns: TableColumn[] = [
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

    const flattenedData = transformPaginatedDataToTableData<Currency>(
        currencyData,
        (item) => ({
            currencyName: item.name,
            currencyCode: item.code,
            currencyRate: item.lastRate.rate,
            effectiveDate: item.lastRate.createdAt,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            currencyData?.pages &&
            currencyData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, currencyData?.pages, fetchNextPage]);

    if (isLoading && !currencyData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Currency"
                data={flattenedData}
                columns={columns}
                onAddClick={() =>
                    navigate("/system-management-administration/currency/add")
                }
                addLabel="Add Currency"
                itemsPerPage={currencyData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={currencyData?.pages[0]?.lastPage}
                totalCount={currencyData?.pages[0]?.totalCount}
                onPageChange={handlePageChange}
            />

            {isFetchingNextPage && (
                <div className="flex justify-center mt-4">
                    <Loading />
                </div>
            )}
        </PageLayout>
    );
}

export default CurrencyPage;
