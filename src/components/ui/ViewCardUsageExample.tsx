import PageLayout from "../../layout/PageLayout";
import ViewCard from "./ViewCard";
import React from "react";
import { TableColumn } from "../../types/table";
import { DynamicTable } from "../table/DynamicTable";
import { Eye, Download, Trash, Edit } from "lucide-react";

function ViewCardUsageExample() {
    // Example data for user view card
    const userData = {
        Email: "ahmadp@gmail.com",
        Phone: "9704938765",
        "User ID": "1",
        Status: "Active",
        "Last Login": "Today at 2:34 PM",
    };

    // Example data for vessel view card
    const vesselData = {
        // Basic vessel info as regular fields
        "Port From": "Dubai",
        "Ship To": "Jeddah",
        ETA: "2023-05-15",
        ETD: "2023-05-12",
        Description: "Cargo vessel carrying containers and vehicles",

        // Sections with fields
        "Passengers Cabins": [
            { label: "Cabin Name", value: "Premium Suite" },
            { label: "Number of Adults Available", value: 24 },
            { label: "Number of Children Available", value: 12 },
        ],
        "Cargo Compartments": [
            { label: "Cabin Name", value: "Container Bay A" },
            { label: "Available Weight", value: "500 tons" },
            { label: "Available Size", value: "250 sq.m" },
            { label: "Available Quantity", value: 50 },
            { label: "Agent", value: "Maritime Services Inc." },
            { label: "Cargo Name", value: "Container Bay A" },
        ],
        "Vehicles Parking's": [
            { label: "Cabin Name", value: "Deck C" },
            { label: "Available Weight", value: "200 tons" },
            { label: "Available Size", value: "100 sq.m" },
            { label: "Available Quantity", value: 25 },
        ],
    };

    // Example data for default view card
    const defaultData = {
        // Basic vessel info as regular fields
        "Vessel Name": "Ocean Explorer",
        "Vessel Type": "Container Ship",
        "Registration Number": "REG-12345-XYZ",
        "Operating Status": "Active",
        "Call Sign": "OECP1",
        "IMO Number": "IMO9876543",
        "MMSI Number": "123456789",
        Flag: "Panama",
        "Gross Weight": "85,000 tons",
        "Dead Weight": "65,000 tons",
        Breadth: "32.2m",
        "ISM Manager": "Global Maritime Ltd.",
        "Ship Commercial Manager": "Ocean Freight Inc.",
        "Classification Status": "Class A",
        Builder: "Hyundai Heavy Industries",
        "Year Of Build": "2018",

        // Sections with fields
        "Passengers Cabins": [
            { label: "Cabin Name", value: "Standard Cabin" },
            { label: "Number of Adults", value: 120 },
            { label: "Number of Children", value: 40 },
        ],
        "Cargo Compartments": [
            { label: "Cabin Name", value: "Main Hold" },
            { label: "Weight", value: "45,000 tons" },
            { label: "Size", value: "12,000 sq.m" },
            { label: "Quantity", value: 1200 },
        ],
        "Vehicles Parking's": [
            { label: "Cabin Name", value: "Car Deck" },
            { label: "Weight", value: "5,000 tons" },
            { label: "Size", value: "2,500 sq.m" },
            { label: "Quantity", value: 350 },
        ],
    };

    // Example data
    const exampleData = [
        {
            id: "1",
            avatar: "/images/default-user.png",
            columns: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+1 234 567 890",
                status: "Active",
                role: "Admin",
                file: "https://example.com/files/document.pdf",
                message:
                    "This is a sample message that would be shown in a modal when clicked.",
            },
        },
        {
            id: "2",
            avatar: "/images/default-user.png",
            columns: {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "+1 987 654 321",
                status: "Inactive",
                role: "User",
                file: "https://example.com/files/report.xlsx",
                message: "Another sample message for demonstration purposes.",
            },
        },
    ];

    // Example of how to create a table schema with custom cell rendering
    const createTableSchema = (
        setSelectedMessage: (message: string) => void
    ) => {
        const columns: TableColumn[] = [
            {
                id: "col1",
                header: "Name",
                accessorKey: "name",
                sortable: true,
            },
            {
                id: "col2",
                header: "Email",
                accessorKey: "email",
                sortable: true,
            },
            {
                id: "col3",
                header: "Phone",
                accessorKey: "phone",
                sortable: true,
            },
            {
                id: "col4",
                header: "Status",
                accessorKey: "status",
                sortable: true,
                // Custom cell rendering for status
                cell: ({ row }) => {
                    const status = row.original.columns.status;
                    return (
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {status}
                        </span>
                    );
                },
            },
            {
                id: "col5",
                header: "File",
                accessorKey: "file",
                sortable: false,
                // Custom cell rendering for file download
                cell: ({ row }) => {
                    const filePath = row.original.columns.file;
                    const fileName = filePath.split("/").pop();

                    return (
                        <a
                            href={filePath}
                            download={fileName}
                            className="text-primary-500 flex items-center gap-1 hover:underline"
                            onClick={(e) => e.stopPropagation()} // Prevent row click
                        >
                            <Download size={16} />
                            <span>Download</span>
                        </a>
                    );
                },
            },
            {
                id: "col6",
                header: "Message",
                accessorKey: "message",
                sortable: false,
                // Custom cell rendering for message viewing
                cell: ({ row }) => {
                    const message = row.original.columns.message;

                    return (
                        <button
                            className="text-primary-500 flex items-center gap-1 hover:underline"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent row click
                                setSelectedMessage(message);
                            }}
                            type="button"
                            title="View Message"
                        >
                            <Eye size={16} />
                            <span>View</span>
                        </button>
                    );
                },
            },
            {
                id: "col7",
                header: "Actions",
                accessorKey: "actions",
                sortable: false,
                // Custom cell rendering for actions
                cell: ({ row }) => {
                    const id = row.original.id;

                    return (
                        <div className="flex items-center gap-2">
                            <button
                                className="text-primary-500 hover:text-primary-700"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
                                    console.log(`Edit item ${id}`);
                                }}
                                type="button"
                                title="Edit"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
                                    console.log(`Delete item ${id}`);
                                }}
                                type="button"
                                title="Delete"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    );
                },
            },
        ];

        return columns;
    };

    // Example component using the table schema
    const [selectedMessage, setSelectedMessage] = React.useState<string | null>(
        null
    );

    // Create columns with the message handler
    const columns = createTableSchema((message) => setSelectedMessage(message));

    return (
        <PageLayout>
            <div className="flex flex-col gap-6">
                <ViewCard
                    title="Ahmad Percy"
                    subtitle="Admin"
                    variant="user"
                    image="/images/default-user.png"
                    data={userData}
                    buttons
                />

                <ViewCard
                    title="Vessel Name"
                    subtitle="Voyage Number"
                    variant="vessel"
                    image="/images/default-ship.png"
                    data={vesselData}
                    buttons
                    ticketButton
                />

                <ViewCard
                    title="view"
                    variant="default"
                    data={defaultData}
                    buttons
                />

                <div className="space-y-4">
                    <DynamicTable
                        title="Users"
                        data={exampleData}
                        columns={columns}
                    />

                    {/* Simple modal for displaying messages */}
                    {selectedMessage && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h3 className="text-lg font-medium mb-4">
                                    Message
                                </h3>
                                <p className="text-gray-700">
                                    {selectedMessage}
                                </p>
                                <div className="mt-6 flex justify-end">
                                    <button
                                        className="px-4 py-2 bg-primary-500 text-white rounded-md"
                                        onClick={() => setSelectedMessage(null)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}

export default ViewCardUsageExample;
