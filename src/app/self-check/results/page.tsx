"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/tables/DynamicTable";
import api from "../../../lib/api";

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "score", label: "Score" },
  { id: "date", label: "Date" },
];

export default function SelfCheckResults() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/self-check/results").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Self-Check Results</h1>
      <DynamicTable columns={columns} data={data} title="Results" />
    </div>
  );
}
