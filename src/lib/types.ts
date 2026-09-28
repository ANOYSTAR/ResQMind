// ── Types for ResQMind Platform ──

export type ConnectivityStatus = "offline" | "syncing" | "online";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Shelter {
  id: string;
  name: string;
  location: GeoLocation;
  totalBeds: number;
  availableBeds: number;
  contact: string;
  type: "shelter" | "hospital" | "relief-camp";
  supplies: string[];
  lastUpdated: string;
}

export interface BlockedRoad {
  id: string;
  location: GeoLocation;
  reason: string;
  severity: "low" | "medium" | "high";
  reportedAt: string;
}

export interface VictimRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  medicalStatus: "critical" | "serious" | "stable" | "minor";
  condition: string;
  location: GeoLocation;
  address: string;
  photo?: string;
  notes: string;
  rescuedBy: string;
  timestamp: string;
  synced: boolean;
}

export interface IncidentReport {
  id: string;
  title: string;
  type: "flood" | "earthquake" | "fire" | "landslide" | "cyclone" | "other";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  location: GeoLocation;
  reportedBy: string;
  timestamp: string;
  photos: string[];
  synced: boolean;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: "sop" | "medical" | "evacuation" | "map" | "guideline" | "protocol";
  description: string;
  content: string;
  fileType: string;
  fileSize: string;
  lastModified: string;
  tags: string[];
}

export interface SyncRecord {
  id: string;
  type: "victim" | "incident" | "document" | "shelter-update";
  title: string;
  status: "pending" | "syncing" | "synced" | "failed";
  timestamp: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  sources?: string[];
}

export interface DashboardStats {
  totalVictims: number;
  activeRescues: number;
  sheltersActive: number;
  pendingSync: number;
  documentsStored: number;
  totalBeds: number;
  availableBeds: number;
  blockedRoads: number;
}
