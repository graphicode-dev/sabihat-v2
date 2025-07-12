import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { PartnerClassification } from "../types";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";

const usePartnerClassificationById = (id: string) => {
    return useQuery({
        queryKey: ["partnerClassification", id],
        queryFn: async () => {
            const response = await ENDPOINTS.partnersClassification.getOne(id);

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

function PartnersClassificationViewPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addAlertToast, addToast } = useToast();

    const {
        data: contactMessage,
        isLoading,
        error,
    } = usePartnerClassificationById(id || "");

    const messageData =
        (contactMessage?.data as PartnerClassification) ||
        ({} as PartnerClassification);

    const data: TableData = {
        id: messageData?.id?.toString() || "1",
        columns: {
            nameClass: messageData?.nameClass || "",
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
                                    label: "Name Class",
                                    value: data?.columns.nameClass.toString(),
                                },
                            ],
                        },
                    ],
                }}
                onEdit={() =>
                    navigate(
                        `/system-management-administration/partners-classification/${id}/edit`
                    )
                }
                onDelete={() => {
                    addAlertToast(
                        "Are you sure you want to delete this partners classification?",
                        [
                            {
                                text: "OK",
                                onClick: () => {
                                    addToast({
                                        type: "success",
                                        message:
                                            "Partners classification deleted successfully",
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

export default PartnersClassificationViewPage;
