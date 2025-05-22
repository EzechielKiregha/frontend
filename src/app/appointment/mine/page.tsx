"use client";

import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/tables/DynamicTable";
import Loader from "../../../components/Loader";
import api from "../../../lib/api";

const columns = [
  { id: "id", label: "ID" },
  { id: "patient", label: "Patient" },
  { id: "date", label: "Date" },
  { id: "status", label: "Status" },
];

export default function MyAppointments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/appointments/mine")
      .then((response) => {
        setData(response.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">My Appointments</h1>
      {loading ? (
        <Loader message="Loading appointments..." />
      ) : (
        <DynamicTable columns={columns} data={data} title="Appointments" />
      )}
    </div>
  );
}
