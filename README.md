# 🛡️ ResQMind — Offline AI Disaster Intelligence Platform

> **Made by Grey Coder** | Powered by Qdrant Edge + Local LLM

ResQMind is a futuristic AI-powered Edge Disaster Intelligence Platform designed for **NDRF, SDRF, hospitals, NGOs, and district administration**. It operates fully offline with intelligent edge-to-cloud synchronization.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✨ Core Features

| Feature | Description |
|---------|------------|
| 🌐 **Offline-First Architecture** | Powered by Qdrant Edge — works without internet |
| 🤖 **AI Semantic Search** | Natural language queries answered instantly from local vector DB |
| 🗺️ **Interactive Offline Map** | GPS tracking, shelter/hospital markers, route highlighting |
| 📋 **Victim & Incident Records** | Create, save, and manage rescue records offline |
| 📚 **Local Knowledge Base** | SOPs, medical guidelines, evacuation plans with semantic search |
| 🔄 **Smart Sync** | Auto-synchronize data when connectivity returns |

---

## 📊 Dashboard Sections

### 1. Header
- ResQMind branding with EDGE AI badge
- Real-time IST clock
- Qdrant Edge & Local LLM status
- Connectivity toggle (Offline / Syncing / Connected)
- "Made by Grey Coder" badge

### 2. Stats Bar
Seven glowing metric cards: Victims, Active Rescues, Shelters, Available Beds, Blocked Roads, Documents, Pending Sync

### 3. Interactive Offline Map
- Leaflet-based dark map centered on Danapur, Bihar flood zone
- Markers: Shelters (blue), Hospitals (red), Relief Camps (green), Blocked Roads (yellow)
- Officer GPS with animated ripple effect
- Route highlighting to nearest shelter

### 4. AI Rescue Assistant
- Chat interface with semantic search via Qdrant Edge
- Suggested queries for shelter lookup, medical protocols, evacuation routes
- Rich formatted AI responses with source attribution

### 5. Local Knowledge Base
- 6 pre-loaded documents (SOPs, medical guidelines, maps, protocols)
- Search with semantic retrieval
- Category filtering and expandable content previews

### 6. Victim & Incident Records
- Add victim form with medical status, GPS, photos, notes
- Status filtering (Critical / Serious / Stable / Minor)
- Sync status tracking

### 7. Synchronization Center
- Visual Edge → Cloud data flow animation
- Auto-sync when connectivity is set to "Syncing"
- Record-level status tracking
- Local Qdrant Edge storage meter

---


## 🎥 Project Demo

[▶️ Watch ResQMind Demo](./demos/videos/viewer.html)

## 🎥 Demo Videos & Screenshots
### Screenshots (Pre-generated)
| File | Description |
|------|------------|
| `00_resqmind_logo.jpg` | ResQMind shield logo |
| `01_dashboard_overview.jpg` | Full dashboard layout |
| `02_ai_rescue_assistant.jpg` | AI chat with query response |
| `03_interactive_offline_map.jpg` | Map with markers and routes |
| `04_sync_center.jpg` | Edge-to-Cloud sync flow |
| `05_victim_records.jpg` | Victim records with status |
| `06_knowledge_base.jpg` | Document library |
| `07_workflow_diagram.jpg` | Field rescue workflow |

### Record Your Own Videos
```bash
# Make sure dev server is running first:
npm run dev

# Capture screenshots of all features:
node demos/capture-demos.mjs

# Record full WebM demo videos:
node demos/record-videos.mjs
```

**Video demos recorded** (in `demos/videos/`):
1. `01_dashboard_walkthrough.webm` — Full page scroll tour
2. `02_ai_chat_demo.webm` — AI query & response interaction
3. `03_offline_map_demo.webm` — Map marker exploration
4. `04_victim_record_demo.webm` — Adding a new victim record
5. `05_sync_flow_demo.webm` — Offline → Syncing → Connected transition
6. `06_knowledge_base_demo.webm` — Search & explore documents

---

## 🔧 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Next.js 16 + TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Maps | Leaflet + React Leaflet |
| Vector DB | Qdrant Edge (planned) |
| AI | Local LLM (planned) |
| Backend | FastAPI (planned) |
| Sync | Edge-to-Cloud intelligent sync |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          — Design system + animations
│   ├── layout.tsx           — Root layout with SEO metadata
│   └── page.tsx             — Main dashboard (state management)
├── components/
│   ├── Header.tsx           — Logo, status, clock, badges
│   ├── StatsBar.tsx         — 7-card metric grid
│   ├── OfflineMap.tsx       — Leaflet map with markers & routes
│   ├── AIChat.tsx           — AI assistant chat interface
│   ├── KnowledgeBase.tsx    — Document library with search
│   ├── VictimRecords.tsx    — Victim CRUD with filtering
│   └── SyncCenter.tsx       — Edge→Cloud sync visualization
└── lib/
    ├── types.ts             — TypeScript type definitions
    └── data.ts              — Mock disaster response data

demos/
├── *.jpg                    — Generated demo images
├── capture-demos.mjs        — Screenshot capture script
├── record-videos.mjs        — Video recording script
└── videos/                  — Recorded demo videos
```

---

## 🎨 Design

- **Theme**: Military-grade Emergency Operations Center UI
- **Style**: Glassmorphism cards, glowing markers, gradient animations
- **Palette**: Deep navy (#0B1120), vivid blue (#0A84FF), emergency orange (#FF6B2C)
- **Animations**: Pulse glow, ripple, data flow, typing indicators, sync pulse

---

## 📝 Example Workflow

A rescue officer is deployed in a flood-hit village with **no internet**. They ask:

> *"Which shelter near me has more than 50 available beds?"*

ResQMind performs **semantic search** on the local Qdrant Edge database, identifies the nearest suitable shelter (**Gandhi Memorial Relief Camp — 73 beds, 0.8 km**), displays the **offline map route**, and stores the officer's field report locally. Once connectivity is restored, all reports **automatically synchronize** with the central disaster management server.

---

## 📜 License

Made with ❤️ by **Grey Coder**


