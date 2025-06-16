import PageLayout from "../../../../../layout/PageLayout";
import ViewCard from "../../../../../components/ui/ViewCard";
// import { useParams } from "react-router-dom";
import { TableData } from "../../../../../types/table";

function ContactMessagesViewPage() {
    // const { id } = useParams();

    const data: TableData = {
        id: "1",
        columns: {
            fullName: "John Doe",
            email: "john.doe@example.com",
            phoneNumber: "123-456-7890",
            message: "Hello, how are you?",
            attachFile: "file.pdf",
        },
    };
    return (
        <PageLayout>
            <ViewCard
                title="View"
                subtitle={data?.columns.fullName.toString()}
                variant="default"
                data={{
                    rows: [
                        {
                            fields: [
                                {
                                    label: "Full Name",
                                    value: data?.columns.fullName.toString(),
                                },
                                {
                                    label: "Email",
                                    value: data?.columns.email.toString(),
                                },
                                {
                                    label: "Phone Number",
                                    value: data?.columns.phoneNumber.toString(),
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Message",
                                    value: data?.columns.message.toString(),
                                    colSpan: 3,
                                },
                            ],
                        },
                        {
                            fields: [
                                {
                                    label: "Attach File",
                                    value: data?.columns.attachFile.toString(),
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

export default ContactMessagesViewPage;
