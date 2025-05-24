"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import useSWR from "swr";
import api from "../lib/api";
import { useAuth } from "@/context/AuthContext";
import { Patient } from "./useDashboardStats";


interface Appointment {
  id: number;
  date: string;
  time: string;
  user: Patient;
  therapist: Patient;
  status: string;
}

export const useAppointments = () => {

  const { user } = useAuth();

  const { data, error, mutate } = useSWR("/appointment", async () => {
    const response = await api.get<Appointment[]>("/appointments", {
      params:{
        userId: user?.userId,
      }
    });
    return response.data;
  });

  const bookAppointment = async (details: object) => {
    await api.post("/appointments/book", details,);
    mutate();
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    await api.post(`/appointments/update-status`, { id, status });
    mutate();
  };

  return { appointments: data, error, bookAppointment, updateAppointmentStatus };
};
