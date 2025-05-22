"use client";

import React from "react";
import { BarChart, CartesianGrid, XAxis, Bar, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import DynamicTable from '@/components/tables/DynamicTable';
import { useDashboardStats } from '@/hooks/useDashboardStats';

const COLORS = ['#4CAF50', '#81C784', '#C8E6C9', '#2E7D32', '#A5D6A7'];

const columns = [
  { id: 'id', label: 'ID' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'role', label: 'Role' },
];

export default function TherapistDashboard() {
  const { stats, chartData, resourceData, tableData, loading, error } = useDashboardStats();

  const handleDelete = (selected: string[]) => {
    console.log("Deleted rows:", selected);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Therapist Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
        <a href="/self-check/results" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Self-Check Results</h2>
        </a>
        <a href="/resources/upload" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Add Resource</h2>
        </a>
        <a href="/appointment/mine" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">My Appointments with patients</h2>
        </a>
        <a href="/therapists/register" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Register A Patient</h2>
        </a>
      </div>
      {loading ? (
        <p className="text-green-800">Loading dashboard data...</p>
      ) : error ? (
        <p className="text-red-600">Failed to load dashboard data: {error}</p>
      ) : (
        <><div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold text-green-800 mb-4">Appointment Trends</h2>
            <BarChart width={500} height={300} data={chartData}>
              <XAxis dataKey="month" />
              <CartesianGrid vertical={false} />
              <Tooltip />
              <Bar dataKey="scheduled" fill="#4CAF50" />
              <Bar dataKey="completed" fill="#81C784" />
              <Bar dataKey="cancelled" fill="#C8E6C9" />
            </BarChart>
          </div>

          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold text-green-800 mb-4">Resources by Category</h2>
            <PieChart width={300} height={250}>
              <Pie
                data={resourceData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {resourceData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div><div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-green-800 mb-4">Statistics</h2>
            <ul className="grid grid-cols-2 gap-4">
              {stats && Object.entries(stats).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-bold">{v}</span>
                </li>
              ))}
            </ul>
          </div></>
      )}
      <DynamicTable
        columns={columns}
        data={tableData}
        title="Patient List"
        onDelete={handleDelete}
      />
    </div>
  );
}
