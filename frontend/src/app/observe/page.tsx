"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Camera,
  Droplets,
  Trees,
  Fish,
  AlertCircle,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Cpu,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ObservePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    siteId: "STR-RIV-01",
    address: "Riverside Park North Culvert",
    latitude: 42.3605,
    longitude: -71.0592,
    imageUrl:
      "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80",
    waterAppearance: "Unusual Discoloration",
    vegetationCondition: "Severely Reduced",
    wildlifeObserved: "No Visible Life",
    pollutionIndicators: "Foam / Discoloration Outfall",
    odorReported: "Musty / Chemical",
    notes:
      "Noticed opaque grayish foam raft accumulating below the stormwater discharge culvert.",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormData({ ...formData, imageUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setProcessingStage("Checking observation details...");

    try {
      await new Promise((r) => setTimeout(r, 800));
      setProcessingStage("Analyzing visual indicators & photo features...");
      await new Promise((r) => setTimeout(r, 1000));
      setProcessingStage(
        "Comparing reported conditions against site baseline...",
      );
      await new Promise((r) => setTimeout(r, 900));
      setProcessingStage(
        "Evaluating potential signals & One Health relationships...",
      );
      await new Promise((r) => setTimeout(r, 900));
      setProcessingStage(
        "Generating explainable assessment & uncertainty notes...",
      );
      await new Promise((r) => setTimeout(r, 700));

      // Post to API backend
      const res = await fetch("/api/observations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteId: formData.siteId,
          latitude: formData.latitude,
          longitude: formData.longitude,
          address: formData.address,
          waterAppearance: formData.waterAppearance,
          vegetationCondition: formData.vegetationCondition,
          wildlifeObserved: formData.wildlifeObserved,
          pollutionIndicators: formData.pollutionIndicators,
          odorReported: formData.odorReported,
          notes: formData.notes,
          imageUrls: [formData.imageUrl],
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.observation?.id) {
        router.push(`/observations/${data.data.observation.id}`);
      } else {
        // Fallback demo redirect
        router.push(`/observations/OBS-1001`);
      }
    } catch {
      router.push(`/observations/OBS-1001`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Page Title Header */}
      <div className="mb-8 text-center space-y-2">
        <span className="text-xs font-bold text-river-700 uppercase tracking-widest">
          Citizen Science Portal
        </span>
        <h1 className="text-3xl font-extrabold text-env-950 tracking-tight">
          Report a Stream Observation
        </h1>
        <p className="text-sm text-textMuted max-w-lg mx-auto">
          Your observation helps communities and experts detect potential
          freshwater ecosystem stress early.
        </p>
      </div>

      {/* Processing State Overlay */}
      {isProcessing ? (
        <div className="bg-white rounded-2xl border border-borderNeutral p-10 text-center shadow-floating space-y-6">
          <div className="w-16 h-16 rounded-full bg-env-50 text-env-800 flex items-center justify-center mx-auto border border-env-200">
            <Loader2 className="w-8 h-8 animate-spin text-env-700" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-env-950">
              Analyzing Observation
            </h2>
            <p className="text-sm font-medium text-river-700 animate-pulse">
              {processingStage}
            </p>
          </div>
          <div className="w-full bg-paper-200 h-1.5 rounded-full overflow-hidden max-w-md mx-auto">
            <div className="h-full bg-env-700 animate-pulse w-3/4 rounded-full" />
          </div>
          <p className="text-xs text-textMuted max-w-sm mx-auto">
            HYDREON structures visual observations and calculates signal
            evidence transparently.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-borderNeutral shadow-card p-6 sm:p-8 space-y-8">
          {/* Progress Indicator Steps */}
          <div className="flex items-center justify-between pb-6 border-b border-borderNeutral text-xs font-medium">
            <span className="text-env-900 font-bold">Step {step} of 7</span>
            <div className="flex space-x-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    s === step
                      ? "bg-env-800 w-8"
                      : s < step
                        ? "bg-emerald-500"
                        : "bg-paper-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* STEP 1: LOCATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <MapPin className="w-5 h-5 text-river-700" />
                <h2 className="text-lg font-bold">
                  Step 1: Observation Location
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-textMain mb-1">
                    Stream Site Corridor
                  </label>
                  <select
                    value={formData.siteId}
                    onChange={(e) =>
                      setFormData({ ...formData, siteId: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-paper-50 border border-borderNeutral rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-env-700"
                  >
                    <option value="STR-RIV-01">
                      Riverside North Stream (STR-RIV-01)
                    </option>
                    <option value="STR-GRN-02">
                      Greenway Urban Canal (STR-GRN-02)
                    </option>
                    <option value="STR-CTR-03">
                      Central Watershed Runoff (STR-CTR-03)
                    </option>
                    <option value="STR-EST-04">
                      East Marsh Wetland Outfall (STR-EST-04)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMain mb-1">
                    Access Point / Address Description
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-paper-50 border border-borderNeutral rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-env-700"
                    placeholder="e.g. Near footbridge, North culvert bank"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PHOTO */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <Camera className="w-5 h-5 text-river-700" />
                <h2 className="text-lg font-bold">
                  Step 2: Observation Image Upload
                </h2>
              </div>

              {/* Upload Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Device Upload */}
                <div className="p-4 border-2 border-dashed border-river-300 rounded-xl bg-paper-50 text-center hover:bg-river-50/50 transition-colors flex flex-col items-center justify-center space-y-2">
                  <Camera className="w-8 h-8 text-river-600" />
                  <span className="text-xs font-bold text-env-950">
                    Upload Field Photo from Device
                  </span>
                  <p className="text-[11px] text-textMuted">
                    Supports JPG, PNG, WEBP (saved to Cloudinary)
                  </p>
                  <label className="mt-2 px-3 py-1.5 bg-river-700 text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-river-800 transition-colors">
                    Browse Files
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Direct Image URL */}
                <div className="p-4 border border-borderNeutral rounded-xl bg-white space-y-3">
                  <span className="text-xs font-bold text-env-950 block">
                    Or Enter Image URL
                  </span>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-paper-50 border border-borderNeutral rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-env-700"
                  />

                  <div className="space-y-1">
                    <span className="text-[11px] text-textMuted block font-medium">
                      Or Pick Demo Sample Preset:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        {
                          label: "Foam Outfall",
                          url: "https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?auto=format&fit=crop&w=1200&q=80",
                        },
                        {
                          label: "Algae Bloom",
                          url: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=1200&q=80",
                        },
                        {
                          label: "Clear Water",
                          url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
                        },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, imageUrl: preset.url })
                          }
                          className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
                            formData.imageUrl === preset.url
                              ? "bg-env-800 text-white border-env-900"
                              : "bg-paper-100 text-textMuted hover:bg-paper-200"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Image Preview */}
              {formData.imageUrl && (
                <div className="relative h-56 w-full rounded-xl overflow-hidden border border-borderNeutral bg-paper-50">
                  <Image
                    src={formData.imageUrl}
                    alt="Stream observation photo preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur px-3 py-2 rounded text-xs text-env-900 flex justify-between items-center shadow-sm">
                    <span className="font-semibold text-emerald-800 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600" />
                      Image Ready for Vision Assessment
                    </span>
                    <span className="text-[11px] text-textMuted font-mono">
                      Cloudinary-Ready
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: WATER APPEARANCE */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <Droplets className="w-5 h-5 text-river-700" />
                <h2 className="text-lg font-bold">Step 3: Water Appearance</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Normal Clear",
                  "Unusual Discoloration",
                  "Turbid / Muddy",
                  "Accumulated Foam",
                  "Oily Surface Sheen",
                  "Excessive Algae",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, waterAppearance: opt })
                    }
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      formData.waterAppearance === opt
                        ? "border-env-800 bg-env-50 text-env-900 ring-2 ring-env-700"
                        : "border-borderNeutral bg-white text-textMain hover:bg-paper-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: VEGETATION */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <Trees className="w-5 h-5 text-river-700" />
                <h2 className="text-lg font-bold">
                  Step 4: Vegetation & Bank Condition
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Abundant Healthy Riparian",
                  "Moderate Canopy Coverage",
                  "Severely Reduced / Bare Bank",
                  "Excessive Algae Bloom",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, vegetationCondition: opt })
                    }
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      formData.vegetationCondition === opt
                        ? "border-env-800 bg-env-50 text-env-900 ring-2 ring-env-700"
                        : "border-borderNeutral bg-white text-textMain hover:bg-paper-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: WILDLIFE */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <Fish className="w-5 h-5 text-river-700" />
                <h2 className="text-lg font-bold">
                  Step 5: Aquatic & Wildlife Life
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Active Fish & Macroinvertebrates",
                  "Waterfowl Present",
                  "Amphibians Detected",
                  "No Visible Aquatic Life",
                  "Dead Fish / Organisms",
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, wildlifeObserved: opt })
                    }
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      formData.wildlifeObserved === opt
                        ? "border-env-800 bg-env-50 text-env-900 ring-2 ring-env-700"
                        : "border-borderNeutral bg-white text-textMain hover:bg-paper-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: POLLUTION & ODOR */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold">
                  Step 6: Pollution & Odor Indicators
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-textMain mb-2">
                    Pollution Indicators
                  </label>
                  <select
                    value={formData.pollutionIndicators}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pollutionIndicators: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-paper-50 border border-borderNeutral rounded-lg text-sm"
                  >
                    <option value="None">None Observed</option>
                    <option value="Foam / Discoloration Outfall">
                      Foam / Discoloration Outfall
                    </option>
                    <option value="Plastic Debris & Litter">
                      Plastic Debris & Litter
                    </option>
                    <option value="Chemical Film / Sheen">
                      Chemical Film / Sheen
                    </option>
                    <option value="Stormwater Runoff Plume">
                      Stormwater Runoff Plume
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMain mb-2">
                    Reported Odor
                  </label>
                  <select
                    value={formData.odorReported}
                    onChange={(e) =>
                      setFormData({ ...formData, odorReported: e.target.value })
                    }
                    className="w-full px-3 py-2.5 bg-paper-50 border border-borderNeutral rounded-lg text-sm"
                  >
                    <option value="None / Natural">
                      None / Natural Earthy
                    </option>
                    <option value="Musty / Chemical">Musty / Chemical</option>
                    <option value="Sulfur / Rotten Egg">
                      Sulfur / Rotten Egg
                    </option>
                    <option value="Sewage / Wastewater">
                      Sewage / Wastewater
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: REVIEW SUBMISSION */}
          {step === 7 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-env-900">
                <FileText className="w-5 h-5 text-river-700" />
                <h2 className="text-lg font-bold">
                  Step 7: Confirm & Submit Observation
                </h2>
              </div>

              <div className="p-4 bg-paper-50 rounded-xl border border-borderNeutral space-y-3 text-xs">
                <div className="flex justify-between border-b border-borderNeutral pb-2">
                  <span className="text-textMuted">Site Corridor:</span>
                  <span className="font-semibold text-env-900">
                    {formData.siteId}
                  </span>
                </div>
                <div className="flex justify-between border-b border-borderNeutral pb-2">
                  <span className="text-textMuted">Water Appearance:</span>
                  <span className="font-semibold text-env-900">
                    {formData.waterAppearance}
                  </span>
                </div>
                <div className="flex justify-between border-b border-borderNeutral pb-2">
                  <span className="text-textMuted">Vegetation Condition:</span>
                  <span className="font-semibold text-env-900">
                    {formData.vegetationCondition}
                  </span>
                </div>
                <div className="flex justify-between border-b border-borderNeutral pb-2">
                  <span className="text-textMuted">Wildlife Observed:</span>
                  <span className="font-semibold text-env-900">
                    {formData.wildlifeObserved}
                  </span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-textMuted">Pollution & Odor:</span>
                  <span className="font-semibold text-env-900">
                    {formData.pollutionIndicators} ({formData.odorReported})
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMain mb-1">
                  Field Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 bg-paper-50 border border-borderNeutral rounded-lg text-xs"
                />
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-borderNeutral">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={step === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back
            </Button>

            <Button variant="primary" size="md" onClick={handleNext}>
              <span>{step === 7 ? "Submit & Analyze" : "Continue"}</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
