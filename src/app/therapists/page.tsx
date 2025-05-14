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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Therapists</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((profile) => (
          <div key={profile.id} className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold text-green-800">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.specialty}</p>
            <p className="mt-2 text-gray-800">{profile.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
