"use client";

import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import Link from "next/link";

interface NavbarProps {
  handleNavigation: (href: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleNavigation }) => {
  const { user, otpRequired, logout } = useAuth();
  const { patientData } = useDashboardStats();

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
          <Button variant="link" onClick={() => handleNavigation("/")} className="hover:underline hover:underline-offset-4 text-white transition-all duration-300">
            Home
          </Button>
          <Button variant="link" onClick={() => handleNavigation("/therapists")} className="hover:underline hover:underline-offset-4 text-white transition-all duration-300">
            Therapists
          </Button>
          <Button variant="link" onClick={() => handleNavigation("/self-check")} className="hover:underline hover:underline-offset-4 text-white transition-all duration-300">
            Self-Check
          </Button>
          <Button variant="link" onClick={() => handleNavigation("/resources")} className="hover:underline hover:underline-offset-4 text-white transition-all duration-300">
            Resources
          </Button>
          {user && !otpRequired ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/avatar1.png"
                    alt="Avatar"
                    className="h-8 w-8 rounded-full border border-green-600"
                  />
                  <span className="ml-2 text-white font-semibold">
                    {patientData?.firstName} {patientData?.lastName}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>
                  <Button variant="link" onClick={() => handleNavigation("/dashboard")} className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Dashboard
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="link" onClick={() => handleNavigation("/settings")} className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Settings
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600 hover:underline hover:underline-offset-4 transition-all duration-300">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => handleNavigation("/login")}
              className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
            >
              Get Started
            </Button>
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
                <Button variant="link" onClick={() => handleNavigation("/")} className="hover:underline hover:underline-offset-4 text-green-900 transition-all duration-300">
                  Home
                </Button>

              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="link" onClick={() => handleNavigation("/therapists")} className="hover:underline hover:underline-offset-4 text-green-900 transition-all duration-300">
                  Therapists
                </Button>

              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="link" onClick={() => handleNavigation("/self-check")} className="hover:underline hover:underline-offset-4 text-green-900 transition-all duration-300">
                  Self-Check
                </Button>

              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="link" onClick={() => handleNavigation("/resources")} className="hover:underline hover:underline-offset-4 text-green-900 transition-all duration-300">
                  Resources
                </Button>
              </DropdownMenuItem>
              {user && !otpRequired ? (
                <>
                  <DropdownMenuItem>
                    <Button variant="link" onClick={() => handleNavigation("/dashboard")} className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                      Dashboard
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button variant="link" onClick={() => handleNavigation("/settings")} className="text-green-800 hover:underline hover:underline-offset-4 transition-all duration-300">
                      Settings
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 hover:underline hover:underline-offset-4 transition-all duration-300">
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Button
                    onClick={() => handleNavigation("/login")}
                    className="bg-white text-green-600 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    Get Started
                  </Button>
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
