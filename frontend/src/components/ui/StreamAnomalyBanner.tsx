"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Bell,
  ChevronRight,
  X,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

interface StreamAnomalyBannerProps {
  siteName?: string;
  hazardType?: string;
}

export function StreamAnomalyBanner({
  siteName = "Riverside North Stream",
  hazardType = "Eutrophication Algal Bloom & Foam Outfall Signal",
}: StreamAnomalyBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-rose-900 via-amber-900 to-env-950 text-white px-4 py-3 border-b border-rose-700/50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 bg-rose-500/20 text-rose-300 rounded-lg border border-rose-400/30 animate-pulse">
            <ShieldAlert className="w-4 h-4" />
          </div>

          <div>
            <span className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
              AI Stream Health Alert:
            </span>{" "}
            <span className="font-semibold text-white">{hazardType}</span>{" "}
            <span className="text-rose-200/80">detected at {siteName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-semibold">
          <Link
            href="/review"
            className="px-3 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center shadow-sm"
          >
            Review Signals <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-rose-300/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
