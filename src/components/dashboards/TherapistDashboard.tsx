"use client";

import React from "react";
import { Component as Chart } from "../charts/BarChart";
import DynamicTable from "../tables/DynamicTable";

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
];

const data = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Patient" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Patient" },
  { id: "3", name: "Alice Brown", email: "alice@example.com", role: "Patient" },
];

export default function TherapistDashboard() {
  const handleDelete = (selected: string[]) => {
    console.log("Deleted rows:", selected);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Therapist Dashboard</h1>
      <div className="mb-8">
        <Chart />
      </div>
      <DynamicTable
        columns={columns}
        data={data}
        title="Patient List"
        onDelete={handleDelete}
      />
    </div>
  );
}
