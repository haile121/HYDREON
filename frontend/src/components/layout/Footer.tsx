import React from "react";
import Link from "next/link";
import { Waves, Shield, ExternalLink, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-env-950 text-white border-t border-env-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-env-950 flex items-center justify-center font-bold shadow-sm">
                <Waves className="w-4 h-4 text-env-950" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                HYDREON
              </span>
            </div>
            <p className="text-xs text-env-200/70 leading-relaxed">
              AI-supported environmental intelligence platform translating
              citizen stream observations into explainable, expert-verified
              ecosystem risk signals.
            </p>
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-env-900 border border-env-800 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>IEEE OneAquaHealth Hackathon 2026</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-env-200/80 font-medium">
              <li>
                <Link
                  href="/map"
                  className="hover:text-emerald-300 transition-colors flex items-center"
                >
                  Stream Intelligence Map
                </Link>
              </li>
              <li>
                <Link
                  href="/observe"
                  className="hover:text-emerald-300 transition-colors flex items-center"
                >
                  Citizen Field Observation
                </Link>
              </li>
              <li>
                <Link
                  href="/review"
                  className="hover:text-emerald-300 transition-colors flex items-center"
                >
                  Expert Verification Queue
                </Link>
              </li>
              <li>
                <Link
                  href="/architecture"
                  className="hover:text-emerald-300 transition-colors flex items-center"
                >
                  One Health Interoperability
                </Link>
              </li>
            </ul>
          </div>

          {/* Standards & Governance */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              Scientific Integrity
            </h4>
            <ul className="space-y-2 text-xs text-env-200/80 font-medium">
              <li className="flex items-center text-env-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" />
                Human-in-the-Loop Governance
              </li>
              <li className="flex items-center text-env-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" />
                Multimodal GPT-4o Vision Engine
              </li>
              <li className="flex items-center text-env-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" />
                Immutable PostgreSQL Audit Log
              </li>
              <li className="flex items-center text-env-200/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5 flex-shrink-0" />
                Certified PDF Inspection Reports
              </li>
            </ul>
          </div>

          {/* System Status */}
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
              System Network Status
            </h4>
            <div className="p-3 bg-env-900 rounded-xl border border-env-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-env-200">
                <span className="text-[11px]">Database (Supabase)</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  ONLINE 🟢
                </span>
              </div>
              <div className="flex items-center justify-between text-env-200">
                <span className="text-[11px]">AI Model (GPT-4o)</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  READY ⚡
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-6 border-t border-env-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-env-300/60 gap-4">
          <p>
            © 2026 HYDREON StreamGuard AI. Built for IEEE OneAquaHealth
            Hackathon.
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms of Protocol
            </span>
            <span className="hover:text-white transition-colors cursor-pointer font-mono">
              v1.4-production
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
