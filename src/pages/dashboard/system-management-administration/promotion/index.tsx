import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { Promotion } from "./types";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfinitePromotion = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<Promotion>({
        queryKey: ["promotion", page.toString()],
        endpointKey: "promotion",
        enabled: options?.enabled ?? true,
    });
};

function PromotionPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: promotionData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfinitePromotion(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };

    const columns: TableColumn[] = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "type",
            header: "Promotion Type",
            accessorKey: "type",
        },
        {
            id: "value",
            header: "Promotion Value",
            accessorKey: "value",
        },
        {
            id: "fromDate",
            header: "From Date",
            accessorKey: "fromDate",
        },
        {
            id: "toDate",
            header: "To Date",
            accessorKey: "toDate",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<Promotion>(
        promotionData,
        (item) => ({
            name: item.name,
            type: item.type,
            value: item.value,
            fromDate: item.fromDate,
            toDate: item.toDate,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            promotionData?.pages &&
            promotionData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, promotionData?.pages, fetchNextPage]);

    if (isLoading && !promotionData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Promotions"
                data={flattenedData}
                columns={columns}
                addLabel="Add Promotion"
                onAddClick={() =>
                    navigate("/system-management-administration/promotion/add")
                }
                itemsPerPage={promotionData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={promotionData?.pages[0]?.lastPage}
                totalCount={promotionData?.pages[0]?.totalCount}
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

export default PromotionPage;
