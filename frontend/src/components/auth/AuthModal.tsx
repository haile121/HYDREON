"use client";

import React, { useState } from "react";
import {
  X,
  User,
  ShieldCheck,
  Mail,
  Lock,
  CheckCircle2,
  Sparkles,
  Building2,
} from "lucide-react";
import { Button } from "../ui/Button";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: {
    name: string;
    role: "citizen" | "expert";
    email: string;
  }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"citizen" | "expert">("expert");
  const [email, setEmail] = useState("expert.reviewer@oneaquahealth.org");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Dr. Elena Vance");
  const [agency, setAgency] = useState("State Environmental Protection Agency");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess({
        name:
          mode === "signup"
            ? name
            : role === "expert"
              ? "Dr. Elena Vance"
              : "Alex Rivera",
        role,
        email,
      });
      setIsSuccess(false);
      onClose();
    }, 800);
  };

  const handleQuickDemo = (userRole: "citizen" | "expert") => {
    setRole(userRole);
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess({
        name:
          userRole === "expert"
            ? "Dr. Elena Vance (Verified Senior Hydrologist)"
            : "Alex Rivera (Citizen Scientist)",
        role: userRole,
        email:
          userRole === "expert"
            ? "elena.vance@epa.gov"
            : "alex.rivera@community.org",
      });
      setIsSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-env-950/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-floating border border-borderNeutral overflow-hidden space-y-6 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-textMuted hover:text-env-950 hover:bg-paper-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 text-center">
          <div className="w-10 h-10 rounded-full bg-env-50 text-env-800 border border-env-200 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-5 h-5 text-river-700" />
          </div>
          <h2 className="text-2xl font-extrabold text-env-950 tracking-tight">
            {mode === "signin" ? "Sign In to HYDREON" : "Create Account"}
          </h2>
          <p className="text-xs text-textMuted max-w-xs mx-auto">
            Access citizen field reports or certified human-in-the-loop expert
            review controls.
          </p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="p-3 bg-paper-50 rounded-xl border border-borderNeutral space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-env-900">
            <span>⚡ Quick Hackathon Demo Sign-In:</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo("expert")}
              className="px-2.5 py-1.5 bg-river-700 text-white rounded-lg text-xs font-semibold hover:bg-river-800 transition-colors flex items-center justify-center space-x-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Expert Role
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo("citizen")}
              className="px-2.5 py-1.5 bg-paper-200 text-env-900 rounded-lg text-xs font-semibold hover:bg-paper-300 transition-colors flex items-center justify-center space-x-1 border border-borderNeutral"
            >
              <User className="w-3.5 h-3.5 mr-1 text-river-700" />
              Citizen Role
            </button>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-paper-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole("citizen")}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              role === "citizen"
                ? "bg-white text-env-950 shadow-sm"
                : "text-textMuted"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Citizen Reporter</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("expert")}
            className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              role === "expert"
                ? "bg-env-800 text-white shadow-sm"
                : "text-textMuted"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Certified Expert</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-textMain mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-textMuted absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  className="w-full pl-9 pr-3 py-2 bg-paper-50 border border-borderNeutral rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-env-700"
                />
              </div>
            </div>
          )}

          {role === "expert" && mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-textMain mb-1">
                Agency / Organization Affiliation
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-textMuted absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="State Environmental Protection Agency"
                  className="w-full pl-9 pr-3 py-2 bg-paper-50 border border-borderNeutral rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-env-700"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-textMain mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-textMuted absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-paper-50 border border-borderNeutral rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-env-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-textMain mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-textMuted absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-paper-50 border border-borderNeutral rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-env-700"
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="md"
            className="w-full mt-2"
            type="submit"
          >
            {isSuccess ? (
              <span className="flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-400" />{" "}
                Authenticated!
              </span>
            ) : mode === "signin" ? (
              `Sign In as ${role === "expert" ? "Expert Reviewer" : "Citizen Observer"}`
            ) : (
              "Create Account & Authenticate"
            )}
          </Button>
        </form>

        {/* Toggle Mode Footer */}
        <div className="pt-2 text-center text-xs text-textMuted border-t border-borderNeutral">
          {mode === "signin" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-bold text-river-700 hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="font-bold text-river-700 hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
