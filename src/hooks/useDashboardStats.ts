"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
// It uses the `useState` and `useEffect` hooks to manage the state of the data, loading status, and error messages.
import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "@/context/AuthContext";

interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  messages: number;
}

interface Patient {
  id: number
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleIds: number[];
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const { user } = useAuth()
    const [patientData, setPatientData] = useState<Patient>()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user) getPatientData(user.userId)
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
        
      } catch (err) {
        setError("Failed to fetch dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const getPatientData = async (id: string) => {
    const res = await api.post(`/users/me?id=${id}`);
    if (res.status === 200) {
      setPatientData(res.data)
    }
  }

  return {patientData, stats, loading, error };
};
