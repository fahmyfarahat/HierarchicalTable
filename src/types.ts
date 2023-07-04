export interface Value {
  Units: number;
  "Unit Price": number;
  "Gross Revenue": number;
  [key: string]: number;
}

export interface RowValues {
  columnId: string;
  values: Value;
  collapsed?: boolean;
}

export interface RowData {
  id: string;
  displayName: string;
  values?: RowValues[];
  children?: RowData[];
}

export interface Column {
  id: string;
  displayName: string;
  collapsed?: boolean;
  children?: Column[];
}

export interface TableData {
  columns: Column[];
  rows: RowData[];
}

export const LABELS = ["Units", "Unit Price", "Gross Revenue"];
