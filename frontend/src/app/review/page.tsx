"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RotateCcw,
  XCircle,
  HelpCircle,
  History,
  Filter,
  User,
  ExternalLink,
  Check,
  Edit3,
  X,
  Printer,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfidenceIndicator } from "@/components/ui/ConfidenceIndicator";
import { Button } from "@/components/ui/Button";
import { OneHealthCard } from "@/components/ui/OneHealthCard";
import { PrintableInspectionReport } from "@/components/ui/PrintableInspectionReport";

export default function ReviewDashboardPage() {
  const [queue, setQueue] = useState<any[]>([]);
  const [selectedObs, setSelectedObs] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "audit">("queue");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [reviewerNotes, setReviewerNotes] = useState("");
  const [filterPriority, setFilterPriority] = useState("ALL");
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    fetch("/api/reviews/queue")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setQueue(res.data);
          setSelectedObs(res.data[0]);
        } else {
          // Fallback mock queue data
          const mockData = getMockQueue();
          setQueue(mockData);
          setSelectedObs(mockData[0]);
        }
      })
      .catch(() => {
        const mockData = getMockQueue();
        setQueue(mockData);
        setSelectedObs(mockData[0]);
      });

    fetch("/api/reviews/audit")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) setAuditLogs(res.data);
      })
      .catch(() => {});
  }, []);

  const handleReviewAction = async (
    action: "CONFIRM" | "MODIFY" | "REJECT" | "REQUEST_INFO",
  ) => {
    if (!selectedObs) return;

    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          observationId: selectedObs.id,
          reviewerId: "rev-elena-vance",
          action,
          reviewerNotes:
            reviewerNotes || `Expert reviewer executed ${action} action.`,
        }),
      });

      // Update local state
      const updatedQueue = queue.map((item) => {
        if (item.id === selectedObs.id) {
          return {
            ...item,
            status:
              action === "CONFIRM" || action === "MODIFY"
                ? "VERIFIED"
                : action === "REJECT"
                  ? "REJECTED"
                  : "NEEDS_INFO",
          };
        }
        return item;
      });

      setQueue(updatedQueue);
      setSelectedObs({
        ...selectedObs,
        status:
          action === "CONFIRM" || action === "MODIFY"
            ? "VERIFIED"
            : action === "REJECT"
              ? "REJECTED"
              : "NEEDS_INFO",
      });
      setReviewerNotes("");
    } catch {
      // Optimistic update
      setSelectedObs({ ...selectedObs, status: "VERIFIED" });
    }
  };

  const filteredQueue = queue.filter((item) => {
    if (filterPriority === "ALL") return true;
    return item.priority === filterPriority;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Title & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-borderNeutral">
        <div>
          <span className="text-xs font-bold text-river-700 uppercase tracking-widest">
            Expert Verification Hub
          </span>
          <h1 className="text-3xl font-extrabold text-env-950 tracking-tight flex items-center space-x-3">
            <span>Human-in-the-Loop Review Dashboard</span>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
              {queue.filter((q) => q.status !== "VERIFIED").length} Pending
            </span>
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-paper-200/70 p-1 rounded-xl border border-borderNeutral text-xs font-semibold">
          <button
            onClick={() => setActiveTab("queue")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "queue"
                ? "bg-white text-env-900 shadow-sm"
                : "text-textMuted hover:text-env-900"
            }`}
          >
            Review Queue ({queue.length})
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === "audit"
                ? "bg-white text-env-900 shadow-sm"
                : "text-textMuted hover:text-env-900"
            }`}
          >
            Audit Trail Log
          </button>
        </div>
      </div>

      {activeTab === "queue" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Review Queue List */}
          <div className="lg:col-span-5 space-y-4">
            {/* Filter Bar */}
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-borderNeutral text-xs">
              <span className="font-semibold text-textMuted flex items-center">
                <Filter className="w-3.5 h-3.5 mr-1 text-river-700" />
                Priority Filter:
              </span>
              <div className="flex space-x-1">
                {["ALL", "HIGH", "MEDIUM", "LOW"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPriority(p)}
                    className={`px-2.5 py-1 rounded transition-colors font-medium ${
                      filterPriority === p
                        ? "bg-env-800 text-white"
                        : "text-textMuted hover:bg-paper-100"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Queue Cards */}
            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredQueue.map((item) => {
                const isSelected = selectedObs?.id === item.id;
                const aiStat =
                  item.aiAnalyses?.[0]?.overallStatus ||
                  "ATTENTION_RECOMMENDED";
                const aiConf = item.aiAnalyses?.[0]?.overallConfidence || 0.84;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedObs(item)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? "border-env-800 bg-white ring-2 ring-env-700 shadow-md"
                        : "border-borderNeutral bg-white hover:border-env-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-env-950">
                        {item.id}
                      </span>
                      <StatusBadge status={item.status || aiStat} />
                    </div>

                    <h3 className="text-sm font-bold text-env-950 line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-textMuted border-t border-borderNeutral/60 pt-2">
                      <span>{item.site?.name || "Riverside North"}</span>
                      <span className="font-medium text-river-700">
                        {Math.round(aiConf * 100)}% AI Conf
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Review & Human Action Panel */}
          {selectedObs ? (
            <div className="lg:col-span-7 bg-white rounded-2xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-borderNeutral">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-mono text-xs text-textMuted bg-paper-200 px-2 py-0.5 rounded">
                      {selectedObs.id}
                    </span>
                    <StatusBadge status={selectedObs.status} />
                  </div>
                  <h2 className="text-xl font-bold text-env-950">
                    {selectedObs.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReportModal(true)}
                    className="border-river-300 text-river-700 hover:bg-river-50 text-xs font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5 mr-1 text-river-600" />
                    Export PDF Report
                  </Button>

                  <Link
                    href={`/observations/${selectedObs.id}`}
                    className="text-xs font-semibold text-river-700 hover:underline flex items-center"
                  >
                    View Full Detail{" "}
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Citizen Photo & Indicators Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="relative h-44 rounded-xl overflow-hidden border border-borderNeutral bg-paper-50">
                  <Image
                    src={
                      selectedObs.images?.[0]?.url ||
                      "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt="Observation photo"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-env-900 block text-xs">
                    Reported Indicators
                  </span>
                  <div className="p-2 bg-paper-50 rounded border border-borderNeutral">
                    <span className="text-textMuted block">Water:</span>
                    <span className="font-semibold text-env-950">
                      {selectedObs.waterAppearance}
                    </span>
                  </div>
                  <div className="p-2 bg-paper-50 rounded border border-borderNeutral">
                    <span className="text-textMuted block">Vegetation:</span>
                    <span className="font-semibold text-env-950">
                      {selectedObs.vegetationCondition}
                    </span>
                  </div>
                  <div className="p-2 bg-paper-50 rounded border border-borderNeutral">
                    <span className="text-textMuted block">
                      Pollution & Odor:
                    </span>
                    <span className="font-semibold text-env-950">
                      {selectedObs.pollutionIndicators} (
                      {selectedObs.odorReported || "None"})
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Assessment & Evidence Summary */}
              <div className="p-4 bg-paper-50 rounded-xl border border-borderNeutral space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-env-900">
                    AI Signal Analysis
                  </span>
                  <span className="text-river-700 font-semibold">
                    {Math.round(
                      (selectedObs.aiAnalyses?.[0]?.overallConfidence || 0.84) *
                        100,
                    )}
                    % Confidence
                  </span>
                </div>
                <p className="text-textMuted leading-relaxed">
                  {selectedObs.aiAnalyses?.[0]?.reasoningSummary ||
                    "Visual evaluation identified surface discoloration and accumulated foam raft near outfall pipe."}
                </p>
              </div>

              {/* One Health 4-Quadrant Impact Matrix */}
              <OneHealthCard
                overallStatus={selectedObs.aiAnalyses?.[0]?.overallStatus}
                perspective={selectedObs.aiAnalyses?.[0]?.oneHealthPerspective}
              />

              {/* EXPERT ACTION PANEL */}
              <div className="p-6 bg-env-900 text-white rounded-xl space-y-4">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">
                    Expert Reviewer Decision Panel
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-env-200 mb-1">
                    Reviewer Verification Notes
                  </label>
                  <textarea
                    value={reviewerNotes}
                    onChange={(e) => setReviewerNotes(e.target.value)}
                    placeholder="Enter professional justification or field sampling instructions..."
                    rows={2}
                    className="w-full px-3 py-2 bg-env-950 border border-env-700 rounded-lg text-xs text-white placeholder-env-300/40"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleReviewAction("CONFIRM")}
                    className="bg-emerald-500 hover:bg-emerald-600 text-env-950 font-bold"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" />
                    Confirm
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleReviewAction("MODIFY")}
                    className="bg-river-600 hover:bg-river-700 text-white font-medium"
                  >
                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                    Modify
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReviewAction("REQUEST_INFO")}
                    className="border-env-700 text-env-200 hover:bg-env-800"
                  >
                    <HelpCircle className="w-3.5 h-3.5 mr-1" />
                    Needs Info
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReviewAction("REJECT")}
                  >
                    <X className="w-3.5 h-3.5 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Printable Official Inspection Report Modal */}
          {showReportModal && selectedObs && (
            <PrintableInspectionReport
              observation={selectedObs}
              onClose={() => setShowReportModal(false)}
            />
          )}
        </div>
      ) : (
        /* AUDIT TRAIL LOG TAB */
        <div className="bg-white rounded-2xl border border-borderNeutral p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-river-700" />
            <h2 className="text-lg font-bold text-env-950">
              Immutable Review Audit Trail
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            {[
              {
                time: "11:09 AM",
                user: "Dr. Elena Vance (Reviewer)",
                action: "CONFIRM_ASSESSMENT",
                obs: "OBS-1002",
                detail:
                  "Confirmed eutrophication algal bloom finding. Dispatched field sampling crew.",
              },
              {
                time: "10:42 AM",
                user: "HYDREON Engine (AI)",
                action: "AI_ASSESSMENT_GENERATED",
                obs: "OBS-1001",
                detail:
                  "Generated structured AI assessment with 84% confidence and ecosystem stress signal.",
              },
              {
                time: "09:15 AM",
                user: "Marcus Chen (Citizen)",
                action: "OBSERVATION_SUBMITTED",
                obs: "OBS-1001",
                detail:
                  "Submitted photo and water discoloration report for Riverside Site 01.",
              },
            ].map((log, idx) => (
              <div
                key={idx}
                className="p-4 bg-paper-50 rounded-xl border border-borderNeutral flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-env-900">
                      {log.obs}
                    </span>
                    <span className="font-semibold text-river-700">
                      {log.action}
                    </span>
                    <span className="text-textMuted">• {log.user}</span>
                  </div>
                  <p className="text-textMuted">{log.detail}</p>
                </div>
                <span className="font-mono text-[11px] text-textMuted whitespace-nowrap">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getMockQueue() {
  return [
    {
      id: "OBS-1001",
      title: "Unusual Milky Discoloration & White Foam",
      status: "IN_REVIEW",
      priority: "HIGH",
      waterAppearance: "Grayish-White Discoloration",
      vegetationCondition: "Severely Reduced",
      pollutionIndicators: "Foam / Discoloration Outfall",
      odorReported: "Musty / Chemical",
      site: { name: "Riverside North Stream" },
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
            "Visual analysis confirms surface discoloration and persistent localized foam raft.",
        },
      ],
    },
    {
      id: "OBS-1002",
      title: "Heavy Algae Mat & Foul Sulfuric Odor",
      status: "VERIFIED",
      priority: "HIGH",
      waterAppearance: "Excessive Algae",
      vegetationCondition: "Excessive Algae",
      pollutionIndicators: "Odor / Algal Bloom",
      odorReported: "Sulfur / Rotten Egg",
      site: { name: "Greenway Urban Canal" },
      images: [
        {
          url: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      aiAnalyses: [
        {
          overallStatus: "HIGH_PRIORITY_SIGNAL",
          overallConfidence: 0.91,
          reasoningSummary:
            "Extensive surface coverage matches eutrophication algal bloom profile.",
        },
      ],
    },
    {
      id: "OBS-1003",
      title: "Clear Stream Flow & Active Aquatic Life",
      status: "VERIFIED",
      priority: "LOW",
      waterAppearance: "Normal Clear",
      vegetationCondition: "Abundant Riparian",
      pollutionIndicators: "None",
      odorReported: "None",
      site: { name: "Central Watershed Runoff" },
      images: [
        {
          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        },
      ],
      aiAnalyses: [
        {
          overallStatus: "NO_CONCERN",
          overallConfidence: 0.95,
          reasoningSummary:
            "Baseline stream clarity with active macroinvertebrate life.",
        },
      ],
    },
  ];
}
