"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import useSWR from "swr";
import api from "../lib/api";

export const useAppointments = () => {
  const { data, error, mutate } = useSWR("/appointment", async () => {
    const response = await api.get("/appointment");
    return response.data;
  });

  const bookAppointment = async (details: object) => {
    await api.post("/appointment/book", details);
    mutate();
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    await api.post(`/appointment/update-status`, { id, status });
    mutate();
  };

  return { appointments: data, error, bookAppointment, updateAppointmentStatus };
};
