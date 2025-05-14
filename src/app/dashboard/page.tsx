import React from "react";
import RequireAuth from "../../components/RequireAuth";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function DashboardPage() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <RequireAuth>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">Total Appointments</h2>
            <p>{stats?.totalAppointments}</p>
          </div>
          <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">Completed Appointments</h2>
            <p>{stats?.completedAppointments}</p>
          </div>
          <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">Upcoming Appointments</h2>
            <p>{stats?.upcomingAppointments}</p>
          </div>
          <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">Messages</h2>
            <p>{stats?.messages}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <a href="/appointment" className="px-4 py-2 bg-blue-500 text-white rounded">
            Book Appointments
          </a>
          <a href="/chat" className="px-4 py-2 bg-green-500 text-white rounded">
            Open Chat
          </a>
        </div>
      </div>
    </RequireAuth>
  );
}
