"use client";

import React, { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  Navigation,
  AlertTriangle,
  Home,
  Building2,
  Tent,
} from "lucide-react";
import { Shelter, BlockedRoad } from "@/lib/types";
import { officerLocation } from "@/lib/data";

interface OfflineMapProps {
  shelters: Shelter[];
  blockedRoads: BlockedRoad[];
}

// ── Custom icon factory ──
function createIcon(color: string, size: number = 14) {
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 2px solid white;
      border-radius: ${size / 2}px;
      box-shadow: 0 0 12px ${color}88;
    "></div>`,
  });
}

function createOfficerIcon() {
  return L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<div style="position:relative;width:28px;height:28px;">
      <div style="
        position:absolute;inset:0;
        background:#FF6B2C;
        border:3px solid white;
        border-radius:50%;
        box-shadow:0 0 18px #FF6B2Cbb;
        z-index:2;
      "></div>
      <div style="
        position:absolute;inset:-8px;
        border:2px solid #FF6B2C66;
        border-radius:50%;
        animation: ripple 2s ease-out infinite;
      "></div>
    </div>`,
  });
}

function createBlockedIcon() {
  return L.divIcon({
    className: "",
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    html: `<div style="
      width:20px;height:20px;
      background:#FFD60A;
      border:2px solid white;
      border-radius:4px;
      box-shadow:0 0 12px #FFD60A88;
      display:flex;align-items:center;justify-content:center;
      font-size:12px;font-weight:bold;color:#000;
    ">⚠</div>`,
  });
}

export default function OfflineMap({ shelters, blockedRoads }: OfflineMapProps) {
  const shelterIcon = useMemo(() => createIcon("#0A84FF", 14), []);
  const hospitalIcon = useMemo(() => createIcon("#FF3B30", 16), []);
  const campIcon = useMemo(() => createIcon("#30D158", 14), []);
  const officerIcon = useMemo(() => createOfficerIcon(), []);
  const blockedIcon = useMemo(() => createBlockedIcon(), []);

  // Route from officer to Gandhi Memorial (shelter with most beds)
  const routeToShelter: [number, number][] = [
    [officerLocation.lat, officerLocation.lng],
    [25.6105, 85.1385],
    [25.612, 85.141],
    [25.6145, 85.142],
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case "hospital":
        return hospitalIcon;
      case "relief-camp":
        return campIcon;
      default:
        return shelterIcon;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "hospital":
        return "Hospital";
      case "relief-camp":
        return "Relief Camp";
      default:
        return "Shelter";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "text-red-400";
      case "relief-camp":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="glass-card-elevated overflow-hidden relative">
      {/* ── Map Header ─── */}
      <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Interactive Offline Map
            </h2>
            <p className="text-[10px] text-slate-500">
              Flood Zone — Danapur, Bihar • GPS Active
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span className="text-slate-400">Shelter</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
            <span className="text-slate-400">Hospital</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            <span className="text-slate-400">Camp</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" />
            <span className="text-slate-400">Blocked</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
            <span className="text-slate-400">You</span>
          </div>
        </div>
      </div>

      {/* ── Map Container ─── */}
      <div className="h-[420px] relative map-container">
        <MapContainer
          center={[officerLocation.lat, officerLocation.lng]}
          zoom={15}
          className="h-full w-full z-0"
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Flood zone circle */}
          <Circle
            center={[officerLocation.lat, officerLocation.lng]}
            radius={800}
            pathOptions={{
              color: "#FF3B3066",
              fillColor: "#FF3B3011",
              fillOpacity: 0.3,
              weight: 1,
              dashArray: "8 4",
            }}
          />

          {/* Officer marker */}
          <Marker
            position={[officerLocation.lat, officerLocation.lng]}
            icon={officerIcon}
          >
            <Popup>
              <div className="text-center">
                <div className="font-bold text-orange-400 mb-1">
                  📍 Your Location
                </div>
                <div className="text-xs text-slate-300">Rescue Officer</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {officerLocation.lat.toFixed(4)}°N,{" "}
                  {officerLocation.lng.toFixed(4)}°E
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Shelter markers */}
          {shelters.map((shelter) => (
            <Marker
              key={shelter.id}
              position={[shelter.location.lat, shelter.location.lng]}
              icon={getIconForType(shelter.type)}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <div
                    className={`font-bold text-sm ${getTypeColor(shelter.type)} mb-1`}
                  >
                    {shelter.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mb-2">
                    {getTypeLabel(shelter.type)}
                  </div>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div>
                      🛏️ Beds: {shelter.availableBeds} / {shelter.totalBeds}
                    </div>
                    <div>📞 {shelter.contact}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {shelter.supplies.map((s) => (
                        <span
                          key={s}
                          className="px-1.5 py-0.5 bg-blue-500/10 text-blue-300 rounded text-[9px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Blocked roads */}
          {blockedRoads.map((road) => (
            <Marker
              key={road.id}
              position={[road.location.lat, road.location.lng]}
              icon={blockedIcon}
            >
              <Popup>
                <div>
                  <div className="font-bold text-yellow-400 text-sm mb-1">
                    ⚠ Road Blocked
                  </div>
                  <div className="text-xs text-slate-300">{road.reason}</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Severity: {road.severity.toUpperCase()}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Route line */}
          <Polyline
            positions={routeToShelter}
            pathOptions={{
              color: "#0A84FF",
              weight: 4,
              opacity: 0.8,
              dashArray: "10 6",
            }}
          />
        </MapContainer>

        {/* ── GPS Info Overlay ─── */}
        <div className="absolute bottom-4 left-4 glass-card px-3 py-2 z-[1000] flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-orange-400" />
          <div className="text-[10px]">
            <span className="text-slate-400">GPS: </span>
            <span className="text-white font-mono">
              {officerLocation.lat.toFixed(4)}°N,{" "}
              {officerLocation.lng.toFixed(4)}°E
            </span>
          </div>
        </div>

        {/* ── Route Info Overlay ─── */}
        <div className="absolute bottom-4 right-4 glass-card px-3 py-2 z-[1000]">
          <div className="text-[10px]">
            <span className="text-blue-400 font-semibold">
              Route to Gandhi Memorial
            </span>
            <div className="text-slate-400 mt-0.5">
              0.8 km • ~5 min walk • Road Clear
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
