import { DynamicTable } from "../../../../components/table";
import PageLayout from "../../../../layout/PageLayout";
import { TableColumn, TableData } from "../../../../types/table";

function ContactMessagesPage() {
    const columns: TableColumn[] = [
        {
            id: "col1",
            header: "Full Name",
            accessorKey: "fullName",
            sortable: true,
        },
        { id: "col2", header: "Email", accessorKey: "email", sortable: true },
        {
            id: "col3",
            header: "Phone Number",
            accessorKey: "phoneNumber",
            sortable: true,
        },
        {
            id: "col4",
            header: "Message",
            accessorKey: "message",
            sortable: true,
        },
        {
            id: "col5",
            header: "Attach File",
            accessorKey: "attachFile",
            sortable: true,
        },
    ];

    const data: TableData[] = [
        {
            id: "1",
            columns: {
                fullName: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "123-456-7890",
                message: "Hello, how are you?",
                attachFile: "file.pdf",
            },
        },
        {
            id: "2",
            columns: {
                fullName: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "123-456-7890",
                message: "Hello, how are you?",
                attachFile: "file.pdf",
            },
        },
        {
            id: "3",
            columns: {
                fullName: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "123-456-7890",
                message: "Hello, how are you?",
                attachFile: "file.pdf",
            },
        },
        {
            id: "4",
            columns: {
                fullName: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "123-456-7890",
                message: "Hello, how are you?",
                attachFile: "file.pdf",
            },
        },
        {
            id: "5",
            columns: {
                fullName: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "123-456-7890",
                message: "Hello, how are you?",
                attachFile: "file.pdf",
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="All Messages"
                data={data}
                columns={columns}
                addLabel="Add Commercial Agent"
            />
        </PageLayout>
    );
}

export default ContactMessagesPage;
