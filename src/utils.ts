import { Column } from "./types";

export const flattenColumns = (columns: Column[]): Column[] => {
  return columns.reduce((acc: Column[], column: Column) => {
    acc.push(column);
    if (column.children) {
      acc.push(...flattenColumns(column.children));
    }
    return acc;
  }, []);
};
