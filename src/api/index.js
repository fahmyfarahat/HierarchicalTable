import data from "./__mock__/table";
import dataTable from "./__mock__/dataTable";

export async function retrieveData() {
  return data;
}

export function filterChanged(filters) {
  return dataTable();
}
