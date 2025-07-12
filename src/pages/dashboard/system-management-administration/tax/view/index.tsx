import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { TableData } from "../../../../../types/table";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { Tax } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const useTaxById = (id: string) => {
    return useQuery({
        queryKey: ["tax", id],
        queryFn: async () => {
            const response = await ENDPOINTS.tax.getOne(id);

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

function TaxViewPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addAlertToast, addToast } = useToast();

    const { data: tax, error, isLoading } = useTaxById(id as string);

    const taxData = (tax?.data as Tax) || ({} as Tax);

    const data: TableData = {
        id: "1",
        columns: {
            taxName: taxData.name,
            taxType: taxData.type,
            taxBase: taxData.taxBase,
            amountValue: taxData.amountValue,
            description: taxData.description,
        },
    };

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
                                    label: "Tax Name",
                                    value: String(data?.columns?.taxName) || "",
                                },
                                {
                                    label: "Tax Type",
                                    value: String(data?.columns?.taxType) || "",
                                },
                                {
                                    label: "Amount Value",
                                    value: String(data?.columns?.amountValue) || "",
                                },
                                {
                                    label: "Description",
                                    value: String(data?.columns?.description) || "",
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(`/system-management-administration/tax/edit/${id}`)
                }
                onDelete={() => {
                    addAlertToast("Are you sure you want to delete this tax?", [
                        {
                            text: "OK",
                            onClick: () => {
                                addToast({
                                    type: "success",
                                    message: "Tax deleted successfully",
                                    title: "Success!",
                                });
                                navigate(-1);
                            },
                            variant: "primary",
                        },
                        {
                            text: "Cancel",
                            onClick: () => {},
                            variant: "secondary",
                        },
                    ]);
                }}
                buttons
            />
        </PageLayout>
    );
}

export default TaxViewPage;
