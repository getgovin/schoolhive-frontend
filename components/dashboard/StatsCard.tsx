"use client";

import { Card } from "antd";
import { ReactNode } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color,
}: StatsCardProps) {
  return (
    <Card
      variant="borderless"
      className=" small-card group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      
    >
      <div className="relative flex items-center justify-between p-6">
        {/* Left Content */}
        <div>
          <p className="text-[16px] font-bold">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold ">
            {value}
          </h2>

         
        </div>

        {/* Icon */}
        <div
          className={`h-16 w-16 rounded-2xl ${color}
          flex items-center justify-center
          text-white text-3xl
          shadow-lg
          transition-transform duration-300
          group-hover:scale-110
          group-hover:rotate-6`}
        >
          {icon}
        </div>

        {/* Decorative Circle */}
        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${color} opacity-10`}
        />
      </div>
    </Card>
  );
}