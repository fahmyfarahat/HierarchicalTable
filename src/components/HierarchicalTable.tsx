import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import ExpandButton from "./ExpandButton";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EmptyTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const ColumnTableCell = styled(TableCell)(({ theme }) => ({
  padding: "15px",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === "dark" ? "#232323" : "#EBEEFE",
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const RowTableCell = styled(TableCell)(({ theme }) => ({
  padding: "10px",
}));

interface Value {
  Units: number;
  "Unit Price": number;
  "Gross Revenue": number;
  [key: string]: number;
}

interface RowValues {
  columnId: string;
  values: Value;
  collapsed?: boolean;
}

interface RowData {
  id: string;
  displayName: string;
  values?: RowValues[];
  children?: RowData[];
}

interface Column {
  id: string;
  displayName: string;
  collapsed?: boolean;
  children?: Column[];
}

export interface TableData {
  columns: Column[];
  rows: RowData[];
}

const ColumnComponent: React.FC<{
  column: Column;
  level?: number;
  handleCollapseToggle: (columnId: string) => void;
}> = ({ column, level = 0, handleCollapseToggle }) => {
  const hasChildren = column.children && column.children.length > 0;

  return (
    <>
      <ColumnTableCell>
        <ExpandButton
          onClick={() => handleCollapseToggle(column.id)}
          isOpen={column.collapsed}
          hide={!hasChildren}
        />
        {column.displayName}
      </ColumnTableCell>
      {!column.collapsed &&
        column.children &&
        column.children.map((childColumn) => (
          <ColumnComponent
            key={childColumn.id}
            column={childColumn}
            level={level + 1}
            handleCollapseToggle={handleCollapseToggle}
          />
        ))}
    </>
  );
};

const RowComponent: React.FC<{
  row: RowData;
  level?: number;
  columns: Column[];
  collapsedColumns?: string[];
}> = ({ row, level = 0, columns, collapsedColumns }) => {
  const [collapsed, setCollapsed] = useState(false);

  const hasChildren = row.children && row.children.length > 0;

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const renderLabel = () => {
    const labels = ["Units", "Unit Price", "Gross Revenue"];
    const padding = ["0", "20px", "30px", "40px", "50px"] || "10px";

    return labels.map((label) => {
      return (
        <StyledTableRow>
          {label === "Units" ? (
            <RowTableCell
              style={{ paddingLeft: padding[level], minWidth: 250 }}
            >
              <ExpandButton
                hide={!hasChildren}
                onClick={handleCollapseToggle}
                isOpen={collapsed}
              />
              {row.displayName}
            </RowTableCell>
          ) : (
            <RowTableCell></RowTableCell>
          )}
          <RowTableCell>{label}</RowTableCell>
          {columns.map((column) => {
            if (collapsedColumns?.includes(column.id)) {
              return null;
            }
            return (
              <RowTableCell key={column.id}>
                {row.values &&
                  row.values.find((value) => value.columnId === column.id)
                    ?.values[label]}
              </RowTableCell>
            );
          })}
        </StyledTableRow>
      );
    });
  };

  return (
    <>
      {renderLabel()}
      {!collapsed &&
        hasChildren &&
        row.children &&
        row.children.map((childRow) => (
          <RowComponent
            key={childRow.id}
            row={childRow}
            level={level + 1}
            columns={columns}
            collapsedColumns={collapsedColumns}
          />
        ))}
    </>
  );
};

const flattenColumns = (columns: Column[]): Column[] => {
  let flattenedColumns: Column[] = [];

  columns.forEach((column) => {
    flattenedColumns.push(column);

    if (column.children) {
      flattenedColumns = [
        ...flattenedColumns,
        ...flattenColumns(column.children),
      ];
    }
  });

  return flattenedColumns;
};

const getCollapsedColumns = (list: Column[]): string[] => {
  let output: string[] = [];

  const traverse = (node: Column, isParentCollapsed: boolean): void => {
    if (node.children) {
      for (let child of node.children) {
        if (isParentCollapsed || node.collapsed) {
          output.push(child.id);
        }
        traverse(child, node.collapsed || isParentCollapsed);
      }
    }
  };

  for (let item of list) {
    traverse(item, false);
  }

  return output;
};

const HierarchicalTable: React.FC<TableData> = ({ columns, rows }) => {
  const [dataColumns, setDataColumns] = useState<Column[]>(columns);

  const handleCollapseToggle = (columnId: string) => {
    const toggleCollapse = (columns: Column[]): Column[] => {
      return columns.map((column) => {
        if (column.id === columnId) {
          return { ...column, collapsed: !column.collapsed };
        } else if (column.children) {
          return { ...column, children: toggleCollapse(column.children) };
        } else {
          return column;
        }
      });
    };

    setDataColumns(toggleCollapse(dataColumns));
  };

  const flattenedColumns = flattenColumns(dataColumns);

  const collapsedColumns = getCollapsedColumns(dataColumns);

  return (
    <Box sx={{ minWidth: 800 }}>
      <Table>
        <TableHead>
          <TableRow>
            <EmptyTableCell />
            <EmptyTableCell />
            {dataColumns &&
              dataColumns.map((column) => (
                <ColumnComponent
                  key={column.id}
                  column={column}
                  handleCollapseToggle={handleCollapseToggle}
                />
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <RowComponent
                key={row.id}
                row={row}
                columns={flattenedColumns}
                collapsedColumns={collapsedColumns}
              />
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HierarchicalTable;
