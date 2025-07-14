import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { ContactMessage } from "./types";
import {
    useInfinitePaginatedQuery,
    transformPaginatedDataToTableData,
} from "../../../../utils";
import { RowType } from "../../../../types";
import Error from "../../../../components/ui/Error";
import Loading from "../../../../components/ui/Loading";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const useInfiniteContactMessages = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<ContactMessage>({
        queryKey: ["contactMessages", page.toString()],
        endpointKey: "contactMessages",
        enabled: options?.enabled ?? true,
    });
};

function ContactMessagesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: messagesData,
        error,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteContactMessages(currentPage);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        setSearchParams({ page: page.toString() });
    };

    const columns: TableColumn[] = [
        {
            id: "fullName",
            header: "Full Name",
            accessorKey: "fullName",
            sortable: true,
        },
        {
            id: "email",
            header: "Email",
            accessorKey: "emailAddress",
            sortable: true,
        },
        {
            id: "phoneNumber",
            header: "Phone Number",
            accessorKey: "phoneNumber",
            cell: ({ row }: { row: RowType }) => {
                const message = row.original as ContactMessage;
                return message.phoneCode
                    ? `${message.phoneCode} ${message.phoneNumber}`
                    : message.phoneNumber;
            },
            sortable: true,
        },
        {
            id: "message",
            header: "Message",
            accessorKey: "message",
            cell: ({ row }: { row: RowType }) => {
                const message = row.original as ContactMessage;
                // Truncate long messages
                return message.message?.length > 50
                    ? `${message.message.substring(0, 50)}...`
                    : message.message;
            },
            sortable: true,
        },
        {
            id: "isRead",
            header: "Status",
            accessorKey: "isRead",
            cell: ({ row }: { row: RowType }) => {
                const message = row.original as ContactMessage;
                return message.isRead ? "Read" : "Unread";
            },
            sortable: true,
        },
        {
            id: "createdAt",
            header: "Date",
            accessorKey: "createdAt",
            cell: ({ row }: { row: RowType }) => {
                const message = row.original as ContactMessage;
                return new Date(message.createdAt).toLocaleDateString();
            },
            sortable: true,
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<ContactMessage>(
        messagesData,
        (item) => ({
            fullName: item.fullName,
            emailAddress: item.emailAddress,
            phoneNumber: item.phoneNumber,
            message: item.message,
            isRead: item.isRead ? "Read" : "Unread",
            createdAt: new Date(item.createdAt).toLocaleDateString(),
        })
    );

    useEffect(() => {
        if (
            currentPage > 1 &&
            messagesData?.pages &&
            messagesData?.pages.length < currentPage
        ) {
            fetchNextPage();
        }
    }, [currentPage, messagesData?.pages, fetchNextPage]);

    if (isLoading && !messagesData) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="Contact Messages"
                data={flattenedData}
                columns={columns}
                addLabel="View Message"
                itemsPerPage={messagesData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={messagesData?.pages[0]?.lastPage}
                totalCount={messagesData?.pages[0]?.totalCount}
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

export default ContactMessagesPage;
