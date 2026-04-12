import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-primary text-white hover:bg-brand-dark shadow-lg shadow-brand-primary/25',
      secondary: 'bg-brand-sidebar text-white hover:bg-black',
      outline: 'bg-transparent border-2 border-brand-primary text-brand-primary hover:bg-brand-bg',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-6 py-3 rounded-xl font-bold',
      lg: 'px-8 py-4 text-lg rounded-xl font-bold',
      icon: 'p-2 rounded-lg',
    }

    return (
      <button
        className={cn(
          'inline-flex items-center justify-center transition-all transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-brand-primary/20',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
