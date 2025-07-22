import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../config/endpoints";
import { DataResponse } from "../../../../types";
import { Port } from "./types";
import Loading from "../../../../components/ui/Loading";
import Error from "../../../../components/ui/Error";

const usePorts = () => {
    return useQuery({
        queryKey: ["ports"],
        queryFn: async () => {
            const response = await ENDPOINTS.port.getAll();

            if (response.error) {
                return Promise.reject(response.error.message);
            }

            console.log("response", response.data);

            const typedResponse = response.data as DataResponse<Port>;
            return typedResponse.data || [];
        },
    });
};

function PortPage() {
    const navigate = useNavigate();

    const {
        data: portsData,
        error: portsError,
        isLoading: portsLoading,
    } = usePorts();

    const columns = [
        {
            id: "Port Name",
            header: "Port Name",
            accessorKey: "Port Name",
            sortable: true,
        },
        {
            id: "Abbreviation Code",
            header: "Abbreviation Code",
            accessorKey: "Abbreviation Code",
            sortable: true,
        },
        {
            id: "Country",
            header: "Country",
            accessorKey: "Country",
            sortable: true,
        },
    ];

    if (portsLoading) return <Loading />;
    if (portsError) return <Error message={portsError.message} />;

    return (
        <PageLayout>
            <DynamicTable
                title="All Ports"
                data={
                    portsData?.map((port: Port) => ({
                        id: port.id.toString(),
                        columns: {
                            "Port Name": port.name,
                            "Abbreviation Code": port.abbreviationCode,
                            Country: port.country.name,
                        },
                    })) || []
                }
                columns={columns}
                addLabel="Add Port"
                onAddClick={() => {
                    navigate(`/ship-trip-management/port/add`);
                }}
            />
        </PageLayout>
    );
}

export default PortPage;
