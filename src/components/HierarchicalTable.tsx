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
    const padding = ["0", "20px", "30px", "40px", "50px"] || "10px";
    const numberValue = new Intl.NumberFormat("de-DE");
    return LABELS.map((label) => {
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

const HierarchicalTable: React.FC<TableData> = ({ columns, rows }) => {
  const [dataColumns, setDataColumns] = useState<Column[]>(columns);

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

  const columnsMemo = React.useMemo(
    () => ({
      flattenedColumns: flattenColumns(dataColumns),
      collapsedColumns: getCollapsedColumns(dataColumns),
    }),
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
                columns={columnsMemo.flattenedColumns}
                collapsedColumns={columnsMemo.collapsedColumns}
              />
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default HierarchicalTable;
