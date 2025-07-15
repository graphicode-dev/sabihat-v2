import { useParams } from "react-router-dom";
import PageLayout from "../../../../../../../layout/PageLayout";
import ViewCard from "../../../../../../../components/ui/ViewCard";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../../../config/endpoints";
import { CurrencyRate } from "../../../types";
import Loading from "../../../../../../../components/ui/Loading";
import Error from "../../../../../../../components/ui/Error";

const useCurrencyRateById = (id: string) => {
    return useQuery({
        queryKey: ["currencyRate", id],
        queryFn: async () => {
            const response = await ENDPOINTS.currencyRate.getOne(id);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            return response.data;
        },
        staleTime: 5 * 60 * 1000,
        retry: 1,
        retryDelay: 1000,
        enabled: !!id,
    });
};

function CurrencyRateViewPage() {
    const { rowId } = useParams();

    const {
        data: currencyRate,
        isLoading,
        error,
    } = useCurrencyRateById(rowId || "");

    const currencyRateData =
        (currencyRate?.data as CurrencyRate) || ({} as CurrencyRate);

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Currency Id",
                                    value: currencyRateData?.currencyId.toString(),
                                },
                                {
                                    label: "Currency Rate",
                                    value: currencyRateData?.rate.toString(),
                                },
                                {
                                    label: "Effective Date",
                                    value: currencyRateData?.createdAt.toString(),
                                },
                            ],
                        },
                    ],
                }}
            />
        </PageLayout>
    );
}

export default CurrencyRateViewPage;
