import React, { useEffect, useState } from "react";
import HierarchicalTable from "./components/HierarchicalTable";
import { Layout } from "./components/Layout";
import { Container, Stack } from "@mui/material";
import { filterChanged, retrieveData } from "./api";
import filters from "./api/__mock__/filters";
import FiltersPanel from "./components/FiltersPanel";
import { TableData } from "./types";

function App() {
  const [data, setData] = useState<TableData | null>(null);

  const getTableData = async () => {
    const data = await retrieveData();
    setData(data.table);
  };

  useEffect(() => {
    getTableData();
  }, []);

  const handleFiltersChange = (filters: Record<string, string>) => {
    const filteredData = filterChanged(filters);
    setData(filteredData.table);
  };

  return (
    <Layout>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          marginBottom={2}
          justifyContent="flex-end"
          spacing={3}
        >
          <FiltersPanel filters={filters} onChange={handleFiltersChange} />
        </Stack>
        <Stack spacing={3}>
          {data && <HierarchicalTable {...(data as TableData)} />}
        </Stack>
      </Container>
    </Layout>
  );
}

export default App;
