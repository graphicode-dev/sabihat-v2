import Table, { TableContentWrapper, TableGroupRowsWrapper, TableRow } from "../table";
import { TableProvider, useTable, TableGroup } from "../../context/TableContext";

// Default data if none is provided
const defaultGroups: TableGroup[] = [
    {
        id: "group1",
        title: "Group1",
        value: "********",
        rows: [
            {
                id: "1",
                name: "Company Name",
                email: "info@companyname.com",
                phone: "+1 234 567 890",
                address: "123 Street Name, City, Country",
            },
        ],
    },
];

interface CompaniesTableProps {
    initialGroups?: TableGroup[];
    initialExpandedGroups?: string[];
}

// Wrapper component that provides the TableContext
function CompaniesTable({ 
    initialGroups = defaultGroups, 
    initialExpandedGroups = ["group1"] 
}: CompaniesTableProps) {
    return (
        <TableProvider initialGroups={initialGroups} initialExpandedGroups={initialExpandedGroups}>
            <CompaniesTableContent />
        </TableProvider>
    );
}

// Inner component that consumes the TableContext
function CompaniesTableContent() {
    const {
        filteredGroups,
        totalRowCount,
        selectedRows,
        selectedGroups,
        expandedGroups,
        selectRow,
        selectGroup,
        toggleGroup,
        setSearchQuery,
        sortField,
        sortDirection,
        setSorting
    } = useTable();

    // Column headers definition
    const headers = [
        { id: "name", label: "Name", sortable: true },
        { id: "email", label: "Email", sortable: true },
        { id: "phone", label: "Phone", sortable: true },
        { id: "address", label: "Address", sortable: true },
    ];

    // Handle search input
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Handle header sort click
    const handleSort = (headerId: string) => {
        setSorting(headerId);
    };

    return (
        <Table
            title="All companies"
            recordCount={totalRowCount}
            onSearch={handleSearch}
            searchPlaceholder="Search companies..."
        >
            <TableContentWrapper
                headers={headers}
                onSort={handleSort}
                sortField={sortField || undefined}
                sortDirection={sortDirection}
            >
                {filteredGroups.map((group) => (
                    <TableGroupRowsWrapper
                        key={group.id}
                        groupTitle={group.title}
                        groupValue={group.value}
                        isOpen={expandedGroups.has(group.id)}
                        onToggle={() => toggleGroup(group.id)}
                        isSelectable={true}
                        isSelected={selectedGroups.has(group.id)}
                        onSelect={(selected) => selectGroup(group.id, selected)}
                    >
                        {group.rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data={{
                                    name: row.name,
                                    email: row.email,
                                    phone: row.phone,
                                    address: row.address,
                                }}
                                isSelected={selectedRows.has(row.id)}
                                onSelect={(selected) => selectRow(row.id, selected)}
                                onRowClick={() => console.log(`Row ${row.id} clicked`)}
                            />
                        ))}
                    </TableGroupRowsWrapper>
                ))}
            </TableContentWrapper>
        </Table>
    );
}

export default CompaniesTable;
