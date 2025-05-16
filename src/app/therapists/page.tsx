"use client";
import React from "react";
import { useTherapistProfiles } from "../../hooks/useTherapistProfiles";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import Hero from "@/components/Hero";
import AlertDialog from "@/components/ui/AlertDialog";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function TherapistsPage() {
  const { profiles, therapists, loading, error } = useTherapistProfiles();
  const { user } = useAuth();
  const router = useRouter();

  const handleStartChat = async (therapistId: number) => {
    try {
      const response = await api.post(`/api/chat/start?userId=${user?.userId}&therapistId=${therapistId}`);
      const chatSession = response.data;
      router.push(`/chat/${chatSession.id}`);
    } catch (err) {
      console.error("Failed to start chat session:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <Hero
        title="Therapists"
        subtitle="Find the right therapist for you."
        imageSrc="/images/Blog-article_banner-image.png"
        reverse={true}
        ctaText="Read about our therapists"
        ctaLink="/therapists/#therapist"
      />
      <div id="therapist" className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-4">Therapists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {therapists?.map((therapist) => {
            const profile = profiles?.find((p) => p.userId === therapist.id);
            return (
              <div key={therapist.id} className="bg-green-50 border border-green-600 rounded-lg p-4 shadow-sm">
                <img
                  src={profile?.photoUrl || "/default-avatar.png"}
                  alt={therapist.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-bold text-green-800">{therapist.name}</h2>
                <p className="text-sm text-gray-600">{profile?.specialty || "Specialty not available"}</p>
                <p className="mt-2 text-gray-800">{profile?.bio || "No bio available"}</p>
                <AlertDialog
                  title="Start Chat"
                  description={`Are you sure you want to start a chat session with ${therapist.name}?`}
                  onConfirm={() => handleStartChat(therapist.id)}
                >
                  <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white rounded py-2">
                    Chat
                  </button>
                </AlertDialog>
              </div>
            );
          })}
        </div>
      </div >
    </>
  );
}
