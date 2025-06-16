import { useNavigate } from "react-router-dom";
import { DynamicTable } from "../../../../components/table";
import Tabs from "../../../../components/ui/Tabs";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function LoadTypesPage() {
    const navigate = useNavigate();
    const passengerColumns: TableColumn[] = [
        {
            id: "typeName",
            header: "Type Name",
            accessorKey: "typeName",
        },
    ];
    const passengerData: TableData[] = [
        {
            id: "1",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "2",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "3",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "4",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "5",
            columns: {
                typeName: "*****",
            },
        },
    ];

    const cargoColumns: TableColumn[] = [
        {
            id: "typeName",
            header: "Type Name",
            accessorKey: "typeName",
        },
    ];
    const cargoData: TableData[] = [
        {
            id: "1",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "2",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "3",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "4",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "5",
            columns: {
                typeName: "*****",
            },
        },
    ];

    const vehicleColumns: TableColumn[] = [
        {
            id: "typeName",
            header: "Type Name",
            accessorKey: "typeName",
        },
    ];
    const vehicleData: TableData[] = [
        {
            id: "1",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "2",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "3",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "4",
            columns: {
                typeName: "*****",
            },
        },
        {
            id: "5",
            columns: {
                typeName: "*****",
            },
        },
    ];

    return (
        <PageLayout>
            <Tabs>
                <Tabs.Item label="Passenger" value="passenger">
                    <DynamicTable
                        title="Load Types"
                        data={passengerData}
                        columns={passengerColumns}
                        addLabel="Add Load Types"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/load-types/passenger/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/load-types/passenger/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="Cargo" value="cargo">
                    <DynamicTable
                        title="Load Types"
                        data={cargoData}
                        columns={cargoColumns}
                        addLabel="Add Load Types"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/load-types/cargo/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/load-types/cargo/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
                <Tabs.Item label="Vehicle" value="vehicle">
                    <DynamicTable
                        title="Load Types"
                        data={vehicleData}
                        columns={vehicleColumns}
                        addLabel="Add Load Types"
                        onAddClick={() => {
                            navigate(
                                `/system-management-administration/load-types/vehicle/add`
                            );
                        }}
                        onRowClick={(rowId) =>
                            navigate(
                                `/system-management-administration/load-types/vehicle/view/${rowId}`
                            )
                        }
                        hideBorder
                    />
                </Tabs.Item>
            </Tabs>
        </PageLayout>
    );
}

export default LoadTypesPage;
