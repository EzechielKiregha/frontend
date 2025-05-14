"use client";

import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  reverse?: boolean;
}

export default function Hero({ title, subtitle, imageSrc, reverse }: HeroProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? "md:flex-row-reverse" : ""
        }`}
    >
      <div>
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        <p className="mt-4 text-gray-700">{subtitle}</p>
        <button className="mt-6 bg-primary text-white px-6 py-2 rounded">
          Get Started
        </button>
      </div>
      <div>
        <img src={imageSrc} alt={title} className="rounded-xl shadow-lg" />
      </div>
    </div>
  );
}
