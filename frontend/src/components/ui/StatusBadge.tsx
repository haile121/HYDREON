import React from "react";
import { AlertTriangle, CheckCircle2, Eye, Info, Clock } from "lucide-react";

export interface StatusBadgeProps {
  status: string; // VERIFIED | IN_REVIEW | SUBMITTED | ATTENTION_RECOMMENDED | HIGH_PRIORITY_SIGNAL | NO_CONCERN
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
}) => {
  let bg = "bg-gray-100 text-gray-800 border-gray-200";
  let icon = <Info className="w-3.5 h-3.5 mr-1" />;
  let label = status;

  switch (status.toUpperCase()) {
    case "VERIFIED":
      bg = "bg-emerald-50 text-emerald-800 border-emerald-200";
      icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />;
      label = "Verified Finding";
      break;
    case "IN_REVIEW":
      bg = "bg-amber-50 text-amber-800 border-amber-200";
      icon = <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" />;
      label = "In Expert Review";
      break;
    case "ATTENTION_RECOMMENDED":
      bg = "bg-amber-50 text-amber-900 border-amber-300";
      icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-amber-600" />;
      label = "Attention Recommended";
      break;
    case "HIGH_PRIORITY_SIGNAL":
      bg = "bg-red-50 text-red-800 border-red-200";
      icon = <AlertTriangle className="w-3.5 h-3.5 mr-1 text-red-600" />;
      label = "High Priority Signal";
      break;
    case "NO_CONCERN":
      bg = "bg-env-50 text-env-800 border-env-200";
      icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-env-600" />;
      label = "Normal Baseline";
      break;
    case "SUBMITTED":
      bg = "bg-blue-50 text-blue-800 border-blue-200";
      icon = <Eye className="w-3.5 h-3.5 mr-1 text-blue-600" />;
      label = "Citizen Submission";
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border tracking-tight ${bg}`}
    >
      {showIcon && icon}
      {label}
    </span>
  );
};
