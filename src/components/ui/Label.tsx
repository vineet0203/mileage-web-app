import * as React from "react"
import { cn } from "../../lib/utils"

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-semibold text-slate-700 mb-2 block leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1 italic font-black">*</span>}
      </label>
    )
  }
)
Label.displayName = "Label"

export { Label }
