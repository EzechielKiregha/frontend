'use client';
import React from 'react';

interface ErrorProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorProps) {
  return (
    <div className="border border-red-400 bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
      <strong className="font-bold">Error:</strong>
      <span className="block">{message}</span>
    </div>
  );
}
