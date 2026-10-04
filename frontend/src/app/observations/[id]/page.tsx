"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Activity,
  Waves,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  FileText,
  Lock,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfidenceIndicator } from "@/components/ui/ConfidenceIndicator";
import { Button } from "@/components/ui/Button";

export default function ObservationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/observations/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        } else {
          // Demo fallback object if API endpoint is loading demo database
          setData(getMockObservation(params.id));
        }
      })
      .catch(() => setData(getMockObservation(params.id)))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading || !data) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-8 h-8 border-4 border-env-800 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-textMuted">
          Loading explainable assessment...
        </p>
      </div>
    );
  }

  const aiAnalysis = data.aiAnalyses?.[0] || {
    overallStatus: "ATTENTION_RECOMMENDED",
    overallConfidence: 0.84,
    reasoningSummary:
      "Visual evaluation identified surface discoloration and accumulated foam raft near outfall pipe.",
    uncertaintyNotes:
      "Visual observations cannot confirm chemical contamination, pathogen levels, or drinkability without laboratory sample assays.",
    signals: [
      {
        id: "1",
        signalType: "ecosystem_stress",
        confidence: 0.84,
        evidence:
          "Milky gray-white discoloration plume in surface water column.",
      },
      {
        id: "2",
        signalType: "outfall_runoff_anomaly",
        confidence: 0.79,
        evidence: "Persistent white foam raft accumulated at bank foliage.",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-borderNeutral">
        <div>
          <div className="flex items-center space-x-2 text-xs text-textMuted mb-1">
            <Link href="/map" className="hover:text-env-900">
              Stream Intelligence
            </Link>
            <span>/</span>
            <span>Observation Detail</span>
          </div>
          <h1 className="text-2xl font-extrabold text-env-950 flex items-center space-x-3">
            <span>{data.title || "Citizen Stream Observation"}</span>
            <span className="font-mono text-xs font-normal text-textMuted bg-paper-200 px-2 py-0.5 rounded">
              {data.id}
            </span>
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <Link href="/review">
            <Button variant="secondary" size="sm">
              <ShieldCheck className="w-4 h-4 mr-1.5" />
              Open Review Queue
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Header Assessment Banner */}
      <div className="bg-white rounded-2xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-borderNeutral">
          <div className="space-y-1">
            <span className="text-xs font-bold text-river-700 uppercase tracking-widest">
              AI-Assisted Assessment
            </span>
            <div className="flex items-center space-x-3">
              <StatusBadge status={data.status || aiAnalysis.overallStatus} />
              <span className="text-xs text-textMuted font-mono">
                Observed:{" "}
                {new Date(data.observedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="w-full sm:w-64 bg-paper-50 p-3 rounded-xl border border-borderNeutral">
            <ConfidenceIndicator
              confidence={aiAnalysis.overallConfidence || 0.84}
            />
          </div>
        </div>

        {/* Reasoning Summary */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-env-950">Assessment Summary</h2>
          <p className="text-sm text-textMuted leading-relaxed">
            {aiAnalysis.reasoningSummary}
          </p>
        </div>
      </div>

      {/* 2-COLUMN GRID: OBSERVED EVIDENCE vs AI SIGNALS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Citizen Field Photo & Reported Indicators */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-borderNeutral p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-env-950 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-river-700" />
              1. What was observed by citizen?
            </h3>

            {/* Photo */}
            <div className="relative h-56 w-full rounded-xl overflow-hidden border border-borderNeutral bg-paper-50">
              <Image
                src={
                  data.images?.[0]?.url ||
                  "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Submitted observation photo"
                fill
                className="object-cover"
              />
            </div>

            {/* Indicators Grid */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-paper-50 rounded border border-borderNeutral">
                <span className="text-textMuted">Water Appearance</span>
                <span className="font-semibold text-env-900">
                  {data.waterAppearance}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-paper-50 rounded border border-borderNeutral">
                <span className="text-textMuted">Vegetation Condition</span>
                <span className="font-semibold text-env-900">
                  {data.vegetationCondition}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-paper-50 rounded border border-borderNeutral">
                <span className="text-textMuted">Wildlife Observed</span>
                <span className="font-semibold text-env-900">
                  {data.wildlifeObserved}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-paper-50 rounded border border-borderNeutral">
                <span className="text-textMuted">Pollution & Odor</span>
                <span className="font-semibold text-env-900">
                  {data.pollutionIndicators} ({data.odorReported || "None"})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Signal Evidence & Scientific Disclaimers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Signal Evidence Cards */}
          <div className="bg-white rounded-2xl border border-borderNeutral p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-env-950 flex items-center">
              <Activity className="w-4 h-4 mr-2 text-amber-600" />
              2. Why this assessment? (Detected Signals)
            </h3>

            <div className="space-y-3">
              {aiAnalysis.signals?.map((sig: any, idx: number) => (
                <div
                  key={idx}
                  className="p-4 bg-paper-50 rounded-xl border border-borderNeutral space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-env-950 uppercase tracking-wide">
                      {sig.signalType.replace(/_/g, " ")}
                    </span>
                    <span className="text-xs font-bold text-river-700 bg-river-50 px-2 py-0.5 rounded border border-river-200">
                      {Math.round(sig.confidence * 100)}% Confidence
                    </span>
                  </div>
                  <p className="text-xs text-textMuted leading-relaxed">
                    {sig.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Limitations Notice */}
          <div className="bg-amber-50/80 rounded-2xl border border-amber-200 p-6 space-y-2 text-xs text-amber-900">
            <div className="flex items-center space-x-2 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>3. Important Scientific Limitation</span>
            </div>
            <p className="leading-relaxed">
              {aiAnalysis.uncertaintyNotes ||
                "Visual observations cannot confirm chemical contamination, pathogen levels, or drinkability without laboratory sample assays."}
            </p>
          </div>
        </div>
      </div>

      {/* ONE HEALTH PERSPECTIVE */}
      <div className="bg-white rounded-2xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-6">
        <h3 className="text-base font-bold text-env-950 flex items-center">
          <Waves className="w-5 h-5 mr-2 text-env-700" />
          One Health Perspective & Interconnected Relationships
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-env-50/60 rounded-xl border border-env-200 space-y-2">
            <span className="font-bold text-env-900 block uppercase tracking-wider text-[10px]">
              1. Ecosystem
            </span>
            <p className="text-textMuted">
              Discoloration & foam raft indicate localized surface stress
              downstream of outfall.
            </p>
          </div>
          <div className="p-4 bg-river-50/60 rounded-xl border border-river-200 space-y-2">
            <span className="font-bold text-river-900 block uppercase tracking-wider text-[10px]">
              2. Aquatic Wildlife
            </span>
            <p className="text-textMuted">
              No fish observed in immediate discharge zone; macroinvertebrate
              habitat restricted.
            </p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2">
            <span className="font-bold text-amber-900 block uppercase tracking-wider text-[10px]">
              3. Human Relevance
            </span>
            <p className="text-textMuted">
              Recreational water contact warning recommended pending expert
              review.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
            <span className="font-bold text-emerald-900 block uppercase tracking-wider text-[10px]">
              4. Community Action
            </span>
            <p className="text-textMuted">
              Trigger expert verification & field sample dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* HUMAN REVIEW AUDIT PANEL */}
      <div className="bg-env-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-floating">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Human-in-the-Loop Review Status</span>
          </div>
          <h4 className="text-lg font-bold text-white">
            {data.status === "VERIFIED"
              ? "Verified Expert Finding"
              : "Pending Expert Review Verification"}
          </h4>
          <p className="text-xs text-env-200/80 max-w-lg">
            Qualified reviewers can confirm, modify, or reject AI assessments in
            the review queue.
          </p>
        </div>

        <Link href="/review">
          <Button
            variant="primary"
            size="md"
            className="bg-emerald-500 hover:bg-emerald-600 text-env-950 font-bold whitespace-nowrap"
          >
            Review Submission Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

function getMockObservation(id: string) {
  return {
    id: id || "OBS-1001",
    title: "Unusual Milky Discoloration & White Foam",
    status: "IN_REVIEW",
    priority: "HIGH",
    waterAppearance: "Unusual Discoloration",
    vegetationCondition: "Severely Reduced",
    wildlifeObserved: "No Visible Life",
    pollutionIndicators: "Foam / Discoloration Outfall",
    odorReported: "Musty / Chemical",
    observedAt: new Date().toISOString(),
    images: [
      {
        url: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    aiAnalyses: [
      {
        overallStatus: "ATTENTION_RECOMMENDED",
        overallConfidence: 0.84,
        reasoningSummary:
          "Visual analysis confirms surface discoloration and persistent localized foam structure below northern discharge culvert.",
        uncertaintyNotes:
          "Visual observation cannot confirm toxic chemical presence or bacterial pathogens without laboratory water testing.",
        signals: [
          {
            signalType: "ecosystem_stress",
            confidence: 0.84,
            evidence: "Opaque visual opacity in submitted surface photo.",
          },
          {
            signalType: "outfall_runoff_anomaly",
            confidence: 0.79,
            evidence: "Accumulated white foam raft at embankment foliage.",
          },
        ],
      },
    ],
  };
}
