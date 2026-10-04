"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  MapPin,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  Calendar,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

export default function SiteDetailPage({ params }: { params: { id: string } }) {
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/sites/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setSiteData(res.data);
        } else {
          setSiteData(getMockSiteData());
        }
      })
      .catch(() => setSiteData(getMockSiteData()));
  }, [params.id]);

  const site = siteData?.site || getMockSiteData().site;
  const summary = siteData?.summary || getMockSiteData().summary;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Site Header */}
      <div className="bg-white rounded-2xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderNeutral">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-mono text-xs font-bold text-env-900 bg-paper-200 px-2 py-0.5 rounded">
                {site.code || "STR-RIV-01"}
              </span>
              <span className="text-xs text-textMuted font-medium">
                {site.streamType || "Urban Freshwater Creek"}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-env-950 tracking-tight">
              {site.name || "Riverside North Stream"}
            </h1>
            <p className="text-xs text-textMuted mt-1 max-w-xl">
              {site.description}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/observe">
              <Button variant="primary" size="sm">
                Report Observation Here
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-paper-50 rounded-xl border border-borderNeutral space-y-1">
            <span className="text-textMuted font-medium block">
              Total Monitored Observations
            </span>
            <span className="text-2xl font-extrabold text-env-950">
              {summary.totalObservations || 3}
            </span>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
            <span className="text-amber-900 font-semibold block">
              Potential Stress Signals
            </span>
            <span className="text-2xl font-extrabold text-amber-900">
              {summary.attentionRequired || 1}
            </span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
            <span className="text-emerald-900 font-semibold block">
              Verified Expert Findings
            </span>
            <span className="text-2xl font-extrabold text-emerald-900">
              {summary.verifiedCount || 2}
            </span>
          </div>
        </div>
      </div>

      {/* DATA-TO-INSIGHT CARDS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-env-950 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-river-700" />
          Synthesized Data-to-Insight Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-borderNeutral shadow-card space-y-3">
            <span className="text-xs font-bold text-river-700 uppercase tracking-wider">
              14-Day Visual Stress Trend
            </span>
            <h3 className="font-bold text-base text-env-950">
              Unusual Water Appearance Frequency
            </h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Unusual grayish-white water discoloration and localized foam raft
              reported below northern discharge pipe over recent submissions.
            </p>
            <Link
              href="/observations/OBS-1001"
              className="text-xs font-semibold text-river-700 hover:underline inline-flex items-center pt-1"
            >
              Inspect Underlying Observation OBS-1001{" "}
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-borderNeutral shadow-card space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Riparian Canopy Buffer
            </span>
            <h3 className="font-bold text-base text-env-950">
              Vegetation Health & Bank Condition
            </h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Riparian canopy coverage measured at 42.0% buffer density.
              Degraded bank foliage noted near stormwater outfall node.
            </p>
            <Link
              href="/observations/OBS-1001"
              className="text-xs font-semibold text-river-700 hover:underline inline-flex items-center pt-1"
            >
              Inspect Bank Condition Photos{" "}
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* OBSERVATION HISTORY TIMELINE */}
      <div className="bg-white rounded-2xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-6">
        <h2 className="text-lg font-bold text-env-950 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-env-800" />
          Site Observation History
        </h2>

        <div className="space-y-4">
          {site.observations?.map((obs: any) => (
            <div
              key={obs.id}
              className="p-4 bg-paper-50 rounded-xl border border-borderNeutral flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-env-900">
                    {obs.id}
                  </span>
                  <StatusBadge status={obs.status} />
                </div>
                <h3 className="font-bold text-sm text-env-950">{obs.title}</h3>
                <p className="text-xs text-textMuted">
                  Water: {obs.waterAppearance} • Vegetation:{" "}
                  {obs.vegetationCondition}
                </p>
              </div>

              <Link href={`/observations/${obs.id}`}>
                <Button variant="outline" size="sm">
                  View Detail
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getMockSiteData() {
  return {
    site: {
      code: "STR-RIV-01",
      name: "Riverside North Stream",
      streamType: "Perennial Urban Freshwater Creek",
      description:
        "Perennial urban creek segment flowing through dense residential and parkland corridor.",
      observations: [
        {
          id: "OBS-1001",
          title: "Unusual Milky Discoloration & White Foam",
          status: "IN_REVIEW",
          waterAppearance: "Grayish-White Discoloration",
          vegetationCondition: "Severely Reduced",
        },
        {
          id: "OBS-1003",
          title: "Clear Stream Flow & Active Aquatic Life",
          status: "VERIFIED",
          waterAppearance: "Normal Clear",
          vegetationCondition: "Abundant Riparian",
        },
      ],
    },
    summary: {
      totalObservations: 3,
      attentionRequired: 1,
      verifiedCount: 2,
    },
  };
}
