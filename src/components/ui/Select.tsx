import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"
import { Label } from "./Label"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  icon?: React.ReactNode
  options: SelectOption[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, icon, id, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={id} required={props.required}>
            {label}
          </Label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors pointer-events-none">
              {icon}
            </div>
          )}
          <select
            id={id}
            className={cn(
              "flex w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer text-slate-700",
              icon && "pl-10",
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="bg-white text-slate-800 py-2"
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform group-focus-within:rotate-180">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
