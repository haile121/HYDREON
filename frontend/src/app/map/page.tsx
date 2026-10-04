"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MapPin,
  Filter,
  ShieldCheck,
  Activity,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

// Dynamic import of StreamMap to disable SSR for Leaflet window object
const StreamMap = dynamic(() => import("@/components/map/StreamMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-paper-100 rounded-2xl flex items-center justify-center text-textMuted text-xs font-medium border border-borderNeutral">
      Loading Spatial Stream Intelligence Map Engine...
    </div>
  ),
});

export default function MapPage() {
  const [points, setPoints] = useState<any[]>([]);
  const [selectedPointId, setSelectedPointId] = useState<string>("OBS-1001");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    fetch("/api/map/observations")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setPoints(res.data);
          setSelectedPointId(res.data[0].id);
        } else {
          setPoints(getMockMapPoints());
        }
      })
      .catch(() => setPoints(getMockMapPoints()));
  }, []);

  const filteredPoints = points.filter((pt) => {
    if (statusFilter === "ALL") return true;
    if (statusFilter === "VERIFIED") return pt.status === "VERIFIED";
    if (statusFilter === "ATTENTION")
      return (
        pt.status === "IN_REVIEW" ||
        pt.aiAnalyses?.[0]?.overallStatus === "ATTENTION_RECOMMENDED"
      );
    if (statusFilter === "HIGH")
      return (
        pt.priority === "HIGH" ||
        pt.aiAnalyses?.[0]?.overallStatus === "HIGH_PRIORITY_SIGNAL"
      );
    return true;
  });

  const selectedPoint =
    points.find((p) => p.id === selectedPointId) ||
    points[0] ||
    getMockMapPoints()[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-borderNeutral">
        <div>
          <span className="text-xs font-bold text-river-700 uppercase tracking-widest">
            Spatial Intelligence
          </span>
          <h1 className="text-3xl font-extrabold text-env-950 tracking-tight flex items-center space-x-3">
            <span>Stream Health Spatial Intelligence Map</span>
            <span className="text-xs font-normal text-textMuted bg-paper-200 px-2.5 py-1 rounded-full border border-borderNeutral">
              {filteredPoints.length} Monitored Nodes
            </span>
          </h1>
        </div>

        {/* Spatial Status Filters */}
        <div className="flex items-center space-x-1.5 bg-paper-200/80 p-1 rounded-xl border border-borderNeutral text-xs font-semibold">
          {[
            { id: "ALL", label: "All Nodes" },
            { id: "VERIFIED", label: "Verified Findings" },
            { id: "ATTENTION", label: "Requires Attention" },
            { id: "HIGH", label: "High Priority" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === f.id
                  ? "bg-env-800 text-white shadow-sm"
                  : "text-textMuted hover:text-env-900"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Map Box */}
        <div className="lg:col-span-8 h-[600px]">
          <StreamMap
            points={filteredPoints}
            selectedId={selectedPointId}
            onSelectPoint={(id) => setSelectedPointId(id)}
          />
        </div>

        {/* Selected Point Summary Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-borderNeutral p-6 shadow-card space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-borderNeutral">
            <span className="text-xs font-bold text-river-700 uppercase tracking-wider">
              Node Observation
            </span>
            <StatusBadge status={selectedPoint?.status || "SUBMITTED"} />
          </div>

          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-env-900 bg-paper-200 px-2 py-0.5 rounded">
              {selectedPoint?.id}
            </span>
            <h2 className="text-lg font-bold text-env-950">
              {selectedPoint?.title}
            </h2>
            <p className="text-xs text-textMuted flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1 text-river-700" />
              {selectedPoint?.location?.address || "Riverside Corridor Site"}
            </p>
          </div>

          <div className="p-3 bg-paper-50 rounded-xl border border-borderNeutral space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-textMuted">Water Appearance:</span>
              <span className="font-semibold text-env-950">
                {selectedPoint?.waterAppearance}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-textMuted">AI Confidence:</span>
              <span className="font-semibold text-river-700">
                {Math.round(
                  (selectedPoint?.aiAnalyses?.[0]?.overallConfidence || 0.84) *
                    100,
                )}
                %
              </span>
            </div>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <Link href={`/observations/${selectedPoint?.id}`}>
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-between"
              >
                <span>Inspect Full AI Assessment</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href={`/sites/STR-RIV-01`}>
              <Button variant="outline" size="sm" className="w-full">
                View Site Metric Trends
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMockMapPoints() {
  return [
    {
      id: "OBS-1001",
      title: "Unusual Milky Discoloration & White Foam",
      status: "IN_REVIEW",
      priority: "HIGH",
      waterAppearance: "Grayish-White Discoloration",
      location: {
        latitude: 42.3605,
        longitude: -71.0592,
        address: "Riverside Park Footbridge Gate 3",
      },
      aiAnalyses: [
        { overallStatus: "ATTENTION_RECOMMENDED", overallConfidence: 0.84 },
      ],
    },
    {
      id: "OBS-1002",
      title: "Heavy Algae Mat & Foul Sulfuric Odor",
      status: "VERIFIED",
      priority: "HIGH",
      waterAppearance: "Excessive Algae",
      location: {
        latitude: 42.3658,
        longitude: -71.0645,
        address: "Greenway Footpath Pier 12",
      },
      aiAnalyses: [
        { overallStatus: "HIGH_PRIORITY_SIGNAL", overallConfidence: 0.91 },
      ],
    },
    {
      id: "OBS-1003",
      title: "Clear Stream Flow & Active Aquatic Life",
      status: "VERIFIED",
      priority: "LOW",
      waterAppearance: "Normal Clear",
      location: {
        latitude: 42.3525,
        longitude: -71.0718,
        address: "Parkland Riffle Bench Site 4",
      },
      aiAnalyses: [{ overallStatus: "NO_CONCERN", overallConfidence: 0.95 }],
    },
  ];
}
