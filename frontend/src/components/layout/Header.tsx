"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Waves,
  MapPin,
  ClipboardList,
  ShieldCheck,
  Cpu,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "../ui/Button";
import { StreamAnomalyBanner } from "../ui/StreamAnomalyBanner";
import { AuthModal } from "../auth/AuthModal";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: "citizen" | "expert";
    email: string;
  } | null>(null);

  return (
    <>
      <StreamAnomalyBanner />
      <HeaderNavigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        authModalOpen={authModalOpen}
        setAuthModalOpen={setAuthModalOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </>
  );
};

const HeaderNavigation: React.FC<{
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (v: boolean) => void;
  currentUser: any;
  setCurrentUser: (u: any) => void;
}> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  authModalOpen,
  setAuthModalOpen,
  currentUser,
  setCurrentUser,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-paper-50/95 backdrop-blur border-b border-borderNeutral transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3.5">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-env-800 text-white flex items-center justify-center shadow-sm group-hover:bg-env-900 transition-colors">
            <Waves className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-tight text-env-900 font-sans">
                HYDREON
              </span>
              <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-river-50 text-river-700 border border-river-200 rounded tracking-wider">
                IEEE OneAquaHealth
              </span>
            </div>
            <p className="text-xs text-textMuted font-medium tracking-tight">
              StreamGuard AI Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/map"
            className="flex items-center text-sm font-medium text-textMuted hover:text-env-800 transition-colors"
          >
            <MapPin className="w-4 h-4 mr-1.5 text-river-700" />
            Stream Map
          </Link>

          <Link
            href="/review"
            className="flex items-center text-sm font-medium text-textMuted hover:text-env-800 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 mr-1.5 text-amber-600" />
            Expert Review Queue
          </Link>

          <Link
            href="/sites/STR-RIV-01"
            className="flex items-center text-sm font-medium text-textMuted hover:text-env-800 transition-colors"
          >
            <ClipboardList className="w-4 h-4 mr-1.5 text-env-600" />
            Site Trends
          </Link>

          <Link
            href="/architecture"
            className="flex items-center text-sm font-medium text-textMuted hover:text-env-800 transition-colors"
          >
            <Cpu className="w-4 h-4 mr-1.5 text-textMuted" />
            Architecture
          </Link>
        </nav>

        {/* Auth & Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center space-x-2 bg-paper-200/80 px-3 py-1.5 rounded-xl border border-borderNeutral text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-env-950 truncate max-w-[150px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-river-700 border border-borderNeutral uppercase font-bold">
                {currentUser.role}
              </span>
              <button
                onClick={() => setCurrentUser(null)}
                className="text-textMuted hover:text-red-600 ml-1"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-bold text-env-900 bg-white border border-borderNeutral rounded-lg hover:bg-paper-100 transition-colors flex items-center space-x-1.5 shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-river-700" />
              <span>Sign In / Expert Access</span>
            </button>
          )}

          <Link href="/observe">
            <Button variant="primary" size="sm" className="shadow-sm">
              Report Observation
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-textMuted hover:text-env-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-borderNeutral px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link
            href="/map"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center py-2 text-sm font-medium text-textMain"
          >
            <MapPin className="w-4 h-4 mr-2 text-river-700" />
            Stream Intelligence Map
          </Link>
          <Link
            href="/review"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center py-2 text-sm font-medium text-textMain"
          >
            <ShieldCheck className="w-4 h-4 mr-2 text-amber-600" />
            Expert Review Queue
          </Link>
          <Link
            href="/sites/STR-RIV-01"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center py-2 text-sm font-medium text-textMain"
          >
            <ClipboardList className="w-4 h-4 mr-2 text-env-600" />
            Site Trends
          </Link>
          <Link
            href="/architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center py-2 text-sm font-medium text-textMain"
          >
            <Cpu className="w-4 h-4 mr-2 text-textMuted" />
            Architecture & One Health
          </Link>
          <div className="pt-2">
            <Link href="/observe" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Report Observation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
