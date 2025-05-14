"use client";

import React, { useState } from "react";
import api from "../lib/api";

export default function ResourceUploadForm() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    resourceType: "Article",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/resources/upload", form, {
        params: { resourceType: form.resourceType },
      });
      setSuccess(true);
      setForm({ title: "", content: "", resourceType: "Article" });
    } catch (err) {
      setError("Failed to upload resource. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload Resource</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Resource uploaded successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <select
          title="Resource Type"
          name="resourceType"
          value={form.resourceType}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Article">Article</option>
          <option value="Video">Video</option>
          <option value="Guide">Guide</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
