import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { Policy } from "./types";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfinitePolicies = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<Policy>({
        queryKey: ["policies", page.toString()],
        endpointKey: "policies",
        enabled: options?.enabled ?? true,
    });
};

function PoliciesPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: policiesData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfinitePolicies(currentPage);

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

    const flattenedData = transformPaginatedDataToTableData<Policy>(
        policiesData,
        (item) => ({
            title: item.title,
            description: item.description,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            policiesData?.pages &&
            policiesData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, policiesData?.pages, fetchNextPage]);

    if (isLoading && !policiesData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="Policies"
                data={flattenedData}
                columns={columns}
                addLabel="Add Policy"
                onAddClick={() =>
                    navigate("/system-management-administration/policies/add")
                }
                itemsPerPage={policiesData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={policiesData?.pages[0]?.lastPage}
                totalCount={policiesData?.pages[0]?.totalCount}
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

export default PoliciesPage;
