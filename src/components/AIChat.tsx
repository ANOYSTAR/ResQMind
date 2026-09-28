"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Search,
  Database,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { ChatMessage } from "@/lib/types";
import { aiResponses } from "@/lib/data";

interface AIChatProps {
  messages: ChatMessage[];
  onSendMessage: (msgs: ChatMessage[]) => void;
}

export default function AIChat({ messages, onSendMessage }: AIChatProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const suggestedQueries = [
    "Which shelter near me has more than 50 available beds?",
    "Snake bite first aid protocol",
    "Evacuation route from Ward 3",
    "Current SOP progress status",
  ];

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (
      q.includes("shelter") ||
      q.includes("bed") ||
      q.includes("available")
    )
      return aiResponses.shelter;
    if (
      q.includes("medical") ||
      q.includes("snake") ||
      q.includes("first aid") ||
      q.includes("protocol")
    )
      return aiResponses.medical;
    if (
      q.includes("evacuation") ||
      q.includes("route") ||
      q.includes("ward")
    )
      return aiResponses.evacuation;
    if (q.includes("sop") || q.includes("progress") || q.includes("status"))
      return aiResponses.sop;
    return aiResponses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const updated = [...messages, userMsg];
    onSendMessage(updated);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing
    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const aiMsg: ChatMessage = {
      id: `msg-${Date.now()}-ai`,
      role: "ai",
      content: getAIResponse(userMsg.content),
      timestamp: new Date().toISOString(),
      sources: ["Qdrant Edge — Local Vector DB"],
    };

    onSendMessage([...updated, aiMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Bold
      let formatted = line.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="text-white">$1</strong>'
      );
      return (
        <span
          key={i}
          dangerouslySetInnerHTML={{ __html: formatted }}
          className="block"
        />
      );
    });
  };

  return (
    <div className="glass-card-elevated flex flex-col h-full">
      {/* ── Header ─── */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              AI Rescue Assistant
            </h2>
            <p className="text-[10px] text-slate-500">
              Powered by Qdrant Edge • Semantic Search
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
          <span className="text-[10px] text-green-400 font-semibold">
            LOCAL AI
          </span>
        </div>
      </div>

      {/* ── Messages ─── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[420px]"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
          >
            <div
              className={`max-w-[90%] px-4 py-3 ${
                msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
              }`}
            >
              {msg.role === "ai" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] text-blue-400 font-semibold">
                    ResQMind AI
                  </span>
                </div>
              )}
              <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {formatContent(msg.content)}
              </div>
              {msg.sources && (
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5">
                  <Database className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] text-slate-500">
                    {msg.sources.join(" • ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="chat-bubble-ai px-4 py-3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] text-blue-400 font-semibold">
                  ResQMind AI
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span className="text-xs text-slate-400">
                  Searching Qdrant Edge vectors...
                </span>
                <div className="typing-indicator flex gap-1 ml-1">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Suggested Queries ─── */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-[10px] text-slate-500 mb-2 flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            Suggested queries:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQueries.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-[11px] px-2.5 py-1.5 rounded-lg bg-blue-500/8 border border-blue-500/15 text-blue-300 hover:bg-blue-500/15 hover:border-blue-500/25 transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input ─── */}
      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 focus-within:border-blue-500/30 focus-within:bg-white/[0.05] transition-all">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about shelters, medical protocols, routes..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-8 h-8 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
