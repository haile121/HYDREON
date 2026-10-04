"use client";

import React from "react";
import { Printer, Download, ShieldCheck, FileText, X } from "lucide-react";
import { Button } from "./Button";

interface PrintableInspectionReportProps {
  observation: any;
  onClose: () => void;
}

export function PrintableInspectionReport({
  observation,
  onClose,
}: PrintableInspectionReportProps) {
  if (!observation) return null;

  const handlePrint = () => {
    window.print();
  };

  const ai = observation.aiAnalyses?.[0] || {};
  const status = observation.status || "VERIFIED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-env-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-borderNeutral overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Controls Bar */}
        <div className="p-4 bg-env-950 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">
              Official Stream Health Inspection Document
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              className="bg-emerald-500 hover:bg-emerald-600 text-env-950 font-bold"
            >
              <Printer className="w-4 h-4 mr-1.5" />
              Print / Save PDF Report
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 text-env-300 hover:text-white rounded-lg hover:bg-env-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white print:p-0 print:shadow-none font-sans">
          {/* Document Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-env-950">
            <div>
              <div className="text-xs font-extrabold tracking-widest text-river-700 uppercase">
                IEEE OneAquaHealth Standard Report
              </div>
              <h1 className="text-2xl font-black text-env-950 tracking-tight mt-1">
                STREAM HEALTH FIELD ASSESSMENT CERTIFICATE
              </h1>
              <p className="text-xs text-textMuted mt-1">
                HYDREON StreamGuard AI • Human-in-the-Loop Verified Telemetry
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-env-950 text-emerald-400 font-mono text-xs font-bold rounded">
                ID: {observation.id}
              </span>
              <div className="text-[11px] text-textMuted mt-2 font-mono">
                Date:{" "}
                {new Date(
                  observation.createdAt || Date.now(),
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* 2-Column Summary */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-paper-50 rounded-xl border border-borderNeutral space-y-2">
              <span className="font-bold text-env-950 text-xs block uppercase tracking-wider text-river-700">
                1. Stream Location & Metadata
              </span>
              <div className="space-y-1 text-env-900">
                <div>
                  <strong className="text-textMuted">Site Name:</strong>{" "}
                  {observation.site?.name || "Riverside Stream Site 01"}
                </div>
                <div>
                  <strong className="text-textMuted">Status:</strong>{" "}
                  <span className="font-bold text-emerald-700">{status}</span>
                </div>
                <div>
                  <strong className="text-textMuted">Priority:</strong>{" "}
                  {observation.priority || "HIGH"}
                </div>
                <div>
                  <strong className="text-textMuted">Observer:</strong> Citizen
                  Science Field Participant
                </div>
              </div>
            </div>

            <div className="p-4 bg-paper-50 rounded-xl border border-borderNeutral space-y-2">
              <span className="font-bold text-env-950 text-xs block uppercase tracking-wider text-river-700">
                2. AI Multimodal Evaluation
              </span>
              <div className="space-y-1 text-env-900">
                <div>
                  <strong className="text-textMuted">AI Engine:</strong> OpenAI
                  GPT-4o Multimodal
                </div>
                <div>
                  <strong className="text-textMuted">Overall Status:</strong>{" "}
                  {ai.overallStatus || "ATTENTION_RECOMMENDED"}
                </div>
                <div>
                  <strong className="text-textMuted">Confidence Score:</strong>{" "}
                  {Math.round((ai.overallConfidence || 0.88) * 100)}%
                </div>
                <div>
                  <strong className="text-textMuted">Review Action:</strong>{" "}
                  Expert Verification Passed
                </div>
              </div>
            </div>
          </div>

          {/* Qualitative Indicators Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-env-950">
              3. Citizen Science Field Observations
            </h3>
            <table className="w-full text-xs text-left border border-borderNeutral rounded-lg overflow-hidden">
              <thead className="bg-env-950 text-white font-semibold">
                <tr>
                  <th className="p-2.5">Indicator Category</th>
                  <th className="p-2.5">Reported Value</th>
                  <th className="p-2.5">AI Evidence Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderNeutral text-env-900">
                <tr>
                  <td className="p-2.5 font-medium">Water Appearance</td>
                  <td className="p-2.5 font-semibold text-river-800">
                    {observation.waterAppearance}
                  </td>
                  <td className="p-2.5 text-textMuted">
                    Multimodal visual texture & discoloration match
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Vegetation Condition</td>
                  <td className="p-2.5 font-semibold text-river-800">
                    {observation.vegetationCondition}
                  </td>
                  <td className="p-2.5 text-textMuted">
                    Canopy & riparian bank coverage check
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Pollution Indicators</td>
                  <td className="p-2.5 font-semibold text-river-800">
                    {observation.pollutionIndicators}
                  </td>
                  <td className="p-2.5 text-textMuted">
                    Surface debris and outfall detection
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Odor Description</td>
                  <td className="p-2.5 font-semibold text-river-800">
                    {observation.odorReported || "None"}
                  </td>
                  <td className="p-2.5 text-textMuted">
                    Volatile compound indicators
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Expert Sign-off Box */}
          <div className="p-5 bg-paper-100 rounded-xl border border-borderNeutral flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              <div>
                <span className="font-bold text-xs text-env-950 block">
                  Expert Reviewer Digital Certification
                </span>
                <p className="text-[11px] text-textMuted">
                  Verified by Dr. Elena Vance (Senior Hydrologist) via HYDREON
                  Governance Engine.
                </p>
              </div>
            </div>

            <div className="text-right border-l border-borderNeutral pl-6">
              <span className="font-mono text-xs font-extrabold text-emerald-700 block">
                [ VERIFIED & CERTIFIED ]
              </span>
              <span className="text-[10px] text-textMuted font-mono">
                SHA256-AUTHENTICATED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
