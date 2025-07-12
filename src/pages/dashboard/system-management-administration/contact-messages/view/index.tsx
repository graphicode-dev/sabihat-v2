import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";
import { ENDPOINTS } from "../../../../../config/endpoints";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../components/ui/Loading";
import Error from "../../../../../components/ui/Error";
import { ContactMessage } from "../types";

const useContactMessageById = (id: string) => {
    return useQuery({
        queryKey: ["contactMessage", id],
        queryFn: async () => {
            const response = await ENDPOINTS.contactMessages.getOne(id);

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

function ContactMessagesViewPage() {
    const { id } = useParams();

    const {
        data: contactMessage,
        isLoading,
        error,
    } = useContactMessageById(id || "");

    const messageData =
        (contactMessage?.data as ContactMessage) || ({} as ContactMessage);

    const data: TableData = {
        id: messageData?.id?.toString() || "1",
        columns: {
            fullName: messageData?.fullName || "",
            email: messageData?.emailAddress || "",
            phoneNumber: messageData?.phoneNumber || "",
            message: messageData?.message || "",
            attachFile: messageData?.contactMessageFile || "",
        },
    };

    if (isLoading) return <Loading />;
    if (error) return <Error message={error?.message || "Unknown error"} />;

    return (
        <PageLayout>
            <ViewCard
                subtitle={data?.columns.fullName.toString()}
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Full Name",
                                    value:
                                        data?.columns.fullName?.toString() ||
                                        "",
                                },
                                {
                                    label: "Email",
                                    value:
                                        data?.columns.email?.toString() || "",
                                },
                                {
                                    label: "Phone Number",
                                    value:
                                        data?.columns.phoneNumber?.toString() ||
                                        "",
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Message",
                                    value:
                                        data?.columns.message?.toString() || "",
                                    colSpan: 3,
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Attach File",
                                    value: data?.columns.attachFile
                                        ? data.columns.attachFile.toString()
                                        : "",
                                    type: "file",
                                },
                            ],
                        },
                    ],
                }}
            />
        </PageLayout>
    );
}

// Add the missing export
export default ContactMessagesViewPage;
