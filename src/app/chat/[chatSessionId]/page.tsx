"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Loader from "@/components/Loader";
import ErrorMessage from "@/components/ErrorMessage";

export default function ChatSessionPage() {
  const { chatSessionId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/api/chat/${chatSessionId}`);
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch chat messages:", err);
        setError("Failed to load chat messages.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatSessionId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      try {
        const response = await api.post(`/api/chat/${chatSessionId}/message`, {
          sender: "USER", // Adjust based on your backend logic
          text: message,
        });
        setMessages((prev) => [...prev, response.data]);
        setMessage("");
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-green-800 mb-4">Chat Session</h1>
      <div className="bg-green-50 border border-green-600 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong className="text-green-800">{msg.sender}:</strong>{" "}
            <span className="text-gray-800">{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600"
          placeholder="Type a message..."
        />
        <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
