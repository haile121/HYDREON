"use client";

import React from "react";
import {
  TreePine,
  Fish,
  HeartPulse,
  Users,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

interface OneHealthCardProps {
  perspective?: {
    ecosystem?: string;
    animal?: string;
    human?: string;
    community?: string;
  };
  overallStatus?: string;
}

export function OneHealthCard({
  perspective,
  overallStatus,
}: OneHealthCardProps) {
  const isHighPriority = overallStatus === "HIGH_PRIORITY_SIGNAL";
  const isAttention = overallStatus === "ATTENTION_RECOMMENDED";

  const data = perspective || {
    ecosystem:
      "Surface discoloration and localized algal mat indicate altered light penetration and turbidity.",
    animal:
      "Potential macroinvertebrate habitat reduction and benthic spawning disruption if unattended.",
    human:
      "Contact awareness recommended; avoid direct un-filtered contact near discharge outflow.",
    community:
      "Inform local stream stewards and trigger expert municipal field sampling verification.",
  };

  return (
    <div className="bg-white rounded-2xl border border-borderNeutral p-6 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-borderNeutral">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-river-50 rounded-xl text-river-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-env-950">
              One Health Multimodal Impact Matrix
            </h3>
            <p className="text-xs text-textMuted">
              IEEE OneAquaHealth Cross-Domain Ecosystem Risk Evaluation
            </p>
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isHighPriority
              ? "bg-rose-100 text-rose-800 border-rose-300"
              : isAttention
                ? "bg-amber-100 text-amber-900 border-amber-300"
                : "bg-emerald-100 text-emerald-900 border-emerald-300"
          }`}
        >
          {isHighPriority
            ? "High Priority Hazard"
            : isAttention
              ? "Attention Advised"
              : "Nominal Baseline"}
        </span>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1: Ecosystem */}
        <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
            <TreePine className="w-4 h-4 text-emerald-700" />
            <span>Ecosystem Health</span>
          </div>
          <p className="text-xs text-env-950/80 leading-relaxed">
            {data.ecosystem}
          </p>
        </div>

        {/* Quadrant 2: Animal & Aquatic Life */}
        <div className="p-4 rounded-xl border border-cyan-100 bg-cyan-50/50 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-900 font-bold text-xs">
            <Fish className="w-4 h-4 text-cyan-700" />
            <span>Aquatic & Wildlife Safety</span>
          </div>
          <p className="text-xs text-env-950/80 leading-relaxed">
            {data.animal}
          </p>
        </div>

        {/* Quadrant 3: Human Contact */}
        <div className="p-4 rounded-xl border border-rose-100 bg-rose-50/50 space-y-2">
          <div className="flex items-center space-x-2 text-rose-900 font-bold text-xs">
            <HeartPulse className="w-4 h-4 text-rose-700" />
            <span>Human Contact Safety</span>
          </div>
          <p className="text-xs text-env-950/80 leading-relaxed">
            {data.human}
          </p>
        </div>

        {/* Quadrant 4: Community Action */}
        <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
            <Users className="w-4 h-4 text-amber-700" />
            <span>Community & Steward Action</span>
          </div>
          <p className="text-xs text-env-950/80 leading-relaxed">
            {data.community}
          </p>
        </div>
      </div>
    </div>
  );
}
