import {
  Shelter,
  BlockedRoad,
  VictimRecord,
  KnowledgeDocument,
  SyncRecord,
  DashboardStats,
  ChatMessage,
} from "./types";

// ── Officer's GPS Location (Flood-hit village near Patna, Bihar) ──
export const officerLocation = { lat: 25.6093, lng: 85.1376 };

// ── Shelters, Hospitals & Relief Camps ──
export const shelters: Shelter[] = [
  {
    id: "sh-001",
    name: "Gandhi Memorial Relief Camp",
    location: { lat: 25.6145, lng: 85.1420 },
    totalBeds: 200,
    availableBeds: 73,
    contact: "+91 98765 43210",
    type: "shelter",
    supplies: ["Food", "Water", "Blankets", "First Aid"],
    lastUpdated: "2026-09-26T18:30:00",
  },
  {
    id: "sh-002",
    name: "Riverside Community Shelter",
    location: { lat: 25.6050, lng: 85.1300 },
    totalBeds: 150,
    availableBeds: 12,
    contact: "+91 98765 43211",
    type: "shelter",
    supplies: ["Food", "Water", "Medicine"],
    lastUpdated: "2026-09-26T17:45:00",
  },
  {
    id: "sh-003",
    name: "District Hospital — Ward 7",
    location: { lat: 25.6200, lng: 85.1450 },
    totalBeds: 100,
    availableBeds: 28,
    contact: "+91 98765 43212",
    type: "hospital",
    supplies: ["Medical Equipment", "Oxygen", "Medicine", "Blood Bank"],
    lastUpdated: "2026-09-26T19:00:00",
  },
  {
    id: "sh-004",
    name: "NDRF Base Camp Alpha",
    location: { lat: 25.6020, lng: 85.1500 },
    totalBeds: 80,
    availableBeds: 55,
    contact: "+91 98765 43213",
    type: "relief-camp",
    supplies: ["Food", "Water", "Tents", "Rescue Gear", "Generator"],
    lastUpdated: "2026-09-26T18:15:00",
  },
  {
    id: "sh-005",
    name: "Sri Aurobindo School Shelter",
    location: { lat: 25.6130, lng: 85.1250 },
    totalBeds: 120,
    availableBeds: 67,
    contact: "+91 98765 43214",
    type: "shelter",
    supplies: ["Food", "Water", "Blankets"],
    lastUpdated: "2026-09-26T16:30:00",
  },
  {
    id: "sh-006",
    name: "PHC — Primary Health Centre",
    location: { lat: 25.6180, lng: 85.1330 },
    totalBeds: 40,
    availableBeds: 8,
    contact: "+91 98765 43215",
    type: "hospital",
    supplies: ["First Aid", "Medicine", "ORS", "Vaccines"],
    lastUpdated: "2026-09-26T19:30:00",
  },
];

// ── Blocked Roads ──
export const blockedRoads: BlockedRoad[] = [
  {
    id: "br-001",
    location: { lat: 25.6110, lng: 85.1350 },
    reason: "Waterlogging — 4ft depth",
    severity: "high",
    reportedAt: "2026-09-26T14:00:00",
  },
  {
    id: "br-002",
    location: { lat: 25.6070, lng: 85.1400 },
    reason: "Bridge damaged — structural collapse",
    severity: "high",
    reportedAt: "2026-09-26T12:30:00",
  },
  {
    id: "br-003",
    location: { lat: 25.6160, lng: 85.1480 },
    reason: "Debris obstruction — tree fall",
    severity: "medium",
    reportedAt: "2026-09-26T16:45:00",
  },
];

// ── Victim Records ──
export const initialVictims: VictimRecord[] = [
  {
    id: "v-001",
    name: "Ramesh Kumar",
    age: 45,
    gender: "Male",
    medicalStatus: "serious",
    condition: "Fractured leg, dehydration",
    location: { lat: 25.6085, lng: 85.1370 },
    address: "Ward 3, Danapur Village",
    notes: "Found on rooftop. Needs immediate evacuation.",
    rescuedBy: "NDRF Team Alpha",
    timestamp: "2026-09-26T15:30:00",
    synced: false,
  },
  {
    id: "v-002",
    name: "Sunita Devi",
    age: 32,
    gender: "Female",
    medicalStatus: "critical",
    condition: "Chest injury, difficulty breathing",
    location: { lat: 25.6100, lng: 85.1390 },
    address: "Ward 5, Danapur Village",
    notes: "Requires oxygen support. Airlifting recommended.",
    rescuedBy: "SDRF Team Bravo",
    timestamp: "2026-09-26T16:00:00",
    synced: false,
  },
  {
    id: "v-003",
    name: "Mohan Lal",
    age: 68,
    gender: "Male",
    medicalStatus: "stable",
    condition: "Minor cuts, exposure",
    location: { lat: 25.6095, lng: 85.1360 },
    address: "Ward 2, Danapur Village",
    notes: "Diabetic patient. Monitor blood sugar levels.",
    rescuedBy: "NDRF Team Alpha",
    timestamp: "2026-09-26T14:45:00",
    synced: true,
  },
  {
    id: "v-004",
    name: "Priya Sharma",
    age: 7,
    gender: "Female",
    medicalStatus: "minor",
    condition: "Fever, mild hypothermia",
    location: { lat: 25.6088, lng: 85.1380 },
    address: "Ward 4, Danapur Village",
    notes: "Separated from family. Parents being located.",
    rescuedBy: "NGO - SaveLife Foundation",
    timestamp: "2026-09-26T17:15:00",
    synced: false,
  },
  {
    id: "v-005",
    name: "Bhola Prasad",
    age: 55,
    gender: "Male",
    medicalStatus: "serious",
    condition: "Snake bite on right ankle",
    location: { lat: 25.6075, lng: 85.1345 },
    address: "Ward 1, Danapur Village",
    notes: "Anti-venom administered. Needs hospital transfer.",
    rescuedBy: "District Medical Team",
    timestamp: "2026-09-26T18:00:00",
    synced: false,
  },
];

// ── Knowledge Base Documents ──
export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: "doc-001",
    title: "Flood Emergency SOP — Bihar State Protocol",
    category: "sop",
    description: "Standard Operating Procedure for flood emergencies including evacuation, relief distribution, and shelter management.",
    content: "1. Activate District EOC within 2 hours of flood alert\n2. Deploy NDRF/SDRF teams to affected wards\n3. Begin door-to-door evacuation of low-lying areas\n4. Set up relief camps at pre-designated locations\n5. Establish communication chain with all field teams\n6. Begin medical screening at all shelter points\n7. Distribute emergency kits (food, water, blankets)\n8. Document all rescued individuals with GPS coordinates\n9. Maintain hourly situation reports\n10. Coordinate with Army/Air Force for aerial rescue if water level exceeds 8ft",
    fileType: "PDF",
    fileSize: "2.4 MB",
    lastModified: "2026-08-15",
    tags: ["flood", "SOP", "evacuation", "Bihar"],
  },
  {
    id: "doc-002",
    title: "Medical First Response Guidelines",
    category: "medical",
    description: "Field medical guidelines for trauma, drowning, hypothermia, snake bites, and waterborne diseases during flood emergencies.",
    content: "Emergency medical protocols for disaster scenarios:\n- CPR procedures for drowning victims\n- Hypothermia treatment: Remove wet clothing, warm blankets, warm fluids\n- Snake bite: Immobilize limb, mark bite time, anti-venom within 2 hours\n- Wound care in contaminated water: Betadine wash, antibiotics\n- Waterborne disease prevention: ORS, chlorine tablets\n- Triage classification: RED (immediate), YELLOW (delayed), GREEN (minor), BLACK (deceased)",
    fileType: "PDF",
    fileSize: "1.8 MB",
    lastModified: "2026-07-20",
    tags: ["medical", "first-aid", "trauma", "triage"],
  },
  {
    id: "doc-003",
    title: "Danapur District Evacuation Plan",
    category: "evacuation",
    description: "Ward-wise evacuation routes, assembly points, and transport arrangements for Danapur district.",
    content: "Evacuation Route A: Ward 1-3 → NH-30 → Gandhi Memorial Camp (2.1 km)\nEvacuation Route B: Ward 4-5 → State Highway → Aurobindo School (1.8 km)\nEvacuation Route C: Ward 6-8 → River Road (if passable) → NDRF Base Camp (3.2 km)\nEmergency Route D: Helicopter landing zone at Danapur Ground\nAssembly Points: 1) Danapur Chowk, 2) School Ground, 3) Temple Courtyard\nTransport: 4 boats, 2 trucks, 1 ambulance pre-positioned",
    fileType: "PDF",
    fileSize: "3.1 MB",
    lastModified: "2026-09-01",
    tags: ["evacuation", "routes", "Danapur", "transport"],
  },
  {
    id: "doc-004",
    title: "Flood Zone Hazard Map — September 2026",
    category: "map",
    description: "Updated flood-risk zonation map with inundation levels, drainage patterns, and critical infrastructure markers.",
    content: "High Risk Zones: Wards 1, 2, 5 (water level >6ft)\nMedium Risk Zones: Wards 3, 4 (water level 3-6ft)\nLow Risk Zones: Wards 6, 7, 8 (water level <3ft)\nCritical Infrastructure: Power substation (Ward 2 - flooded), Water treatment plant (Ward 6 - operational), Communication tower (Ward 4 - damaged)",
    fileType: "GeoTIFF",
    fileSize: "8.7 MB",
    lastModified: "2026-09-25",
    tags: ["map", "flood-zone", "hazard", "inundation"],
  },
  {
    id: "doc-005",
    title: "Relief Camp Management Protocol",
    category: "protocol",
    description: "Guidelines for shelter management, food distribution, sanitation, and crowd control in relief camps.",
    content: "Camp Setup: 50 sq ft per person minimum\nFood Distribution: 3 meals/day, priority to elderly and children\nWater: 20 liters/person/day minimum\nSanitation: 1 toilet per 20 people, hand-wash stations\nMedical: Doctor visit every 6 hours, medicine log\nSecurity: Entry/exit register, night patrol\nCommunication: Daily status board, missing persons register",
    fileType: "PDF",
    fileSize: "1.2 MB",
    lastModified: "2026-08-10",
    tags: ["shelter", "management", "food", "sanitation"],
  },
  {
    id: "doc-006",
    title: "NDRF Rescue Equipment Checklist",
    category: "guideline",
    description: "Complete inventory checklist for NDRF rescue operations including boats, medical kits, communication equipment.",
    content: "Per Team (10 members):\n- 2x Inflatable boats with outboard motors\n- 10x Life jackets + 20x spare\n- 5x Rope rescue kits (50m each)\n- 2x Medical trauma kits\n- 1x Satellite phone\n- 10x VHF radio sets\n- 1x Portable generator (2kVA)\n- 2x Searchlights\n- 50x Emergency blankets\n- Water purification tablets (500 count)",
    fileType: "PDF",
    fileSize: "0.8 MB",
    lastModified: "2026-06-15",
    tags: ["equipment", "NDRF", "rescue", "checklist"],
  },
];

// ── Sync Records ──
export const initialSyncRecords: SyncRecord[] = [
  {
    id: "sync-001",
    type: "victim",
    title: "Victim Record — Ramesh Kumar",
    status: "pending",
    timestamp: "2026-09-26T15:30:00",
    size: "12 KB",
  },
  {
    id: "sync-002",
    type: "victim",
    title: "Victim Record — Sunita Devi",
    status: "pending",
    timestamp: "2026-09-26T16:00:00",
    size: "15 KB",
  },
  {
    id: "sync-003",
    type: "incident",
    title: "Incident — Bridge Collapse Report",
    status: "pending",
    timestamp: "2026-09-26T12:30:00",
    size: "48 KB",
  },
  {
    id: "sync-004",
    type: "victim",
    title: "Victim Record — Mohan Lal",
    status: "synced",
    timestamp: "2026-09-26T14:45:00",
    size: "10 KB",
  },
  {
    id: "sync-005",
    type: "shelter-update",
    title: "Shelter Update — Gandhi Memorial",
    status: "pending",
    timestamp: "2026-09-26T18:30:00",
    size: "4 KB",
  },
  {
    id: "sync-006",
    type: "victim",
    title: "Victim Record — Priya Sharma",
    status: "pending",
    timestamp: "2026-09-26T17:15:00",
    size: "22 KB",
  },
  {
    id: "sync-007",
    type: "victim",
    title: "Victim Record — Bhola Prasad",
    status: "pending",
    timestamp: "2026-09-26T18:00:00",
    size: "14 KB",
  },
  {
    id: "sync-008",
    type: "document",
    title: "Flood Zone Map Update",
    status: "synced",
    timestamp: "2026-09-26T10:00:00",
    size: "8.7 MB",
  },
];

// ── Dashboard Stats ──
export const dashboardStats: DashboardStats = {
  totalVictims: 247,
  activeRescues: 18,
  sheltersActive: 6,
  pendingSync: 5,
  documentsStored: 42,
  totalBeds: 690,
  availableBeds: 243,
  blockedRoads: 3,
};

// ── Chat Messages (Pre-loaded conversation) ──
export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-001",
    role: "ai",
    content:
      "🟢 ResQMind AI Assistant online — running on local Qdrant Edge.\n\nI have access to **42 documents**, **6 shelter databases**, and **247 victim records** stored locally. I can answer questions about shelters, medical guidelines, evacuation routes, and more.\n\nHow can I assist you, Officer?",
    timestamp: "2026-09-26T19:00:00",
  },
];

// ── AI Response Templates ──
export const aiResponses: Record<string, string> = {
  shelter:
    '🏥 **Shelter Found: Gandhi Memorial Relief Camp**\n\n📍 Distance: **0.8 km** from your location\n🛏️ Available Beds: **73 / 200**\n📞 Contact: +91 98765 43210\n🚗 Route: Head North on NH-30, turn left at Danapur Chowk\n\n**Supplies Available:**\n• Food ✅ • Water ✅ • Blankets ✅ • First Aid ✅\n\n🗺️ I\'ve highlighted the route on your offline map. The road is clear — no blockages reported on this route.\n\n---\n\n*Also recommended:*\n• **Sri Aurobindo School Shelter** — 1.2 km, 67 beds available\n• **NDRF Base Camp Alpha** — 2.1 km, 55 beds available',
  medical:
    "💊 **Medical First Response — Snake Bite Protocol**\n\n1. **Immobilize** the affected limb immediately\n2. **Mark the time** of the bite on the patient's skin\n3. **Do NOT** apply tourniquet or attempt to suck venom\n4. **Anti-venom** must be administered within **2 hours**\n5. **Transport** to District Hospital (Ward 7) — 1.4 km\n\n📞 Hospital Contact: +91 98765 43212\n🛏️ Available Beds: 28\n\n⚠️ **Alert:** Bridge on direct route is damaged. Use alternate Route B via State Highway.",
  evacuation:
    "🚨 **Evacuation Route — Ward 3 to Gandhi Memorial Camp**\n\n**Route A (Recommended):**\n1. Head North from Ward 3 gate\n2. Take NH-30 for 1.2 km\n3. Turn left at Danapur Chowk\n4. Camp entrance is 200m ahead\n\n⏱️ Estimated time: **15 minutes by vehicle**\n📏 Distance: **2.1 km**\n🟢 Road Status: **CLEAR**\n\n⚠️ **Avoid:** Ward 2 river road — waterlogged (4ft depth)\n⚠️ **Avoid:** Bridge near Ward 4 — structural collapse reported\n\n🛶 For water rescue: 2 boats available at NDRF Base Camp Alpha",
  sop:
    "📋 **Flood Emergency SOP — Key Steps**\n\n1. ✅ Activate District EOC — *Completed*\n2. ✅ Deploy NDRF/SDRF teams — *2 teams active*\n3. 🔄 Door-to-door evacuation — *In Progress (Wards 1-5)*\n4. ✅ Relief camps operational — *6 camps active*\n5. 🔄 Communication chain — *Satellite phone active*\n6. ✅ Medical screening — *All shelters covered*\n7. 🔄 Emergency kit distribution — *70% distributed*\n8. 🔄 GPS documentation — *247 records, 5 pending sync*\n9. ✅ Hourly SitReps — *Last report 18:30 hrs*\n10. ⏸️ Aerial rescue — *On standby (water level: 5.2 ft)*\n\n📊 Overall progress: **68%**",
  default:
    "I've searched the local Qdrant Edge database for your query. Here's what I found:\n\n📊 **Local Database Status:**\n• 42 documents indexed\n• 6 shelter records active\n• 247 victim records stored\n• 3 blocked road alerts\n\nCould you be more specific? I can help with:\n• 🏥 Shelter availability & routes\n• 💊 Medical protocols & guidelines\n• 🚨 Evacuation procedures\n• 📋 SOPs & operational checklists\n• 📍 GPS locations & blocked roads",
};
