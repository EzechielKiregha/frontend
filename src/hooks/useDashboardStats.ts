"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";
import { useAuth } from "@/context/AuthContext";

export interface DashboardStats {
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
  messages: number;
}

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}
export interface ResourceBreakdownItem {
  category: string;
  count: number;
}

export interface AppointmentTrend {
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
  const [error, setError] = useState<string| null>(null);
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        if (user) {
          await getPatientData(user.userId);
        }
        const [ statsRes, trendsRes, patientsRes ] = await Promise.all([
          api.get<DashboardStats>('/dashboard/stats'),
          api.get<AppointmentTrend[]>('/dashboard/trends/appointments'),
          api.get<Patient[]>('/dashboard/patients')
        ]);

        const resourcesRes = await api.get<Record<string, number>>(
          '/dashboard/resources-breakdown'
        );

        // Convert { articles: 5, guides: 4, exercises: 2 } →
        // [ { category: 'articles', count: 5 }, … ]
        const resourceArray = Object.entries(resourcesRes.data).map(
          ([category, count]) => ({ category, count })
        );
        setResourceData(resourceArray);

        setStats(statsRes.data);
        setChartData(trendsRes.data);
        setTableData(patientsRes.data);
      } catch {
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [user]);

  const getPatientData = async (id: string) => {
    const res = await api.post(`/users/me?id=${id}`);
    if (res.status === 200) {
      setPatientData(res.data)
    }
  }

  return { stats, chartData, resourceData, tableData, loading, error };
};

