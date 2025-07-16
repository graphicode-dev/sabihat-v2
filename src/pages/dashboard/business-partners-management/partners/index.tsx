import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { Partner } from "./types";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfinitePartner = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<Partner>({
        queryKey: ["partner", page.toString()],
        endpointKey: "partners",
        enabled: options?.enabled ?? true,
    });
};

function PartnersPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: partnerData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfinitePartner(currentPage);

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
            id: "title",
            header: "Title",
            accessorKey: "title",
        },
        {
            id: "hotline",
            header: "Hotline",
            accessorKey: "hotline",
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "createdAt",
            header: "Created At",
            accessorKey: "createdAt",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<Partner>(
        partnerData,
        (item) => ({
            name: item.name,
            phone: `${item.phoneCode} ${item.phoneNumber}`,
            title: item.title,
            hotline: item.hotline,
            email: item.email,
            createdAt: item.createdAt,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            partnerData?.pages &&
            partnerData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, partnerData?.pages, fetchNextPage]);

    if (isLoading && !partnerData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Partners"
                data={flattenedData}
                columns={columns}
                addLabel="Add Partner"
                onAddClick={() => {
                    navigate(`/business-partners-management/partners/add`);
                }}
                onRowClick={(rowId) =>
                    navigate(
                        `/business-partners-management/partners/view/${rowId}`
                    )
                }
                hideBorder
                itemsPerPage={partnerData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={partnerData?.pages[0]?.lastPage}
                totalCount={partnerData?.pages[0]?.totalCount}
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

export default PartnersPage;
