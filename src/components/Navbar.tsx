"use client";

import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Mental Health</h1>
        <div className="flex gap-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/therapists" className="hover:underline">
            Therapists
          </a>
          <a href="/self-check" className="hover:underline">
            Self-Check
          </a>
          <a href="/resources" className="hover:underline">
            Resources
          </a>
        </div>
      </div>
    </nav>
  );
}
