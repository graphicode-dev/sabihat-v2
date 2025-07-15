import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../config/endpoints";
import { DataResponse } from "../../../../types";
import { LoadType } from "./types";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const useLoadTypes = () => {
    return useQuery({
        queryKey: ["loadTypes"],
        queryFn: async () => {
            const response = await ENDPOINTS.loadTypes.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            const typedResponse = response.data as DataResponse<LoadType>;
            return typedResponse.data || [];
        },
    });
};

function LoadTypesPage() {
    const navigate = useNavigate();
    const { data: loadTypesData = [], error, isLoading } = useLoadTypes();

    const passengerColumns: TableColumn[] = [
        {
            id: "typeName",
            header: "Type Name",
            accessorKey: "typeName",
        },
    ];

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <Tabs>
                {loadTypesData.map((item) => (
                    <Tabs.Item
                        key={item.id}
                        label={item.name}
                        value={item.id.toString()}
                    >
                        <DynamicTable
                            title="Load Types"
                            data={
                                item.loads?.map((item) => ({
                                    id: item.id.toString(),
                                    columns: {
                                        typeName: item.loadName,
                                    },
                                })) || []
                            }
                            columns={passengerColumns}
                            addLabel="Add Load Types"
                            onAddClick={() => {
                                navigate(
                                    `/system-management-administration/load-types/${item.name}/add`
                                );
                            }}
                            onRowClick={(rowId) =>
                                navigate(
                                    `/system-management-administration/load-types/${item.name}/view/${rowId}`
                                )
                            }
                            hideBorder
                        />
                    </Tabs.Item>
                ))}
            </Tabs>
        </PageLayout>
    );
}

export default LoadTypesPage;
