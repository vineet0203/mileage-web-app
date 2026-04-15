import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "../../lib/utils"
import { Label } from "./Label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPassword = type === "password"
    const inputType = isPassword ? (showPassword ? "text" : "password") : type

    return (
      <div className="space-y-2">
        {label && id && <Label htmlFor={id}>{label}</Label>}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors z-10">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            id={id}
            className={cn(
              "flex w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all disabled:cursor-not-allowed disabled:opacity-50",
              // Fix autofill background: override webkit's forced yellow/grey background
              "[&:-webkit-autofill]:bg-slate-50 [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(248,250,252)] [&:-webkit-autofill]:[-webkit-text-fill-color:#0f172a]",
              icon && "pl-10",
              isPassword && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
