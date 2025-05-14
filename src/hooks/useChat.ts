"use client";
// This code is a custom React hook that fetches resources from an API endpoint.
import { useState, useEffect } from "react";
import api from "../lib/api";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(`/chat/${sessionId}`);
        setMessages(response.data);
      } catch (err) {
        setError("Failed to fetch messages.");
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const sendMessage = async (text: string) => {
    try {
      await api.post(`/chat/${sessionId}`, { text });
    } catch (err) {
      setError("Failed to send message.");
    }
  };

  return { messages, sendMessage, error };
};
