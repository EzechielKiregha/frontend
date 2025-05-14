"use client";

import React, { useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const questions = [
  "Do you feel stressed often?",
  "Do you have trouble sleeping?",
  "Do you feel overwhelmed by daily tasks?",
  "Do you experience frequent mood swings?",
  "Do you feel disconnected from others?",
];

export default function SelfCheckQuiz() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<boolean[]>(Array(questions.length).fill(false));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (index: number, value: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const score = answers.filter((answer) => answer).length;
    const payload = {
      userId: user?.userId,
      score,
      answersJson: JSON.stringify(answers),
      takenAt: new Date().toISOString(),
    };

    try {
      await api.post("/self-check", payload);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit self-check:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div>Thank you for completing the self-check quiz!</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Self-Check Quiz</h1>
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li key={index} className="border rounded-lg p-4 shadow-md">
            <p>{question}</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleAnswer(index, true)}
                className={`px-4 py-2 rounded ${answers[index] ? "bg-green-500 text-white" : "bg-gray-200"}`}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(index, false)}
                className={`px-4 py-2 rounded ${!answers[index] ? "bg-red-500 text-white" : "bg-gray-200"}`}
              >
                No
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Submit
      </button>
    </div>
  );
}
