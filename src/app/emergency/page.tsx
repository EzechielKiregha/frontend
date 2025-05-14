import React from "react";
import { useEmergencyContacts } from "../../hooks/useEmergencyContacts";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function EmergencyPage() {
  const { data, loading, error } = useEmergencyContacts();

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Emergency Contacts</h1>
      <ul className="space-y-4">
        {data?.map((contact) => (
          <li key={contact.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold">{contact.name}</h2>
            <p className="text-sm text-gray-600">{contact.relationship}</p>
            <p className="text-gray-800">{contact.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
