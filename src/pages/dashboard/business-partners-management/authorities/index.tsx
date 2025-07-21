import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";
import { Authority } from "./types";

const useInfiniteAuthority = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<Authority>({
        queryKey: ["authority", page.toString()],
        endpointKey: "authorities",
        enabled: options?.enabled ?? true,
    });
};
function AuthoritiesPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: authorityData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteAuthority(currentPage);

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
            id: "phone",
            header: "Phone",
            accessorKey: "phone",
        },
        {
            id: "address",
            header: "Address",
            accessorKey: "address",
        },
    ];
    const flattenedData = transformPaginatedDataToTableData<Authority>(
        authorityData,
        (item) => ({
            name: item.name,
            phone: item.phoneNumber,
            address: item.address,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            authorityData?.pages &&
            authorityData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, authorityData?.pages, fetchNextPage]);

    if (isLoading && !authorityData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Authorities"
                data={flattenedData}
                columns={columns}
                addLabel="Add Authority"
                onAddClick={() =>
                    navigate("/business-partners-management/authorities/add")
                }
                hideBorder
                itemsPerPage={authorityData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={authorityData?.pages[0]?.lastPage}
                totalCount={authorityData?.pages[0]?.totalCount}
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

export default AuthoritiesPage;
