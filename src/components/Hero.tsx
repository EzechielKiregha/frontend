"use client";

import Link from "next/link";
import React from "react";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  reverse?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export default function Hero({ title, subtitle, imageSrc, reverse, ctaText, ctaLink }: HeroProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold text-green-800">{title}</h1>
        <p className="mt-4 text-gray-800">{subtitle}</p>
        <Link href={ctaLink ? ctaLink : '#'} className=" bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          {ctaText}
        </Link>
      </div>
      <div>
        <img src={imageSrc} alt={title} className="rounded-xl shadow-lg" />
      </div>
    </div>
  );
}
