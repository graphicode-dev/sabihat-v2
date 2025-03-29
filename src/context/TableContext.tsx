import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
export interface TableRow {
    id: string;
    [key: string]: any;
}

export interface TableGroup {
    id: string;
    title: string;
    value?: string;
    rows: TableRow[];
}

interface TableContextType {
    // Data
    groups: TableGroup[];
    setGroups: React.Dispatch<React.SetStateAction<TableGroup[]>>;
    
    // Selection state
    selectedRows: Set<string>;
    selectedGroups: Set<string>;
    expandedGroups: Set<string>;
    
    // Search and filter
    searchQuery: string;
    filters: Record<string, any>;
    sortField: string | null;
    sortDirection: 'asc' | 'desc';
    
    // Actions
    selectRow: (id: string, selected: boolean) => void;
    selectGroup: (id: string, selected: boolean) => void;
    toggleGroup: (id: string) => void;
    setSearchQuery: (query: string) => void;
    setFilter: (field: string, value: any) => void;
    clearFilters: () => void;
    setSorting: (field: string) => void;
    
    // Computed properties
    filteredGroups: TableGroup[];
    totalRowCount: number;
}

// Create the context with default values
const TableContext = createContext<TableContextType | undefined>(undefined);

interface TableProviderProps {
    children: ReactNode;
    initialGroups?: TableGroup[];
    initialExpandedGroups?: string[];
}

export const TableProvider: React.FC<TableProviderProps> = ({ 
    children, 
    initialGroups = [],
    initialExpandedGroups = []
}) => {
    // State for data
    const [groups, setGroups] = useState<TableGroup[]>(initialGroups);
    
    // State for selection
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(initialExpandedGroups));
    
    // State for search and filter
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    
    // Action handlers
    const selectRow = (id: string, selected: boolean) => {
        const newSelected = new Set(selectedRows);
        if (selected) {
            newSelected.add(id);
        } else {
            newSelected.delete(id);
        }
        setSelectedRows(newSelected);
    };
    
    const selectGroup = (id: string, selected: boolean) => {
        const newSelected = new Set(selectedGroups);
        if (selected) {
            newSelected.add(id);
            
            // Optionally select all rows in the group
            const group = groups.find(g => g.id === id);
            if (group) {
                const newSelectedRows = new Set(selectedRows);
                group.rows.forEach(row => newSelectedRows.add(row.id));
                setSelectedRows(newSelectedRows);
            }
        } else {
            newSelected.delete(id);
            
            // Optionally deselect all rows in the group
            const group = groups.find(g => g.id === id);
            if (group) {
                const newSelectedRows = new Set(selectedRows);
                group.rows.forEach(row => newSelectedRows.delete(row.id));
                setSelectedRows(newSelectedRows);
            }
        }
        setSelectedGroups(newSelected);
    };
    
    const toggleGroup = (id: string) => {
        const newExpanded = new Set(expandedGroups);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedGroups(newExpanded);
    };
    
    const setFilter = (field: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };
    
    const clearFilters = () => {
        setFilters({});
        setSearchQuery('');
    };
    
    const setSorting = (field: string) => {
        if (sortField === field) {
            // Toggle direction if same field
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            // New field, default to ascending
            setSortField(field);
            setSortDirection('asc');
        }
    };
    
    // Computed properties
    const filteredGroups = React.useMemo(() => {
        // First apply search and filters
        const filtered = groups.map(group => {
            const filteredRows = group.rows.filter(row => {
                // Apply search query
                if (searchQuery) {
                    const searchLower = searchQuery.toLowerCase();
                    const matchesSearch = Object.values(row).some(value => 
                        value && typeof value === 'string' && value.toLowerCase().includes(searchLower)
                    );
                    if (!matchesSearch) return false;
                }
                
                // Apply filters
                for (const [field, filterValue] of Object.entries(filters)) {
                    if (filterValue === undefined || filterValue === null) continue;
                    
                    const rowValue = row[field];
                    if (Array.isArray(filterValue)) {
                        if (!filterValue.includes(rowValue)) return false;
                    } else if (rowValue !== filterValue) {
                        return false;
                    }
                }
                
                return true;
            });
            
            return {
                ...group,
                rows: filteredRows
            };
        }).filter(group => group.rows.length > 0);
        
        // Then apply sorting
        if (sortField) {
            return filtered.map(group => {
                const sortedRows = [...group.rows].sort((a, b) => {
                    const aValue = a[sortField];
                    const bValue = b[sortField];
                    
                    if (aValue === bValue) return 0;
                    
                    const comparison = aValue > bValue ? 1 : -1;
                    return sortDirection === 'asc' ? comparison : -comparison;
                });
                
                return {
                    ...group,
                    rows: sortedRows
                };
            });
        }
        
        return filtered;
    }, [groups, searchQuery, filters, sortField, sortDirection]);
    
    const totalRowCount = React.useMemo(() => {
        return groups.reduce((total, group) => total + group.rows.length, 0);
    }, [groups]);
    
    const value = {
        // Data
        groups,
        setGroups,
        
        // Selection state
        selectedRows,
        selectedGroups,
        expandedGroups,
        
        // Search and filter
        searchQuery,
        filters,
        sortField,
        sortDirection,
        
        // Actions
        selectRow,
        selectGroup,
        toggleGroup,
        setSearchQuery,
        setFilter,
        clearFilters,
        setSorting,
        
        // Computed properties
        filteredGroups,
        totalRowCount
    };
    
    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
};

// Custom hook to use the table context
export const useTable = () => {
    const context = useContext(TableContext);
    if (context === undefined) {
        throw new Error('useTable must be used within a TableProvider');
    }
    return context;
};
