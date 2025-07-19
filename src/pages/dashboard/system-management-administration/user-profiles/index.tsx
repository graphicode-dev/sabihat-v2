import PageLayout from "../../../../layout/PageLayout";
import { DynamicTable } from "../../../../components/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TableColumn } from "../../../../types/table";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { UserProfile } from "./types";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfiniteUserProfiles = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<UserProfile>({
        queryKey: ["user-profile", page.toString()],
        endpointKey: "users",
        enabled: options?.enabled ?? true,
    });
};

function UserProfilesPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: userProfileData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteUserProfiles(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };

    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Name",
            accessorKey: "name",
        },
        {
            id: "2",
            header: "Email",
            accessorKey: "email",
        },
        {
            id: "3",
            header: "Phone",
            accessorKey: "phone",
        },
        {
            id: "4",
            header: "Address",
            accessorKey: "address",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<UserProfile>(
        userProfileData,
        (item) => ({
            name: item.name,
            email: item.email,
            phone: item.phoneNumber,
            address: item.address,
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            userProfileData?.pages &&
            userProfileData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, userProfileData?.pages, fetchNextPage]);

    if (isLoading && !userProfileData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Users"
                data={flattenedData}
                columns={columns}
                onAddClick={() => {
                    navigate(
                        "/system-management-administration/user-profiles/add"
                    );
                }}
                addLabel="Add User"
                itemsPerPage={userProfileData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={userProfileData?.pages[0]?.lastPage}
                totalCount={userProfileData?.pages[0]?.totalCount}
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

export default UserProfilesPage;
