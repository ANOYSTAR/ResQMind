"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import AIChat from "@/components/AIChat";
import KnowledgeBase from "@/components/KnowledgeBase";
import VictimRecords from "@/components/VictimRecords";
import SyncCenter from "@/components/SyncCenter";
import {
  shelters,
  blockedRoads,
  initialVictims,
  knowledgeDocuments,
  initialSyncRecords,
  dashboardStats,
  initialChatMessages,
} from "@/lib/data";
import {
  ConnectivityStatus,
  VictimRecord,
  SyncRecord,
  ChatMessage,
} from "@/lib/types";
import {
  Shield,
  Zap,
  Database,
  Radio,
  MapPin,
  Loader2,
} from "lucide-react";

// Dynamic import for the map (Leaflet requires client-side only)
const OfflineMap = dynamic(() => import("@/components/OfflineMap"), {
  ssr: false,
  loading: () => (
    <div className="glass-card-elevated h-[480px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        <span className="text-xs text-slate-400">Loading Offline Map...</span>
      </div>
    </div>
  ),
});

export default function Dashboard() {
  const [connectivity, setConnectivity] =
    useState<ConnectivityStatus>("offline");
  const [victims, setVictims] = useState(initialVictims);
  const [syncRecords, setSyncRecords] = useState(initialSyncRecords);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [stats, setStats] = useState(dashboardStats);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddVictim = (victim: VictimRecord) => {
    setVictims((prev) => [victim, ...prev]);
    setStats((prev) => ({
      ...prev,
      totalVictims: prev.totalVictims + 1,
      pendingSync: prev.pendingSync + 1,
    }));
    // Add sync record
    setSyncRecords((prev) => [
      {
        id: `sync-${Date.now()}`,
        type: "victim",
        title: `Victim Record — ${victim.name}`,
        status: "pending",
        timestamp: victim.timestamp,
        size: `${Math.floor(10 + Math.random() * 20)} KB`,
      },
      ...prev,
    ]);
  };

  const handleSyncUpdate = (records: SyncRecord[]) => {
    setSyncRecords(records);
    const pendingCount = records.filter((r) => r.status === "pending").length;
    setStats((prev) => ({ ...prev, pendingSync: pendingCount }));
  };

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-pulse-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-[#0B1120] animate-pulse-dot" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              <span className="text-white">ResQ</span>
              <span className="text-blue-400">Mind</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Initializing Edge AI Systems...
            </p>
          </div>
          <div className="flex gap-3 mt-2">
            {["Qdrant Edge", "Local LLM", "GPS Module", "Sync Engine"].map(
              (module, i) => (
                <div
                  key={module}
                  className="flex items-center gap-1.5 text-[10px] animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                  <span className="text-slate-400">{module}</span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120] grid-bg">
      {/* ── Header ─── */}
      <Header status={connectivity} onStatusChange={setConnectivity} />

      {/* ── Main Content ─── */}
      <main className="px-4 lg:px-6 py-4 space-y-4 max-w-[1920px] mx-auto">
        {/* ── Stats Bar ─── */}
        <StatsBar stats={stats} />

        {/* ── Row 1: Map + AI Chat ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <OfflineMap shelters={shelters} blockedRoads={blockedRoads} />
          </div>
          <div className="lg:col-span-2">
            <AIChat
              messages={chatMessages}
              onSendMessage={setChatMessages}
            />
          </div>
        </div>

        {/* ── Row 2: Knowledge Base + Victims + Sync ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div>
            <KnowledgeBase documents={knowledgeDocuments} />
          </div>
          <div>
            <VictimRecords
              victims={victims}
              onAddVictim={handleAddVictim}
            />
          </div>
          <div>
            <SyncCenter
              records={syncRecords}
              connectivity={connectivity}
              onSync={handleSyncUpdate}
            />
          </div>
        </div>

        {/* ── Footer ─── */}
        <footer className="glass-card px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-slate-300">
                ResQMind v1.0
              </span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-[10px] text-slate-500">
              Offline AI Disaster Intelligence Platform
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Database className="w-3 h-3" />
              Qdrant Edge v1.12
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              FastAPI Backend
            </span>
            <span className="flex items-center gap-1">
              <Radio className="w-3 h-3" />
              GPS Active
            </span>
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center">
                <span className="text-[7px] font-black text-white">GC</span>
              </div>
              <span className="text-[10px] text-slate-400">
                Made with ❤ by Grey Coder
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
