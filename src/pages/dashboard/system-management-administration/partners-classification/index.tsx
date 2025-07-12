import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../config/endpoints";
import { PartnerClassification } from "./types";
import { DataResponse } from "../../../../types";

const usePartnerClassifications = () => {
    return useQuery({
        queryKey: ["partnerClassifications"],
        queryFn: async () => {
            const response = await ENDPOINTS.partnersClassification.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            // Access the data array from the response
            const typedResponse =
                response.data as DataResponse<PartnerClassification>;
            return typedResponse.data || [];
        },
    });
};

function PartnersClassificationPage() {
    const {
        data: partnerClassificationData = [],
        error,
        isLoading,
    } = usePartnerClassifications();

    const columns: TableColumn[] = [
        {
            id: "1",
            header: "Name Classes",
            accessorKey: "nameClasses",
        },
    ];

    const data: TableData[] =
        partnerClassificationData?.map((item) => ({
            id: item.id.toString(),
            columns: {
                nameClasses: item.nameClass,
            },
        })) || [];

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Subagents"
                data={data}
                columns={columns}
                addLabel="Add Subagent"
            />
        </PageLayout>
    );
}

export default PartnersClassificationPage;
