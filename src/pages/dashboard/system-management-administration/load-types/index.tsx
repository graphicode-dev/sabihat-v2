import { useNavigate, useSearchParams } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn } from "../../../../types/table";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../config/endpoints";
import { DataResponse } from "../../../../types";
import { Load, LoadType } from "./types";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";
import { useEffect, useState } from "react";

const useLoadTypes = () => {
    return useQuery({
        queryKey: ["loadTypes"],
        queryFn: async () => {
            const response = await ENDPOINTS.loadTypes.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            console.log("response", response.data);

            const typedResponse = response.data as DataResponse<LoadType>;
            return typedResponse.data || [];
        },
    });
};

const useLoads = (loadTypeId: string, page: number) => {
    return useQuery({
        queryKey: ["loads", loadTypeId, page],
        queryFn: async () => {
            const response = await ENDPOINTS.loads.getAll(loadTypeId, page);

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            console.log("response", response.data);

            const typedResponse = response.data as DataResponse<Load>;
            return typedResponse.data || [];
        },
    });
};

function LoadTypesPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const {
        data: loadTypesData = [],
        error: loadTypesError,
        isLoading: loadTypesLoading,
    } = useLoadTypes();
    const tab = searchParams.get("tab");
    const [activeTabId, setActiveTabId] = useState(tab || "1");

    const {
        data: loadsData,
        error: loadsError,
        isLoading: loadsLoading,
    } = useLoads(activeTabId, 1);

    const passengerColumns: TableColumn[] = [
        {
            id: "typeName",
            header: "Type Name",
            accessorKey: "typeName",
        },
    ];

    useEffect(() => {
        setActiveTabId(tab || "1");
        console.log("tab", tab);
        console.log("activeTabId", activeTabId);
    }, [tab]);

    if (loadTypesLoading || loadsLoading) return <Loading />;
    if (loadTypesError || loadsError)
        return (
            <Error
                message={
                    (loadTypesError || loadsError)?.message || "Unknown error"
                }
            />
        );

    const items =
        loadsData && typeof loadsData === "object" && "items" in loadsData
            ? (loadsData.items as Load[])
            : [];

    return (
        <PageLayout>
            <Tabs>
                {loadTypesData.map((item: LoadType) => (
                    <Tabs.Item
                        key={item.id}
                        label={item.name}
                        value={item.id.toString()}
                    >
                        <DynamicTable
                            title="Load Types"
                            data={items.map((item: Load) => ({
                                id: item.id.toString(),
                                columns: {
                                    typeName: item.loadName,
                                },
                            }))}
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
