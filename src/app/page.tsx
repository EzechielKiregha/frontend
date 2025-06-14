"use client";

import React from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FAQSection from "@/components/FAQSection";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Empower Your Mind"
        subtitle="Connect with therapists, track your well-being, and join our supportive community."
        imageSrc="/mental-health-awareness.jpg"
        ctaText="Get Started"
        ctaLink="/signup"
      />

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <Card>
          <h2 className="text-green-800 text-lg font-bold">Self-Check Quiz</h2>
          <p className="mt-2 text-gray-700">
            Take a quick quiz to assess your mental well-being.
          </p>
          <a href="/self-check"><Button className="mt-4 cursor-pointer">Start</Button></a>
        </Card>
        <Card>
          <h2 className="text-green-800 text-lg font-bold">Therapist Directory</h2>
          <p className="mt-2 text-gray-700">
            Find and connect with professional therapists.
          </p>
          <a href="/therapists"><Button className="mt-4 cursor-pointer">Find & Book a TALK</Button></a>
        </Card>
        <Card>
          <h2 className="text-green-800 text-lg font-bold">Chat & Support</h2>
          <p className="mt-2 text-gray-700">
            Join our community and get the support you need.
          </p>
          <Button className="mt-4 cursor-pointer">Learn More</Button>
        </Card>
      </div>

      {/* Screenshot Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="rounded-lg shadow-lg">
          <img
            src="/images/The-Crucial-Years-Supporting-Mental-Health-Care-for-Children.png"
            alt="App Screenshot"
            className="rounded-lg"
          />
        </Card>
      </div>

      {/* Testimonials Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <Card>
          <div className="flex items-center gap-4">
            <img
              src="/images/avatar1.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <p>"This platform has changed my life for the better!"</p>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <img
              src="/images/avatar1.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <p>"The self-check quiz is so helpful and easy to use."</p>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <img
              src="/images/avatar1.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <p>"The resources provided are incredibly helpful."</p>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <img
              src="/images/avatar1.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <p>"The therapists are very professional and supportive."</p>
          </div>
        </Card>
      </div>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
