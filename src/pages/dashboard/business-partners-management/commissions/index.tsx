import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { Commission } from "./types";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";
const useInfiniteCommission = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<Commission>({
        queryKey: ["commission", page.toString()],
        endpointKey: "commissions",
        enabled: options?.enabled ?? true,
    });
};

function CommissionsPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: commissionData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteCommission(currentPage);

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

    const flattenedData = transformPaginatedDataToTableData<Commission>(
        commissionData,
        (item) => ({
            partner:item.businessPartner.name,
            class:item.partnersClassification.nameClass,
            commissionType:item.commissionType,
            commissionValue:item.commissionValue,
            visitType:item.visitType,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            commissionData?.pages &&
            commissionData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, commissionData?.pages, fetchNextPage]);

    if (isLoading && !commissionData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Commissions Board"
                data={flattenedData}
                columns={columns}
                addLabel="Add Commissions Board"
                onAddClick={() => {
                    navigate(`/business-partners-management/commissions/add`);
                }}
                onRowClick={(rowId) =>
                    navigate(
                        `/business-partners-management/commissions/view/${rowId}`
                    )
                }
                hideBorder
                itemsPerPage={commissionData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={commissionData?.pages[0]?.lastPage}
                totalCount={commissionData?.pages[0]?.totalCount}
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

export default CommissionsPage;
