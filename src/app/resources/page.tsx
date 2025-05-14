"use client";

import React from "react";
import { useResources } from "../../hooks/useResources";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function ResourcesPage() {
  const { data, loading, error } = useResources();
  const { user } = useAuth();

  const handleSave = async (resourceId: string) => {
    try {
      await api.post(`/resources/${resourceId}/save`);
      alert("Resource saved successfully!");
    } catch (err) {
      console.error("Failed to save resource:", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resources</h1>
      <ul className="space-y-4">
        {data?.map((resource) => (
          <li key={resource.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">{resource.title}</h2>
            <p className="text-sm text-gray-600">{resource.resourceType}</p>
            <p className="mt-2 text-gray-800">{resource.content.slice(0, 100)}...</p>
            {user?.role === "PATIENT" && (
              <button
                onClick={() => handleSave(resource.id)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
