"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={"/images/logo.png"}
            alt="Logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
          <span className="text-xl font-bold">Ben Mental Health Care</span>
        </div>
        <button
          className="md:hidden bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
          onClick={toggleMenu}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <div
          className={`${menuOpen ? "block" : "hidden"
            } md:flex gap-4 items-center`}
        >
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
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="bg-white mt-0 text-green-600 px-2 py-1 rounded hover:bg-gray-200"
              >
                Dashboard
              </Link>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
