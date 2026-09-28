"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Wifi,
  WifiOff,
  RefreshCw,
  Radio,
  Zap,
  ChevronDown,
} from "lucide-react";
import { ConnectivityStatus } from "@/lib/types";

interface HeaderProps {
  status: ConnectivityStatus;
  onStatusChange: (s: ConnectivityStatus) => void;
}

export default function Header({ status, onStatusChange }: HeaderProps) {
  const [time, setTime] = useState("");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const statusConfig = {
    offline: {
      icon: WifiOff,
      label: "OFFLINE",
      cls: "status-offline",
      dot: "bg-red-500",
    },
    syncing: {
      icon: RefreshCw,
      label: "SYNCING",
      cls: "status-syncing",
      dot: "bg-yellow-400",
    },
    online: {
      icon: Wifi,
      label: "CONNECTED",
      cls: "status-online",
      dot: "bg-green-500",
    },
  };

  const cfg = statusConfig[status];
  const StatusIcon = cfg.icon;

  return (
    <header className="glass-card-elevated sticky top-0 z-50 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* ── Left: Logo ──────────────────────── */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-orange-500 border-2 border-[#1A2332] animate-pulse-dot" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-white">ResQ</span>
                <span className="text-blue-400">Mind</span>
              </h1>
              <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                <Zap className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] font-bold text-orange-400 tracking-wider">
                  EDGE AI
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide">
              Offline AI Disaster Intelligence Platform
            </p>
          </div>
        </div>

        {/* ── Center: Stats ───────────────────── */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs">
            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-slate-400">Qdrant Edge</span>
            <span className="text-green-400 font-semibold">Active</span>
          </div>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
            <span className="text-slate-400">Local LLM</span>
            <span className="text-green-400 font-semibold">Running</span>
          </div>
          <div className="w-px h-4 bg-slate-700" />
          <div className="text-xs font-mono text-slate-400">{time} IST</div>
        </div>

        {/* ── Right: Status & Badge ───────────── */}
        <div className="flex items-center gap-4">
          {/* Connectivity Status Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className={`status-badge ${cfg.cls} cursor-pointer hover:brightness-125 transition-all flex items-center gap-1.5`}
            >
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full ${cfg.dot}`}
                />
                {status !== "online" && (
                  <div
                    className={`absolute inset-0 w-2 h-2 rounded-full ${cfg.dot} animate-pulse-ring`}
                  />
                )}
              </div>
              <StatusIcon
                className={`w-3.5 h-3.5 ${status === "syncing" ? "animate-spin" : ""}`}
              />
              <span>{cfg.label}</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {showStatusMenu && (
              <div className="absolute right-0 top-full mt-2 w-44 glass-card-elevated p-1.5 shadow-xl z-50">
                {(
                  ["offline", "syncing", "online"] as ConnectivityStatus[]
                ).map((s) => {
                  const sc = statusConfig[s];
                  const Icon = sc.icon;
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        onStatusChange(s);
                        setShowStatusMenu(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                        status === s
                          ? "bg-blue-500/10 text-blue-300"
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{sc.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Grey Coder Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
              <span className="text-[9px] font-black text-white">GC</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide">
              by Grey Coder
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
