"use client";

import React, { useState } from "react";
import api from "../../../lib/api";
import Loader from "../../../components/Loader";
import ErrorMessage from "../../../components/ErrorMessage";
import Button from "../../../components/Button";

export default function RegisterPatient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/therapists/register", form);
      alert("Patient registered successfully!");
      setForm({ name: "", email: "" });
    } catch (err) {
      setError("Failed to register patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img src="/register-patient.jpg" alt="Register Patient" className="rounded-lg" />
      </div>
      <div className="bg-white border border-green-600 rounded-lg p-8 shadow-lg">
        <h1 className="text-green-800 text-2xl font-bold mb-4">Register Patient</h1>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
