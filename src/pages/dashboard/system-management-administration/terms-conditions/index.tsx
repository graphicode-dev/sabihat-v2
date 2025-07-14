import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInfinitePaginatedQuery } from "../../../../utils";
import { TermsConditions } from "./types";
import { transformPaginatedDataToTableData } from "../../../../utils";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfiniteTermsConditions = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<TermsConditions>({
        queryKey: ["termsConditions", page.toString()],
        endpointKey: "termsConditions",
        enabled: options?.enabled ?? true,
    });
};

function TermsConditionsPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: termsConditionsData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteTermsConditions(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };
    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Title",
            accessorKey: "title",
        },
        {
            id: "2",
            header: "Description",
            accessorKey: "description",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<TermsConditions>(
        termsConditionsData,
        (item) => ({
            title: item.title,
            description: item.description,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            termsConditionsData?.pages &&
            termsConditionsData.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, termsConditionsData?.pages, fetchNextPage]);

    if (isLoading && !termsConditionsData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="Terms & Conditions"
                data={flattenedData}
                columns={columns}
                addLabel="Add Terms & Conditions"
                onAddClick={() =>
                    navigate(
                        "/system-management-administration/terms-conditions/add"
                    )
                }
                itemsPerPage={termsConditionsData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={termsConditionsData?.pages[0]?.lastPage}
                totalCount={termsConditionsData?.pages[0]?.totalCount}
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

export default TermsConditionsPage;
