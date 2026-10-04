import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs tracking-wide",
    md: "px-4 py-2 text-sm tracking-wide",
    lg: "px-6 py-3 text-base tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-env-800 text-white hover:bg-env-900 focus:ring-env-700 shadow-sm",
    secondary:
      "bg-river-700 text-white hover:bg-river-800 focus:ring-river-600 shadow-sm",
    outline:
      "border border-borderNeutral text-env-900 bg-white hover:bg-env-50 focus:ring-env-800",
    ghost: "text-env-900 hover:bg-env-50 focus:ring-env-800",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm",
  };

  return (
    <button
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
