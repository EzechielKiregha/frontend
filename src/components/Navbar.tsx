"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { user, otpRequired, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={"/images/logo.png"}
            alt="Logo"
            className="h-10 w-10 mr-2 rounded-full"
          />
          <span className="text-xl font-bold">Ben Mental Health Care</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-4 items-center">
          <a href="/" className="hover:underline hover:underline-offset-4 transition-all duration-300">
            Home
          </a>
          <a href="/therapists" className="hover:underline hover:underline-offset-4 transition-all duration-300">
            Therapists
          </a>
          <a href="/self-check" className="hover:underline hover:underline-offset-4 transition-all duration-300">
            Self-Check
          </a>
          <a href="/resources" className="hover:underline hover:underline-offset-4 transition-all duration-300">
            Resources
          </a>
          {user && !otpRequired ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200">
                  <img
                    src="/images/avatar1.png"
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border border-green-600"
                  />
                  {/* <span>{user.firstName}</span> */}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <a href="/dashboard" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/settings" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Settings
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200">
                Menu
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <a href="/" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Home
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/therapists" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Therapists
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/self-check" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Self-Check
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/resources" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Resources
                </a>
              </DropdownMenuItem>
              {user && !otpRequired ? (
                <>
                  <DropdownMenuItem>
                    <a href="/dashboard" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                      Dashboard
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a href="/settings" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                      Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link href="/login" className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
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
