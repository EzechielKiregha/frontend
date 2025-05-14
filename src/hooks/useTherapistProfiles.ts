"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import { useState, useEffect } from "react";
import api from "../lib/api";

interface TherapistProfile {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
}

export const useTherapistProfiles = () => {
  const [data, setData] = useState<TherapistProfile[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get("/therapists-profiles");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch therapist profiles.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return { data, loading, error };
};
