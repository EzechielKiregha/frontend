import React from "react";
import { Card } from "./ui/card";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </Card>
  );
}
