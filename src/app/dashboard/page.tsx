"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import PatientDashboard from "../../components/dashboards/PatientDashboard";
import TherapistDashboard from "../../components/dashboards/TherapistDashboard";
import AdminDashboard from "../../components/dashboards/AdminDashboard";
import ManagerDashboard from "../../components/dashboards/ManagerDashboard";
import Loader from "@/components/Loader";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return <Loader message="User data is loading..." />;

  switch (user.role) {
    case "PATIENT":
      return <PatientDashboard />;
    case "THERAPIST":
      return <TherapistDashboard />;
    case "ADMIN":
      return <AdminDashboard />;
    case "MANAGER":
      return <ManagerDashboard />;
    default:
      return <p>Unauthorized</p>;
  }
}
