"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  UserPlus,
  X,
  Save,
  Camera,
} from "lucide-react";
import { VictimRecord } from "@/lib/types";

interface VictimRecordsProps {
  victims: VictimRecord[];
  onAddVictim: (victim: VictimRecord) => void;
}

const statusConfig = {
  critical: {
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    label: "CRITICAL",
    dot: "bg-red-500",
  },
  serious: {
    icon: AlertCircle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    label: "SERIOUS",
    dot: "bg-orange-500",
  },
  stable: {
    icon: CheckCircle2,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    label: "STABLE",
    dot: "bg-green-500",
  },
  minor: {
    icon: AlertTriangle,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    label: "MINOR",
    dot: "bg-yellow-400",
  },
};

export default function VictimRecords({
  victims,
  onAddVictim,
}: VictimRecordsProps) {
  const [showForm, setShowForm] = useState(false);
  const [expandedVictim, setExpandedVictim] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    medicalStatus: "stable" as VictimRecord["medicalStatus"],
    condition: "",
    address: "",
    notes: "",
    rescuedBy: "",
  });

  const filtered =
    filterStatus === "all"
      ? victims
      : victims.filter((v) => v.medicalStatus === filterStatus);

  const handleSubmit = () => {
    if (!form.name || !form.condition) return;
    const newVictim: VictimRecord = {
      id: `v-${Date.now()}`,
      name: form.name,
      age: parseInt(form.age) || 0,
      gender: form.gender,
      medicalStatus: form.medicalStatus,
      condition: form.condition,
      location: { lat: 25.6093 + Math.random() * 0.005, lng: 85.1376 + Math.random() * 0.005 },
      address: form.address,
      notes: form.notes,
      rescuedBy: form.rescuedBy || "Field Officer",
      timestamp: new Date().toISOString(),
      synced: false,
    };
    onAddVictim(newVictim);
    setForm({
      name: "",
      age: "",
      gender: "Male",
      medicalStatus: "stable",
      condition: "",
      address: "",
      notes: "",
      rescuedBy: "",
    });
    setShowForm(false);
  };

  return (
    <div className="glass-card-elevated flex flex-col h-full">
      {/* ── Header ─── */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <Users className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Victim & Incident Records
            </h2>
            <p className="text-[10px] text-slate-500">
              {victims.length} records • {victims.filter((v) => !v.synced).length}{" "}
              pending sync
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-colors text-xs font-semibold cursor-pointer"
        >
          {showForm ? (
            <X className="w-3.5 h-3.5" />
          ) : (
            <UserPlus className="w-3.5 h-3.5" />
          )}
          {showForm ? "Cancel" : "Add Victim"}
        </button>
      </div>

      {/* ── Add Victim Form ─── */}
      {showForm && (
        <div className="px-4 py-3 border-b border-white/5 animate-fade-in-up bg-black/20">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-20 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30"
              />
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select
              value={form.medicalStatus}
              onChange={(e) =>
                setForm({
                  ...form,
                  medicalStatus: e.target.value as VictimRecord["medicalStatus"],
                })
              }
              className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              <option value="critical">Critical</option>
              <option value="serious">Serious</option>
              <option value="stable">Stable</option>
              <option value="minor">Minor</option>
            </select>
            <input
              type="text"
              placeholder="Medical Condition *"
              value={form.condition}
              onChange={(e) =>
                setForm({ ...form, condition: e.target.value })
              }
              className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30"
            />
            <input
              type="text"
              placeholder="Rescued By"
              value={form.rescuedBy}
              onChange={(e) =>
                setForm({ ...form, rescuedBy: e.target.value })
              }
              className="bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30"
            />
          </div>
          <textarea
            placeholder="Additional notes..."
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={2}
            className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-blue-500/30 mb-2 resize-none"
          />
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-400 hover:bg-white/[0.06] text-xs transition-colors cursor-pointer">
              <Camera className="w-3.5 h-3.5" />
              Photo
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-slate-400 hover:bg-white/[0.06] text-xs transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5" />
              GPS
            </button>
            <div className="flex-1" />
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.condition}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save Record
            </button>
          </div>
        </div>
      )}

      {/* ── Filter ─── */}
      <div className="px-4 py-2 flex gap-1.5">
        {["all", "critical", "serious", "stable", "minor"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`text-[10px] px-2 py-1 rounded-lg transition-all cursor-pointer ${
              filterStatus === s
                ? "bg-blue-500/15 text-blue-300 border border-blue-500/25"
                : "bg-white/[0.03] text-slate-500 border border-white/5 hover:bg-white/[0.06]"
            }`}
          >
            {s === "all" ? `All (${victims.length})` : s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Records List ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 max-h-[340px]">
        {filtered.map((victim) => {
          const cfg = statusConfig[victim.medicalStatus];
          const StatusIcon = cfg.icon;
          const isExpanded = expandedVictim === victim.id;

          return (
            <div
              key={victim.id}
              className={`rounded-xl border transition-all cursor-pointer ${
                isExpanded
                  ? `${cfg.bg} ${cfg.border}`
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
              }`}
              onClick={() =>
                setExpandedVictim(isExpanded ? null : victim.id)
              }
            >
              <div className="px-3.5 py-3 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0`}
                >
                  <StatusIcon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-white truncate">
                      {victim.name}
                    </h3>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.color} font-bold`}
                    >
                      {cfg.label}
                    </span>
                    {!victim.synced && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-bold">
                        PENDING
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {victim.condition}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-[10px] text-slate-500">
                    {victim.age}y / {victim.gender}
                  </div>
                  <div className="text-[10px] text-slate-600 flex items-center gap-1 justify-end">
                    <Clock className="w-2.5 h-2.5" />
                    {new Date(victim.timestamp).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3.5 pb-3 animate-fade-in-up space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{victim.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span className="font-mono text-[10px]">
                      {victim.location.lat.toFixed(4)}°N,{" "}
                      {victim.location.lng.toFixed(4)}°E
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Rescued by: </span>
                    {victim.rescuedBy}
                  </div>
                  {victim.notes && (
                    <div className="bg-black/20 rounded-lg p-2 text-[10px] text-slate-400">
                      📝 {victim.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
