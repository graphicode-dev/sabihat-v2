import PageLayout from "../../../../layout/PageLayout";
import { DynamicTable } from "../../../../components/table";
import { TableColumn } from "../../../../types/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tax } from "./types";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfiniteTax = (page: number = 1, options?: { enabled?: boolean }) => {
    return useInfinitePaginatedQuery<Tax>({
        queryKey: ["tax", page.toString()],
        endpointKey: "tax",
        enabled: options?.enabled ?? true,
    });
};

function TaxPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: taxData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteTax(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };

    const columns: TableColumn[] = [
        {
            id: "name",
            header: "Tax Name",
            accessorKey: "name",
        },
        {
            id: "type",
            header: "Tax Type",
            accessorKey: "type",
        },
        {
            id: "amountValue",
            header: "Amount Value",
            accessorKey: "amountValue",
        },
        {
            id: "taxBase",
            header: "Tax Base",
            accessorKey: "taxBase",
        },
        {
            id: "description",
            header: "Description",
            accessorKey: "description",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<Tax>(
        taxData,
        (item) => ({
            name: item.name,
            type: item.type,
            amountValue: item.amountValue,
            taxBase: item.taxBase,
            description: item.description,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            taxData?.pages &&
            taxData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, taxData?.pages, fetchNextPage]);

    if (isLoading && !taxData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Taxes"
                data={flattenedData}
                columns={columns}
                addLabel="Add Tax"
                onAddClick={() =>
                    navigate("/system-management-administration/tax/add")
                }
                itemsPerPage={taxData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={taxData?.pages[0]?.lastPage}
                totalCount={taxData?.pages[0]?.totalCount}
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

export default TaxPage;
