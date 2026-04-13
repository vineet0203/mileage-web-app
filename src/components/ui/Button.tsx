import * as React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "soft" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const baseStyles =
  "inline-flex items-center justify-center text-center whitespace-nowrap transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-brand-primary/30 rounded-full";

const variantStyles = {
  primary:
    "bg-brand-primary text-white hover:bg-brand-dark",
  secondary:
    "bg-brand-sidebar text-white hover:bg-black",
  outline:
    "border border-brand-primary text-brand-primary hover:bg-brand-bg",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100",

  // ⭐ NEW (matches your image)
  soft:
    "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20",

  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

const sizeStyles = {
  sm: "px-3 py-1 text-xs font-medium",
  md: "px-5 py-2 text-sm font-medium",
  lg: "px-8 py-3 text-base font-medium",
  icon: "p-2",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };