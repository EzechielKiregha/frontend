"use client";

import React, { useState } from "react";
import RequireAuth from "../../components/RequireAuth";
import { useAppointments } from "../../hooks/useAppointments";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function AppointmentPage() {
  const { appointments, error, bookAppointment, updateAppointmentStatus } = useAppointments();
  const [newAppointment, setNewAppointment] = useState("");

  const handleBook = async () => {
    if (newAppointment.trim()) {
      await bookAppointment({ details: newAppointment });
      setNewAppointment("");
    }
  };

  if (!appointments) return <Loader />;
  if (error) return <ErrorMessage message="Failed to load appointments." />;

  return (
    <RequireAuth>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Appointments</h1>
        <ul className="space-y-4">
          {appointments?.map((appointment: any) => (
            <li key={appointment.id} className="border rounded-lg p-4 shadow-md">
              <p>{appointment.details}</p>
              <button
                onClick={() => updateAppointmentStatus(appointment.id, "completed")}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Mark as Completed
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            value={newAppointment}
            onChange={(e) => setNewAppointment(e.target.value)}
            className="p-2 border rounded w-full"
            placeholder="New appointment details..."
          />
          <button onClick={handleBook} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Book Appointment
          </button>
        </div>
      </div>
    </RequireAuth>
  );
}
