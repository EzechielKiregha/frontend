"use client";

import React from "react";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export default function PatientDashboard() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const handleConfirmAppointment = () => {
    console.log("Appointment confirmed!");
  };

  const handleCancelAppointment = () => {
    console.log("Appointment canceled!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Patient Dashboard</h1>

      {/* Profile Section */}
      <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-green-800">Your Profile</h2>
        <p className="text-gray-800">Name: John Doe</p>
        <p className="text-gray-800">Email: john.doe@example.com</p>
        <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
          Update Profile
        </Button>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <a href="/self-check" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Self-Check</h2>
        </a>
        <a href="/resources" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Recommended Resources</h2>
        </a>
        <a href="/appointment" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Appointments</h2>
        </a>
        <a href="/therapists" className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm text-center hover:bg-green-100">
          <h2 className="text-lg font-bold text-green-800">Therapists</h2>
        </a>
      </div>

      {/* Appointment Confirmation */}
      <div className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-bold text-green-800 mb-4">Upcoming Appointment</h2>
        <p className="text-gray-800">Date: 2023-12-01</p>
        <p className="text-gray-800">Time: 10:00 AM</p>
        <p className="text-gray-800">Therapist: Dr. Jane Smith</p>
        <div className="mt-4 flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Confirm Appointment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Appointment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to confirm this appointment?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmAppointment}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 border-red-600">
                Cancel Appointment
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this appointment? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelAppointment}>
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
