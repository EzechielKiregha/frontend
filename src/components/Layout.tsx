"use client";

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content area */}
      <main className="container mx-auto pb-8">{children}</main>
      <Footer />
    </div>
  );
}
