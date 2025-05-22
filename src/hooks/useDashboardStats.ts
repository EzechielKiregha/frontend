"use client";

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
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}
interface ResourceBreakdownItem {
  category: string;
  count: number;
}

interface AppointmentTrend {
  month: string;
  total: number;
  upcoming: number;
  completed: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [chartData, setChartData] = useState<AppointmentTrend[]>([]);
  const [resourceData, setResourceData] = useState<ResourceBreakdownItem[]>([]);
  const [tableData, setTableData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user) {
          await api.post(`/users/me?id=${user.userId}`);
        }

        const [statsRes, chartRes, tableRes, resourceRes] = await Promise.all([
          api.get("/dashboard/stats"),
          api.get("/dashboard/trends/appointments"),
          api.get("/dashboard/users-by-role"),
          api.get("/dashboard/resources-breakdown"),
        ]);

        setStats(statsRes.data);
        setChartData(chartRes.data);
        setTableData(tableRes.data);
        setResourceData(resourceRes.data);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, chartData, resourceData, tableData, loading, error };
};

