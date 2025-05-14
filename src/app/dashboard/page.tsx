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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold text-green-800">Total Appointments</h2>
            <p className="text-gray-800">{stats?.totalAppointments}</p>
          </div>
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold text-green-800">Completed Appointments</h2>
            <p className="text-gray-800">{stats?.completedAppointments}</p>
          </div>
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold text-green-800">Upcoming Appointments</h2>
            <p className="text-gray-800">{stats?.upcomingAppointments}</p>
          </div>
          <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-bold text-green-800">Messages</h2>
            <p className="text-gray-800">{stats?.messages}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <a href="/appointment" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            Book Appointments
          </a>
          <a href="/chat" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
            Open Chat
          </a>
        </div>
      </div>
    </RequireAuth>
  );
}
