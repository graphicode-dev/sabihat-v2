import ViewCard from "../../../../../components/ui/ViewCard";
import PageLayout from "../../../../../layout/PageLayout";
import { useToast } from "../../../../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { Load } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const useLoadTypeById = (id: string) => {
    return useQuery({
        queryKey: ["loadType", id],
        queryFn: async () => {
            const response = await ENDPOINTS.loadTypes.getOne(id);

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

function LoadTypeViewPage() {
    const { addToast, addAlertToast } = useToast();
    const navigate = useNavigate();
    const { name, id } = useParams();

    const { data: loadType, isLoading, error } = useLoadTypeById(id || "");

    const loadTypeData = (loadType?.data as Load) || ({} as Load);

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
                                    label: "Type Name",
                                    value: loadTypeData?.loadName.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/load-types/${name}/edit/${id}`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        `Are you sure you want to delete this ${name?.toUpperCase()}?`,
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message: `${name?.toUpperCase()} deleted successfully`,
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

export default LoadTypeViewPage;
