import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    transformPaginatedDataToTableData,
    useInfinitePaginatedQuery,
} from "../../../../utils";
import { PaymentMethod } from ".";
import { useEffect } from "react";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useInfinitePaymentMethods = (
    page: number = 1,
    options?: { enabled?: boolean }
) => {
    return useInfinitePaginatedQuery<PaymentMethod>({
        queryKey: ["payment-methods", page.toString()],
        endpointKey: "paymentMethods",
        enabled: options?.enabled ?? true,
    });
};

function PaymentMethodsPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const {
        data: paymentMethodsData,
        error,
        isLoading,
        fetchNextPage,
    } = useInfinitePaymentMethods(currentPage);

    const handlePageChange = (page: number) => {
        setSearchParams({ page: page.toString() });
    };

    const columns: TableColumn[] = [
        {
            id: "accountName",
            header: "Account Name",
            accessorKey: "accountName",
        },
        {
            id: "accountType",
            header: "Account Type",
            accessorKey: "accountType",
        },
        {
            id: "currency",
            header: "Currency",
            accessorKey: "currency",
        },
        {
            id: "accountNumber",
            header: "Account Number",
            accessorKey: "accountNumber",
        },
        {
            id: "accountStatus",
            header: "Account Status",
            accessorKey: "accountStatus",
        },
        {
            id: "note",
            header: "Note",
            accessorKey: "note",
        },
    ];

    const flattenedData = transformPaginatedDataToTableData<PaymentMethod>(
        paymentMethodsData,
        (item) => ({
            accountType: item.accountType,
            currency: item.currency,
            accountNumber: item.accountNumber,
            note: item.note,
        })
    );

    useEffect(() => {
        if (currentPage > 1 && paymentMethodsData?.pages.length === 1) {
            fetchNextPage();
        }
    }, [currentPage, paymentMethodsData?.pages.length, fetchNextPage]);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Payment Methods"
                data={flattenedData}
                columns={columns}
                onAddClick={() => {
                    navigate(
                        "/system-management-administration/payment-methods/add"
                    );
                }}
                addLabel="Add Payment Method"
                itemsPerPage={paymentMethodsData?.pages[0]?.perPage}
                currentPage={currentPage}
                lastPage={paymentMethodsData?.pages[0]?.lastPage}
                totalCount={paymentMethodsData?.pages[0]?.totalCount}
                onPageChange={handlePageChange}
            />
        </PageLayout>
    );
}

export default PaymentMethodsPage;
