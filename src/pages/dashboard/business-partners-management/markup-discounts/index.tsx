import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { MarkUp } from "./types";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import Error from "../../../../components/ui/Error";
import Loading from "../../../../components/ui/Loading";
import { useEffect } from "react";

const useInfiniteMarkupDiscounts = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<MarkUp>({
        queryKey: ["markupDiscount", page.toString()],
        endpointKey: "markupDiscounts",
        enabled: options?.enabled ?? true,
    });
};

function MarkUpPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: markupDiscountData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteMarkupDiscounts(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };
    const columns: TableColumn[] = [
        {
            id: "partner",
            header: "Partner",
            accessorKey: "partner",
        },
        {
            id: "class",
            header: "Class",
            accessorKey: "class",
        },
        {
            id: "commissionType",
            header: "Commission Type",
            accessorKey: "commissionType",
        },
        {
            id: "commissionValue",
            header: "Commission Value",
            accessorKey: "commissionValue",
        },
        {
            id: "visitType",
            header: "Visit Type",
            accessorKey: "visitType",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<MarkUp>(
        markupDiscountData,
        (item) => ({
            partner: item.businessPartner.name,
            class: item.partnersClassification.nameClass,
            commissionType: item.markupDiscountType,
            commissionValue: item.markupDiscountValue,
            visitType: item.visitType,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            markupDiscountData?.pages &&
            markupDiscountData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, markupDiscountData?.pages, fetchNextPage]);

    if (isLoading && !markupDiscountData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All  Markup & Discounts Board"
                data={flattenedData}
                columns={columns}
                addLabel="Add Markup & Discounts Board"
                onAddClick={() => {
                    navigate(
                        `/business-partners-management/markup-discounts/add`
                    );
                }}
                onRowClick={(rowId) =>
                    navigate(
                        `/business-partners-management/markup-discounts/view/${rowId}`
                    )
                }
                hideBorder
                itemsPerPage={markupDiscountData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={markupDiscountData?.pages[0]?.lastPage}
                totalCount={markupDiscountData?.pages[0]?.totalCount}
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

export default MarkUpPage;
