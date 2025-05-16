"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, otpRequired, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={"/images/logo.png"}
            alt="Logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
          <span className="text-xl font-bold">Ben Mental Health Care</span>
        </div>
        <div className="hidden md:flex gap-4 items-center">
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
          {user && !otpRequired ? (
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
            <Link
              href="/login"
              className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
            >
              Get Started
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200">
                Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <a href="/" className="text-green-800">
                  Home
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/therapists" className="text-green-800">
                  Therapists
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/self-check" className="text-green-800">
                  Self-Check
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/resources" className="text-green-800">
                  Resources
                </a>
              </DropdownMenuItem>
              {user && !otpRequired ? (
                <>
                  <DropdownMenuItem>
                    <Link href="/dashboard" className="text-green-800">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-green-800">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link href="/login" className="text-green-800">
                    Get Started
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
