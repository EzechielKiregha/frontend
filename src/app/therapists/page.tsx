"use client";
import React from "react";
import { useTherapistProfiles } from "../../hooks/useTherapistProfiles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function TherapistsPage() {
  const { data, loading, error } = useTherapistProfiles();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.map((profile) => (
        <div key={profile.id} className="border rounded-lg p-4 shadow-md">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-lg font-bold">{profile.name}</h2>
          <p className="text-sm text-gray-600">{profile.specialty}</p>
          <p className="mt-2 text-gray-800">{profile.bio}</p>
        </div>
      ))}
    </div>
  );
}
