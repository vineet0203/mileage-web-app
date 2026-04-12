import * as React from "react"
import { cn } from "../../lib/utils"
import { Label } from "./Label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && id && <Label htmlFor={id}>{label}</Label>}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={id}
            className={cn(
              "flex w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
