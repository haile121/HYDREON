"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Database,
  Globe,
  ShieldCheck,
  Server,
  Cloud,
  FileCode,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ArchitecturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-river-700 uppercase tracking-widest">
          IEEE OneAquaHealth Technical Blueprint
        </span>
        <h1 className="text-4xl font-extrabold text-env-950 tracking-tight">
          System Architecture & One Health Principles
        </h1>
        <p className="text-base text-textMuted leading-relaxed">
          HYDREON combines a full-stack TypeScript architecture with an explicit
          scientific validation engine to ensure citizen data becomes
          trustworthy environmental intelligence.
        </p>
      </div>

      {/* PIPELINE ARCHITECTURE VISUALIZATION */}
      <div className="bg-white rounded-2xl border border-borderNeutral p-8 md:p-12 shadow-card space-y-8">
        <h2 className="text-xl font-bold text-env-950 flex items-center">
          <Layers className="w-5 h-5 mr-2 text-river-700" />
          End-to-End System Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="p-6 bg-paper-50 rounded-xl border border-borderNeutral space-y-3">
            <div className="w-10 h-10 rounded-lg bg-env-800 text-white flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 text-emerald-300" />
            </div>
            <span className="text-[10px] font-mono text-textMuted uppercase block font-bold">
              Layer 1: Client
            </span>
            <h3 className="font-bold text-base text-env-950">
              Next.js App Router
            </h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Mobile-first responsive React frontend with Tailwind CSS, Lucide
              icons, and Leaflet spatial mapping.
            </p>
          </div>

          <div className="p-6 bg-paper-50 rounded-xl border border-borderNeutral space-y-3">
            <div className="w-10 h-10 rounded-lg bg-river-700 text-white flex items-center justify-center font-bold">
              <Server className="w-5 h-5 text-river-200" />
            </div>
            <span className="text-[10px] font-mono text-textMuted uppercase block font-bold">
              Layer 2: Backend API
            </span>
            <h3 className="font-bold text-base text-env-950">
              Express.js REST Engine
            </h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Node.js + TypeScript API server enforcing input validation, rate
              limiting, and business domain services.
            </p>
          </div>

          <div className="p-6 bg-paper-50 rounded-xl border border-borderNeutral space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5 text-amber-200" />
            </div>
            <span className="text-[10px] font-mono text-textMuted uppercase block font-bold">
              Layer 3: AI Abstraction
            </span>
            <h3 className="font-bold text-base text-env-950">
              Multimodal AI Adapter
            </h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Modular AIProvider interface supporting OpenAI, Gemini, and Mock
              JSON engine with strict structured schemas.
            </p>
          </div>

          <div className="p-6 bg-paper-50 rounded-xl border border-borderNeutral space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold">
              <Database className="w-5 h-5 text-emerald-200" />
            </div>
            <span className="text-[10px] font-mono text-textMuted uppercase block font-bold">
              Layer 4: Relational Persistence
            </span>
            <h3 className="font-bold text-base text-env-950">
              PostgreSQL + Prisma ORM
            </h3>
            <p className="text-xs text-textMuted leading-relaxed">
              Normalized relational database storing observations, AI signals,
              expert reviews, audit logs, and spatial sites.
            </p>
          </div>
        </div>
      </div>

      {/* FAIR & INTEROPERABILITY PRINCIPLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-borderNeutral p-8 shadow-card space-y-4">
          <span className="text-xs font-bold text-river-700 uppercase tracking-wider">
            Scientific Data Standards
          </span>
          <h2 className="text-2xl font-bold text-env-950">
            FAIR Data Guiding Principles
          </h2>
          <p className="text-sm text-textMuted leading-relaxed">
            HYDREON structures every stream observation to support Findability,
            Accessibility, Interoperability, and Reusability across
            environmental informatics platforms.
          </p>

          <ul className="space-y-3 text-xs font-medium text-textMain pt-2">
            <li className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5" />{" "}
              <strong>Findable:</strong> Stable UUIDs and standardized stream
              site codes (e.g. STR-RIV-01).
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5" />{" "}
              <strong>Accessible:</strong> Open REST endpoints returning
              structured JSON data contracts.
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5" />{" "}
              <strong>Interoperable:</strong> FHIR-compatible observation
              provenance metadata.
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5" />{" "}
              <strong>Reusable:</strong> Transparent AI confidence % and
              complete human review audit logs.
            </li>
          </ul>
        </div>

        <div className="bg-env-900 text-white rounded-2xl p-8 shadow-floating space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Hackathon Story
            </span>
            <h2 className="text-2xl font-bold text-white">
              Responsible AI & Human Verification
            </h2>
            <p className="text-xs text-env-200/80 leading-relaxed">
              The AI model serves exclusively as a structured assistant to
              highlight visual signals and calculate risk confidence. Qualified
              human reviewers retain final authority over verified findings.
            </p>
          </div>

          <div className="pt-4 border-t border-env-800 flex items-center justify-between">
            <Link href="/review">
              <Button
                variant="primary"
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-env-950 font-bold"
              >
                Inspect Review Queue
              </Button>
            </Link>
            <Link
              href="/observe"
              className="text-xs text-emerald-300 font-semibold hover:underline"
            >
              Submit Observation →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
