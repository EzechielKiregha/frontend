"use client";
import React from "react";
import { useTherapistProfiles } from "../../hooks/useTherapistProfiles";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Hero from "@/components/Hero";

export default function TherapistsPage() {
  const { data, loading, error } = useTherapistProfiles();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <><Hero
      title="Therapists"
      subtitle="Find the right therapist for you."
      imageSrc="/images/Blog-article_banner-image.png"
      reverse={true}
      ctaText="Get Started"
      ctaLink="/therapists/#therapist" // Adjust the link as needed
    /><div id="therapist" className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Therapists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((profile) => (
            <div key={profile.id} className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
              <img
                src={profile.photoUrl}
                alt={profile.photoUrl}
                className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-lg font-bold text-green-800">{profile.photoUrl}</h2>
              <p className="text-sm text-gray-600">{profile.specialty}</p>
              <p className="mt-2 text-gray-800">{profile.bio}</p>
            </div>
          ))}
        </div>
      </div></>
  );
}
