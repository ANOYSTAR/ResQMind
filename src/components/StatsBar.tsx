"use client";

import React from "react";
import {
  Users,
  Activity,
  Home,
  CloudOff,
  FileText,
  BedDouble,
  AlertTriangle,
} from "lucide-react";
import { DashboardStats } from "@/lib/types";

interface StatsBarProps {
  stats: DashboardStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const items = [
    {
      icon: Users,
      label: "Victims Recorded",
      value: stats.totalVictims,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      glow: "shadow-red-500/10",
    },
    {
      icon: Activity,
      label: "Active Rescues",
      value: stats.activeRescues,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      glow: "shadow-orange-500/10",
    },
    {
      icon: Home,
      label: "Shelters Active",
      value: stats.sheltersActive,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "shadow-blue-500/10",
    },
    {
      icon: BedDouble,
      label: "Available Beds",
      value: stats.availableBeds,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      glow: "shadow-green-500/10",
    },
    {
      icon: AlertTriangle,
      label: "Roads Blocked",
      value: stats.blockedRoads,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      glow: "shadow-yellow-500/10",
    },
    {
      icon: FileText,
      label: "Docs Stored",
      value: stats.documentsStored,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      glow: "shadow-cyan-500/10",
    },
    {
      icon: CloudOff,
      label: "Pending Sync",
      value: stats.pendingSync,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      glow: "shadow-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={`glass-card px-4 py-3 flex items-center gap-3 hover:scale-[1.02] transition-transform cursor-default shadow-lg ${item.glow}`}
          >
            <div
              className={`w-9 h-9 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="min-w-0">
              <div className={`text-lg font-bold stat-number ${item.color}`}>
                {item.value.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 leading-tight truncate">
                {item.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
