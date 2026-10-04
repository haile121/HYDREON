"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ExternalLink } from "lucide-react";

interface MapPoint {
  id: string;
  title: string;
  status: string;
  priority: string;
  waterAppearance: string;
  location: { latitude: number; longitude: number; address?: string };
  site?: { name: string };
  images?: Array<{ url: string }>;
  aiAnalyses?: Array<{ overallStatus: string; overallConfidence: number }>;
}

export default function StreamMap({
  points,
  selectedId,
  onSelectPoint,
}: {
  points: MapPoint[];
  selectedId?: string;
  onSelectPoint: (id: string) => void;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-full min-h-[500px] bg-paper-100 rounded-xl flex items-center justify-center text-textMuted text-xs">
        Initializing Spatial Stream Intelligence Map...
      </div>
    );
  }

  // Dynamic Leaflet Component render
  const L = require("leaflet");
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");

  // Custom marker colors
  const createMarkerIcon = (status: string) => {
    let color = "#3c6e54"; // green default
    if (status === "ATTENTION_RECOMMENDED" || status === "IN_REVIEW")
      color = "#d97706"; // amber
    if (status === "HIGH_PRIORITY_SIGNAL" || status === "HIGH")
      color = "#dc2626"; // red
    if (status === "VERIFIED") color = "#16a34a";

    return L.divIcon({
      className: "custom-map-pin",
      html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  };

  const center: [number, number] =
    points.length > 0 &&
    points[0].location?.latitude &&
    points[0].location?.longitude
      ? [points[0].location.latitude, points[0].location.longitude]
      : [42.3585, -71.062];

  return (
    <div className="w-full h-full min-h-[550px] relative z-0 rounded-2xl overflow-hidden border border-borderNeutral shadow-card">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((pt) => {
          const lat = pt.location?.latitude || 42.36;
          const lng = pt.location?.longitude || -71.05;
          const status =
            pt.status || pt.aiAnalyses?.[0]?.overallStatus || "SUBMITTED";

          return (
            <Marker
              key={pt.id}
              position={[lat, lng]}
              icon={createMarkerIcon(status)}
              eventHandlers={{
                click: () => onSelectPoint(pt.id),
              }}
            >
              <Popup>
                <div className="p-3 max-w-xs space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-env-900">
                      {pt.id}
                    </span>
                    <StatusBadge status={status} />
                  </div>
                  <h4 className="font-bold text-sm text-env-950">{pt.title}</h4>
                  <p className="text-textMuted text-[11px]">
                    {pt.location?.address || "Stream Corridor Node"}
                  </p>
                  <div className="pt-2 border-t border-borderNeutral flex items-center justify-between">
                    <span className="text-[11px] text-river-700 font-semibold">
                      {Math.round(
                        (pt.aiAnalyses?.[0]?.overallConfidence || 0.84) * 100,
                      )}
                      % Confidence
                    </span>
                    <Link
                      href={`/observations/${pt.id}`}
                      className="text-xs text-env-800 font-bold hover:underline flex items-center"
                    >
                      View Detail <ExternalLink className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
