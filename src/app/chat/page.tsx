"use client";

import React, { useState, useEffect } from "react";
import api from "../../lib/api";
import { useChat } from "../../hooks/useChat";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

export default function ChatPage() {
  const { user } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const { messages, sendMessage, error } = useChat(sessionId || "");

  useEffect(() => {
    const startChat = async () => {
      try {
        const response = await api.post("/chat/start", { userId: user?.userId });
        setSessionId(response.data.sessionId);
      } catch (err) {
        console.error("Failed to start chat:", err);
      }
    };

    if (user) startChat();
  }, [user]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessage(message);
      setMessage("");
    }
  };

  if (!sessionId) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border rounded-lg p-4 mb-4 h-64 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}
