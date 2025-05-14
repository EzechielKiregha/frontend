"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
// It uses the `useState` and `useEffect` hooks to manage the state of the data, loading status, and error messages.
import { useState, useEffect } from "react";
import api from "../lib/api";

interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  messages: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
      } catch (err) {
        setError("Failed to fetch dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
