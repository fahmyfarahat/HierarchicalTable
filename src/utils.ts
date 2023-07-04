import { Column } from "./types";

export const flattenColumns = (columns: Column[]): Column[] => {
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

export const getCollapsedColumns = (list: Column[]): string[] => {
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
