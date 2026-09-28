"use client";

import React, { useState, useEffect } from "react";
import {
  Cloud,
  CloudOff,
  RefreshCw,
  Check,
  AlertCircle,
  ArrowRight,
  Database,
  Server,
  Zap,
  HardDrive,
  Upload,
  ChevronRight,
} from "lucide-react";
import { SyncRecord, ConnectivityStatus } from "@/lib/types";

interface SyncCenterProps {
  records: SyncRecord[];
  connectivity: ConnectivityStatus;
  onSync: (records: SyncRecord[]) => void;
}

const statusIcons = {
  pending: { icon: CloudOff, color: "text-yellow-400", bg: "bg-yellow-500/10" },
  syncing: {
    icon: RefreshCw,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  synced: { icon: Check, color: "text-green-400", bg: "bg-green-500/10" },
  failed: { icon: AlertCircle, color: "text-red-400", bg: "bg-red-500/10" },
};

const typeColors = {
  victim: "text-red-400",
  incident: "text-orange-400",
  document: "text-cyan-400",
  "shelter-update": "text-blue-400",
};

export default function SyncCenter({
  records,
  connectivity,
  onSync,
}: SyncCenterProps) {
  const [isSyncing, setIsSyncing] = useState(false);

  const pending = records.filter((r) => r.status === "pending");
  const synced = records.filter((r) => r.status === "synced");
  const syncing = records.filter((r) => r.status === "syncing");

  const totalSize = records.reduce((acc, r) => {
    const num = parseFloat(r.size);
    const unit = r.size.includes("MB") ? 1024 : 1;
    return acc + num * unit;
  }, 0);

  // Auto-sync simulation when online
  useEffect(() => {
    if (connectivity === "syncing" && pending.length > 0 && !isSyncing) {
      setIsSyncing(true);
      const syncNext = (index: number) => {
        if (index >= records.length) {
          setIsSyncing(false);
          return;
        }
        const record = records[index];
        if (record.status !== "pending") {
          syncNext(index + 1);
          return;
        }
        // Set to syncing
        const updatedRecords = records.map((r) =>
          r.id === record.id ? { ...r, status: "syncing" as const } : r
        );
        onSync(updatedRecords);

        // After delay, set to synced
        setTimeout(() => {
          const syncedRecords = updatedRecords.map((r) =>
            r.id === record.id ? { ...r, status: "synced" as const } : r
          );
          onSync(syncedRecords);
          syncNext(index + 1);
        }, 1200 + Math.random() * 800);
      };
      syncNext(0);
    }
  }, [connectivity]);

  return (
    <div className="glass-card-elevated flex flex-col">
      {/* ── Header ─── */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Cloud className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Synchronization Center
            </h2>
            <p className="text-[10px] text-slate-500">
              Edge → Cloud • Qdrant Sync Engine
            </p>
          </div>
        </div>
      </div>

      {/* ── Sync Flow Visualization ─── */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Edge Device */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                connectivity === "offline"
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "bg-blue-500/15 border border-blue-500/30 glow-blue"
              } transition-all`}
            >
              <HardDrive className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-center">
              <div className="text-[11px] font-semibold text-white">
                Edge Device
              </div>
              <div className="text-[9px] text-slate-500">Qdrant Edge</div>
            </div>
          </div>

          {/* Flow Arrow */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-full h-[2px] bg-slate-700 relative overflow-hidden rounded">
              {(connectivity === "syncing" || connectivity === "online") && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 animate-data-flow" />
              )}
            </div>
            <div className="absolute flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  connectivity === "syncing"
                    ? "bg-purple-500/20 border border-purple-500/30"
                    : connectivity === "online"
                    ? "bg-green-500/20 border border-green-500/30"
                    : "bg-slate-800 border border-slate-700"
                } transition-all`}
              >
                {connectivity === "syncing" ? (
                  <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
                ) : connectivity === "online" ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <CloudOff className="w-4 h-4 text-slate-500" />
                )}
              </div>
            </div>
          </div>

          {/* Cloud Server */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                connectivity === "online"
                  ? "bg-green-500/15 border border-green-500/30 glow-green"
                  : connectivity === "syncing"
                  ? "bg-purple-500/10 border border-purple-500/20"
                  : "bg-slate-800 border border-slate-700"
              } transition-all`}
            >
              <Server
                className={`w-6 h-6 ${
                  connectivity === "online"
                    ? "text-green-400"
                    : connectivity === "syncing"
                    ? "text-purple-400"
                    : "text-slate-500"
                }`}
              />
            </div>
            <div className="text-center">
              <div className="text-[11px] font-semibold text-white">
                Cloud Server
              </div>
              <div className="text-[9px] text-slate-500">Central DMS</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ─── */}
      <div className="px-5 pb-3 grid grid-cols-3 gap-2">
        <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl px-3 py-2 text-center">
          <div className="text-lg font-bold text-yellow-400 stat-number">
            {pending.length}
          </div>
          <div className="text-[9px] text-slate-500">Pending</div>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl px-3 py-2 text-center">
          <div className="text-lg font-bold text-blue-400 stat-number">
            {syncing.length}
          </div>
          <div className="text-[9px] text-slate-500">Syncing</div>
        </div>
        <div className="bg-green-500/5 border border-green-500/10 rounded-xl px-3 py-2 text-center">
          <div className="text-lg font-bold text-green-400 stat-number">
            {synced.length}
          </div>
          <div className="text-[9px] text-slate-500">Synced</div>
        </div>
      </div>

      {/* ── Records ─── */}
      <div className="px-5 pb-4 space-y-1.5 max-h-[220px] overflow-y-auto">
        {records.map((record) => {
          const cfg = statusIcons[record.status];
          const StatusIcon = cfg.icon;
          return (
            <div
              key={record.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all"
            >
              <div
                className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}
              >
                <StatusIcon
                  className={`w-3.5 h-3.5 ${cfg.color} ${
                    record.status === "syncing" ? "animate-spin" : ""
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-white truncate">
                  {record.title}
                </div>
                <div className="text-[9px] text-slate-500 flex items-center gap-2">
                  <span
                    className={
                      typeColors[record.type as keyof typeof typeColors] ||
                      "text-slate-400"
                    }
                  >
                    {record.type}
                  </span>
                  <span>•</span>
                  <span>{record.size}</span>
                </div>
              </div>
              <span
                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color}`}
              >
                {record.status.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Storage Info ─── */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1.5">
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            Local Qdrant Edge Storage
          </span>
          <span>{(totalSize / 1024).toFixed(1)} MB used</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min((totalSize / 1024 / 100) * 100, 35)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
