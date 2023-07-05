import { Column } from "./types";

/**
 * This function receives a list of Column objects as an argument and returns a new
 * flattened array containing all Column objects in the hierarchy.
 * It uses recursion to traverse the children of each Column and add them to the output array.
 *
 * @param {Column[]} columns - The initial list of Column objects, each of which may have a nested 'children' property
 * @returns {Column[]} - A new flattened array containing all Column objects
 */
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

/**
 * This function receives a list of Column objects as an argument and returns a new
 * array containing the ids of all collapsed Column objects in the hierarchy.
 * It uses recursion to traverse the children of each Column and, if the Column or
 * its parent is collapsed, adds the Column id to the output array.
 *
 * @param {Column[]} list - The initial list of Column objects, each of which may have a nested 'children' property
 * @returns {string[]} - A new array containing the ids of all collapsed Column objects
 */
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
