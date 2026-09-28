"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  FileText,
  MapPin,
  Stethoscope,
  Route,
  Shield,
  ClipboardList,
  Download,
  ExternalLink,
  Tag,
} from "lucide-react";
import { KnowledgeDocument } from "@/lib/types";

interface KnowledgeBaseProps {
  documents: KnowledgeDocument[];
}

const categoryConfig: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  sop: {
    icon: Shield,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  medical: {
    icon: Stethoscope,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  evacuation: {
    icon: Route,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
  map: {
    icon: MapPin,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  guideline: {
    icon: ClipboardList,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  protocol: {
    icon: FileText,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
};

export default function KnowledgeBase({ documents }: KnowledgeBaseProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const categories = [
    "all",
    "sop",
    "medical",
    "evacuation",
    "map",
    "guideline",
    "protocol",
  ];

  const filtered = documents.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="glass-card-elevated flex flex-col h-full">
      {/* ── Header ─── */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Local Knowledge Base
            </h2>
            <p className="text-[10px] text-slate-500">
              {documents.length} documents • Semantic retrieval ready
            </p>
          </div>
        </div>
      </div>

      {/* ── Search ─── */}
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-3 py-2 focus-within:border-cyan-500/30 transition-all">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search SOPs, guidelines, maps..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
        </div>
      </div>

      {/* ── Category Filter ─── */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[10px] px-2.5 py-1 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-500/15 text-blue-300 border border-blue-500/25"
                  : "bg-white/[0.03] text-slate-500 border border-white/5 hover:bg-white/[0.06] hover:text-slate-300"
              }`}
            >
              {cat === "all" ? "All" : cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Document List ─── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 max-h-[340px]">
        {filtered.map((doc) => {
          const cfg = categoryConfig[doc.category] || categoryConfig.sop;
          const Icon = cfg.icon;
          const isExpanded = expandedDoc === doc.id;

          return (
            <div
              key={doc.id}
              className={`rounded-xl border transition-all cursor-pointer ${
                isExpanded
                  ? `${cfg.bg} ${cfg.border}`
                  : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
              }`}
              onClick={() =>
                setExpandedDoc(isExpanded ? null : doc.id)
              }
            >
              <div className="px-3.5 py-3 flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center flex-shrink-0 mt-0.5`}
                >
                  <Icon className={`w-4 h-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-white leading-snug">
                    {doc.title}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {doc.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500">
                    <span>{doc.fileType}</span>
                    <span>•</span>
                    <span>{doc.fileSize}</span>
                    <span>•</span>
                    <span>{doc.lastModified}</span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {isExpanded && (
                <div className="px-3.5 pb-3 animate-fade-in-up">
                  <div className="bg-black/20 rounded-lg p-3 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap mb-2">
                    {doc.content}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="w-3 h-3 text-slate-500" />
                    {doc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
