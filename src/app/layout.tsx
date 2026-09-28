import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResQMind — Offline AI Disaster Intelligence Platform",
  description:
    "AI-powered Edge Disaster Intelligence Platform for NDRF, SDRF, Hospitals, NGOs, and District Administration. Offline-first architecture with semantic search, GPS mapping, and intelligent sync.",
  keywords: [
    "disaster management",
    "NDRF",
    "SDRF",
    "emergency response",
    "AI",
    "offline",
    "rescue",
    "ResQMind",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          crossOrigin=""
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B1120]">{children}</body>
    </html>
  );
}
