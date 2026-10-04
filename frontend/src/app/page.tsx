"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Waves,
  Eye,
  Cpu,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Activity,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Users,
  Award,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ConfidenceIndicator } from "@/components/ui/ConfidenceIndicator";

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-paper-50 via-env-50/30 to-paper-50 border-b border-borderNeutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-env-100/80 border border-env-200 text-env-900 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>IEEE OneAquaHealth Hackathon 2026</span>
                <span className="text-env-500">|</span>
                <span className="text-river-700">
                  Track 3: AI-Supported Assessment
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-env-950 tracking-tight leading-[1.1]">
                Understand what your waterways are telling you.
              </h1>

              <p className="text-lg sm:text-xl text-textMuted font-normal leading-relaxed max-w-2xl">
                HYDREON transforms citizen observations into structured,
                explainable environmental intelligence — helping communities and
                experts identify potential ecosystem stress and prioritize human
                verification.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link href="/map">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-md group"
                  >
                    <span>Explore Stream Intelligence</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href="/observe">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <span>Report an Observation</span>
                  </Button>
                </Link>
              </div>

              {/* Key Scientific Safeguards */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-borderNeutral text-xs text-textMuted">
                <div>
                  <span className="font-semibold text-env-900 block">
                    Structured AI
                  </span>
                  Explicit signal evidence
                </div>
                <div>
                  <span className="font-semibold text-env-900 block">
                    Human-in-the-Loop
                  </span>
                  Expert verification review
                </div>
                <div>
                  <span className="font-semibold text-env-900 block">
                    One Health
                  </span>
                  Ecosystem-to-human links
                </div>
              </div>
            </div>

            {/* Right Editorial Photography Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-floating border border-borderNeutral bg-white">
                <div className="relative h-80 sm:h-96 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80"
                    alt="Citizen science researcher observing an urban stream"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-env-950/80 via-env-950/20 to-transparent" />

                  {/* Overlaid Intelligence Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-borderNeutral/80 shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-env-900">
                        Riverside Site 01 (STR-RIV-01)
                      </span>
                      <StatusBadge status="ATTENTION_RECOMMENDED" />
                    </div>
                    <p className="text-xs text-textMuted line-clamp-2 mb-3">
                      Visual analysis detected milky surface discoloration &
                      accumulated foamraft downstream of urban outfall.
                    </p>
                    <ConfidenceIndicator
                      confidence={0.84}
                      label="AI Assessment Confidence"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full rounded-2xl bg-river-100 border border-river-200" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <h2 className="text-xs font-bold text-river-700 uppercase tracking-widest">
            The Environmental Challenge
          </h2>
          <h3 className="text-3xl font-extrabold text-env-950 tracking-tight sm:text-4xl">
            Urban streams face rapid stress, but traditional monitoring is
            constrained.
          </h3>
          <p className="text-base text-textMuted leading-relaxed">
            Freshwater ecosystems are vital sentinels for community
            environmental health. However, static hardware sensors are expensive
            and limited in coverage, while raw citizen observations often lack
            structured validation to prompt swift expert review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-white border border-borderNeutral shadow-card space-y-4">
            <div className="w-12 h-12 rounded-lg bg-red-50 text-red-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-env-950">
              1. Delayed Problem Identification
            </h4>
            <p className="text-sm text-textMuted leading-relaxed">
              Localized pollution discharges or algal blooms often go unverified
              until severe ecological damage or odor complaints occur.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-borderNeutral shadow-card space-y-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-env-950">
              2. Raw Unstructured Data
            </h4>
            <p className="text-sm text-textMuted leading-relaxed">
              Citizens notice discoloration, odor, or missing wildlife, but lack
              a standardized framework to translate observations into action.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-white border border-borderNeutral shadow-card space-y-4">
            <div className="w-12 h-12 rounded-lg bg-env-50 text-env-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-env-950">
              3. Unchecked AI Overreach
            </h4>
            <p className="text-sm text-textMuted leading-relaxed">
              Black-box AI tools often make unsupported diagnoses. HYDREON
              safeguards integrity by keeping expert humans in the review loop.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW HYDREON WORKS (5-STEP CORE JOURNEY) */}
      <section className="bg-env-900 text-white py-20 border-y border-env-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              End-to-End Workflow
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              From Citizen Observation to Verified Environmental Intelligence
            </h2>
            <p className="text-sm text-env-200/80">
              A responsible, transparent pipeline ensuring every observation is
              structured, evaluated, explained, and verified.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "OBSERVE",
                desc: "Citizen submits photo, stream location, water appearance, odor, and wildlife indicators.",
                icon: Eye,
              },
              {
                step: "02",
                title: "ANALYZE",
                desc: "Multimodal engine structures indicators into standardized JSON payload.",
                icon: Cpu,
              },
              {
                step: "03",
                title: "EXPLAIN",
                desc: "System generates explicit signal evidence, confidence %, and scientific uncertainties.",
                icon: Activity,
              },
              {
                step: "04",
                title: "REVIEW",
                desc: "Expert reviewer verifies, modifies, or confirms assessment in review queue.",
                icon: ShieldCheck,
              },
              {
                step: "05",
                title: "ACT",
                desc: "Verified finding updates stream intelligence map and community trend insights.",
                icon: MapPin,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-env-950/60 p-6 rounded-xl border border-env-800 space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {item.step}
                  </span>
                  <item.icon className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="font-bold text-base tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-env-200/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CRITICAL SCIENTIFIC DISTINCTION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-borderNeutral p-8 md:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-river-700 uppercase tracking-wider">
                Explainability & Integrity
              </span>
              <h2 className="text-3xl font-bold text-env-950 tracking-tight">
                Distinguishing Observation from Verified Finding
              </h2>
              <p className="text-sm text-textMuted leading-relaxed">
                HYDREON never presents an AI assessment as a final scientific
                truth. Every entry clearly demarcates four distinct operational
                states:
              </p>
              <ul className="space-y-2.5 text-xs font-medium text-textMain">
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-env-700 mr-2" />{" "}
                  <strong>OBSERVATION:</strong> Raw data submitted by citizen
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-env-700 mr-2" />{" "}
                  <strong>AI INTERPRETATION:</strong> Structured multimodal
                  output
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-env-700 mr-2" />{" "}
                  <strong>POTENTIAL SIGNAL:</strong> System risk calculation &
                  evidence
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-env-700 mr-2" />{" "}
                  <strong>VERIFIED FINDING:</strong> Certified human expert
                  review
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 bg-paper-50 p-6 rounded-xl border border-borderNeutral space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-borderNeutral">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold font-mono text-env-900">
                    OBS-1001
                  </span>
                  <StatusBadge status="ATTENTION_RECOMMENDED" />
                </div>
                <span className="text-xs text-textMuted">
                  AI Confidence: 84%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded border border-borderNeutral">
                  <span className="text-textMuted block font-medium mb-1">
                    Citizen Observation
                  </span>
                  <p className="font-semibold text-env-900">
                    Grayish-white water & foam near north bank
                  </p>
                </div>

                <div className="p-3 bg-white rounded border border-borderNeutral">
                  <span className="text-textMuted block font-medium mb-1">
                    Detected Potential Signal
                  </span>
                  <p className="font-semibold text-amber-800">
                    Ecosystem Stress (84% match)
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900">
                <strong className="block font-semibold mb-1">
                  Important Scientific Limitation
                </strong>
                Visual evidence indicates potential outfall discharge. Chemical
                & bacterial pathogen safety cannot be confirmed without field
                lab samples. Expert verification recommended.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ONE HEALTH PERSPECTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-river-700 uppercase tracking-widest">
            OneAquaHealth Vision
          </span>
          <h2 className="text-3xl font-extrabold text-env-950 tracking-tight">
            The One Health Connection
          </h2>
          <p className="text-sm text-textMuted">
            Healthy freshwater streams protect biodiversity and community
            wellness. HYDREON maps multi-tiered ecosystem relationships
            responsibly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[
            {
              level: "ECOSYSTEM",
              title: "Riparian & Stream Flow",
              desc: "Discoloration & physical stress alter water clarity and habitat.",
              icon: Waves,
              color: "border-env-600 bg-env-50/50",
            },
            {
              level: "ANIMAL",
              title: "Aquatic Wildlife Health",
              desc: "Reduced oxygen or toxic algae impacts fish & bioindicator larvae.",
              icon: Activity,
              color: "border-river-600 bg-river-50/50",
            },
            {
              level: "HUMAN",
              title: "Community Contact",
              desc: "Recreational awareness & direct contact risk prevention.",
              icon: Users,
              color: "border-amber-600 bg-amber-50/50",
            },
            {
              level: "COMMUNITY",
              title: "Prioritized Response",
              desc: "Municipal stewards prioritize field verification & intervention.",
              icon: ShieldCheck,
              color: "border-emerald-600 bg-emerald-50/50",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl border ${item.color} shadow-sm space-y-3`}
            >
              <item.icon className="w-8 h-8 mx-auto text-env-800" />
              <span className="text-[10px] font-bold tracking-widest text-textMuted uppercase block">
                {item.level}
              </span>
              <h3 className="font-bold text-base text-env-950">{item.title}</h3>
              <p className="text-xs text-textMuted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. IMPACT & DEMO CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-env-900 rounded-2xl p-8 sm:p-12 text-center text-white space-y-6 shadow-floating">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-env-800 text-emerald-300 text-xs font-medium">
            <Award className="w-4 h-4 mr-1 text-emerald-400" />
            Built for OneAquaHealth Challenge 2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto">
            Ready to explore explainable stream intelligence?
          </h2>
          <p className="text-sm text-env-200/80 max-w-xl mx-auto leading-relaxed">
            Submit a live stream observation, explore interactive spatial maps,
            or inspect the expert human-in-the-loop review queue.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/observe">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-env-950 font-bold"
              >
                Report Observation
              </Button>
            </Link>
            <Link href="/review">
              <button className="w-full sm:w-auto px-6 py-3 text-base font-semibold tracking-wide rounded-lg border-2 border-emerald-400 text-white bg-env-800/80 hover:bg-emerald-500 hover:text-env-950 transition-all shadow-sm">
                Open Expert Review Queue
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
