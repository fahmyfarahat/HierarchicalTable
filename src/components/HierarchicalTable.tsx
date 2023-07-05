import React, { useState } from "react";
import { Box, Table, TableBody, TableHead, TableRow } from "@mui/material";
import ExpandButton from "./ExpandButton";
import { flattenColumns, getCollapsedColumns } from "../utils";
import { Column, LABELS, RowData, TableData } from "../types";
import {
  ColumnTableCell,
  EmptyTableCell,
  RowTableCell,
  StyledTableRow,
} from "./Ui";

const padding = ["0", "20px", "30px", "40px", "50px"] || "10px";

// This is a component to render individual columns of the table.
const ColumnComponent: React.FC<{
  column: Column;
  level?: number;
  handleCollapseToggle: (columnId: string) => void;
}> = ({ column, level = 0, handleCollapseToggle }) => {
  // Here we check if the current column has any child columns
  const hasChildren = column.children && column.children.length > 0;

  return (
    <>
      <ColumnTableCell>
        {/* We have an expand/collapse button for columns with children */}
        <ExpandButton
          onClick={() => handleCollapseToggle(column.id)}
          isOpen={column.collapsed}
          hide={!hasChildren}
        />
        {/* The name of the column */}
        {column.displayName}
      </ColumnTableCell>
      {/* If a column is expanded and has children, render child columns */}
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

// This is a component to render individual rows of the table.
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

  // Function to render labels in the row
  const renderLabel = () => {
    const numberValue = new Intl.NumberFormat("de-DE");
    return LABELS.map((label) => {
      return (
        <StyledTableRow>
          {label === "Units" ? (
            <RowTableCell
              style={{
                // fix cell width
                paddingLeft: padding[level],
                minWidth: 250,
                maxWidth: 450,
                width: 300,
              }}
            >
              <ExpandButton
                hide={!hasChildren}
                onClick={handleCollapseToggle}
                isOpen={collapsed}
              />
              {row.displayName}
            </RowTableCell>
          ) : (
            <RowTableCell
              style={{
                paddingLeft: padding[level],
                minWidth: 250,
                maxWidth: 450,
                width: 300,
              }}
            ></RowTableCell>
          )}
          <RowTableCell>{label}</RowTableCell>
          {columns.map((column) => {
            if (collapsedColumns?.includes(column.id)) {
              return null;
            }
            return (
              <RowTableCell key={column.id} style={{ paddingLeft: "30px" }}>
                {row.values &&
                  numberValue.format(
                    row.values.find((value) => value.columnId === column.id)
                      ?.values[label] || 0
                  )}
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
      {/* If a row is expanded and has children, render child rows */}
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

// This is the main component to render a hierarchical table.
const HierarchicalTable: React.FC<TableData> = ({ columns, rows }) => {
  // State for holding the structure of columns in the table
  const [dataColumns, setDataColumns] = useState<Column[]>(columns);

  // Effect to set the initial columns
  React.useEffect(() => {
    setDataColumns(columns);
  }, [columns]);

  // Function to handle the collapsing of columns, this function is memoized using useCallback
  const handleCollapseToggle = React.useCallback(
    (columnId: string) => {
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
    },
    [dataColumns]
  );

  // Here we get a flat array of columns and a list of collapsed columns
  const flattenedColumns = React.useMemo(
    () => flattenColumns(dataColumns),
    [dataColumns]
  );
  const collapsedColumns = React.useMemo(
    () => getCollapsedColumns(dataColumns),
    [dataColumns]
  );

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
