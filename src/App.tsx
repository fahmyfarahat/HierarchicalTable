import React, { useEffect, useState } from "react";
import DataTable, { TableProps } from "./components/DataTable";
import { retrieveData } from "./api";

function App() {
  const [data, setData] = useState<TableProps | null>(null);

  useEffect(() => {
    retrieveData().then((result) => {
      setData(result?.tableData);
    });
  }, []);

  return (
    <div className="App">{data && <DataTable {...(data as TableProps)} />}</div>
  );
}

export default App;
