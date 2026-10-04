import React from "react";

interface ConfidenceIndicatorProps {
  confidence: number; // 0.0 - 1.0 (e.g. 0.84)
  label?: string;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({
  confidence,
  label = "AI Assessment Confidence",
}) => {
  const percentage = Math.round(confidence * 100);

  let barColor = "bg-env-700";
  if (percentage < 70) barColor = "bg-amber-500";
  if (percentage >= 90) barColor = "bg-emerald-600";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
        <span className="text-textMuted">{label}</span>
        <span className="text-env-900 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-paper-200 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
