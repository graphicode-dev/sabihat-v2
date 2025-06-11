import { useState, useRef } from "react";
import PageLayout from "../../../../layout/PageLayout";
import { CheckBox, DynamicTable } from "../../../../components/table";
import { useToast } from "../../../../hooks/useToast";

// Define the permission types
type Classification = "a" | "b" | "c";

// Interface for permission matrix
interface ClassificationMatrix {
    [roleId: string]: {
        [permission in Classification]?: boolean;
    };
}

function TaxPage() {
    const { addToast } = useToast();
    const lastToastRef = useRef<{
        rowId: string;
        classification: Classification;
        timestamp: number;
    } | null>(null);

    const [classification, setClassification] = useState<ClassificationMatrix>(
        {}
    );

    const data = [
        { id: "1", name: "Marine Agent" },
        { id: "2", name: "Commercial Agent" },
        { id: "3", name: "Subagent" },
        { id: "4", name: "********" },
        { id: "5", name: "********" },
    ];

    const toggleClassification = (
        rowId: string,
        classification: Classification
    ) => {
        setClassification((prev) => {
            const newClassification = { ...prev };
            if (!newClassification[rowId]) {
                newClassification[rowId] = {};
            }

            // Calculate the new value
            const newValue = !newClassification[rowId][classification];

            // Update the state with the new value
            newClassification[rowId] = {
                ...newClassification[rowId],
                [classification]: newValue,
            };

            // Check if we've already shown a toast for this exact action recently
            const now = Date.now();
            const lastToast = lastToastRef.current;
            if (
                !lastToast ||
                lastToast.rowId !== rowId ||
                lastToast.classification !== classification ||
                now - lastToast.timestamp > 300
            ) {
                // Add toast notification
                addToast({
                    title: "Classification Updated",
                    message: `Classification for ${rowId} - ${classification}: ${newValue}`,
                    type: "success",
                });

                // Update the last toast ref
                lastToastRef.current = {
                    rowId,
                    classification,
                    timestamp: now,
                };
            }

            return newClassification;
        });
    };

    const mappedData = data.map((row) => ({
        id: row.id,
        columns: {
            name: row.name,
            A: classification[row.id]?.a ? "true" : "false",
            B: classification[row.id]?.b ? "true" : "false",
            C: classification[row.id]?.c ? "true" : "false",
        },
    }));

    const columns = [
        {
            id: "name",
            header: "Name",
            accessorKey: "name",
            sortable: true,
        },
        {
            id: "A",
            header: "A",
            accessorKey: "A",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const rowId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!classification[rowId]?.a}
                            onChange={() => toggleClassification(rowId, "a")}
                        />
                    </div>
                );
            },
        },
        {
            id: "B",
            header: "B",
            accessorKey: "B",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const rowId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!classification[rowId]?.b}
                            onChange={() => toggleClassification(rowId, "b")}
                        />
                    </div>
                );
            },
        },
        {
            id: "C",
            header: "C",
            accessorKey: "C",
            sortable: false,
            cell: ({ row }: { row: any }) => {
                const rowId = row.original.id;
                return (
                    <div
                        className="flex justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CheckBox
                            checked={!!classification[rowId]?.c}
                            onChange={() => toggleClassification(rowId, "c")}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <PageLayout>
            <DynamicTable
                title="Classification"
                data={mappedData}
                columns={columns}
                initialView="grid"
                itemsPerPage={10}
            />
        </PageLayout>
    );
}

export default TaxPage;
