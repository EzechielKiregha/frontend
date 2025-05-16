"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export function Component() {
  return (
    <div className="min-h-[200px] w-full">
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" />
        <Bar dataKey="desktop" fill="#2563eb" radius={4} />
        <Bar dataKey="mobile" fill="#60a5fa" radius={4} />
      </BarChart>
    </div>
  );
}
