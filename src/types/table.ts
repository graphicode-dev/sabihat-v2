export interface TableData {
  id: string;
  avatar?: string;
  columns: Record<string, string | number | boolean>;
  group?: string;
  selected?: boolean;
}

export type ViewMode = 'grid' | 'cards' | 'group';

export interface TableColumn {
  id: string;
  header: string;
  accessorKey: string;
  sortable?: boolean;
}

export interface FilterOption {
  id: string;
  label: string; 
  value: string;
}

export type FilterOperator = 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';

export interface FilterConfig {
  column: string;
  operator: FilterOperator;
  value: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  column: string;
  direction: SortDirection;
}
