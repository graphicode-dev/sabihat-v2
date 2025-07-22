import { useParams } from "react-router-dom";
import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { Port } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const usePortById = (id: string) => {
    return useQuery({
        queryKey: ["port", id],
        queryFn: async () => {
            const response = await ENDPOINTS.port.getOne(id);

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

function PortViewPage() {
    const { id } = useParams();
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();

    const {
        data: port,
        isLoading: portLoading,
        error: portError,
    } = usePortById(id || "");

    const portData = (port?.data as Port) || ({} as Port);

    if (portLoading) return <Loading />;
    if (portError)
        return <Error message={portError?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <ViewCard
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Port Name",
                                    value: portData?.name?.toString(),
                                },
                                {
                                    label: "Abbreviation Code",
                                    value: portData?.abbreviationCode?.toString(),
                                },
                                {
                                    label: "Country",
                                    value: portData?.country?.name?.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() => {
                    navigate(`/ship-trip-management/port/edit/${id}`);
                }}
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this port?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: "Port deleted successfully",
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
                        ]
                    );
                }}
                buttons
            />
        </PageLayout>
    );
}

export default PortViewPage;
