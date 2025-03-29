import React from "react";
import TableWrapper from "./TableWrapper";
import TableContentWrapper from "./TableContentWrapper";
import TableRow from "./TableRow";
import TableGroupRowsWrapper from "./TableGroupRowsWrapper";

interface TableProps {
    children: React.ReactNode;
    title?: string;
    recordCount?: number;
    onAddClick?: () => void;
    addButtonText?: string;
    showAddButton?: boolean;
    showSearch?: boolean;
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    showFilters?: boolean;
    onFilterClick?: () => void;
    className?: string;
}

function Table({
    children,
    title,
    recordCount,
    onAddClick,
    addButtonText,
    showAddButton,
    showSearch,
    onSearch,
    searchPlaceholder,
    showFilters,
    onFilterClick,
    className,
}: TableProps) {
    return (
        <TableWrapper
            title={title}
            recordCount={recordCount}
            onAddClick={onAddClick}
            addButtonText={addButtonText}
            showAddButton={showAddButton}
            showSearch={showSearch}
            onSearch={onSearch}
            searchPlaceholder={searchPlaceholder}
            showFilters={showFilters}
            onFilterClick={onFilterClick}
            className={className}
        >
            {children}
        </TableWrapper>
    );
}

export { Table, TableContentWrapper, TableRow, TableGroupRowsWrapper };
export default Table;
