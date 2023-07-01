import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

type RowValues = {
  name: string;
  values: number[];
};

type RowData = {
  name: string;
  collapsed: boolean;
  rows?: RowValues[];
  subRows?: RowData[];
};

export type TableProps = {
  headers?: string[];
  rows: RowData[];
};

const RowComponent: React.FC<{ row: RowData; level?: number }> = ({
  row,
  level = 0,
}) => {
  const [collapsed, setCollapsed] = useState(row.collapsed);

  const hasChildren = row.subRows && row.subRows.length > 0;

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {row.rows &&
        row.rows.map((dataRow, index) => (
          <TableRow
            key={dataRow.name}
            onClick={index === 0 ? handleCollapseToggle : undefined}
          >
            {index === 0 ? (
              <TableCell style={{ paddingLeft: `${level * 20}px` }}>
                {hasChildren ? (collapsed ? "▶" : "▼") : ""} {row.name}
              </TableCell>
            ) : (
              <TableCell></TableCell>
            )}

            <TableCell>{dataRow.name}</TableCell>
            {dataRow.values.map((value, idx) => (
              <TableCell key={idx}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      {!collapsed &&
        hasChildren &&
        row.subRows &&
        row.subRows.map((subRow) => (
          <RowComponent key={subRow.name} row={subRow} level={level + 1} />
        ))}
    </>
  );
};

const TableComponent: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers &&
              headers.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row) => <RowComponent key={row.name} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
