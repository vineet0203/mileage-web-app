import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StatsCardProps {
  title: string
  value: string
  subValue?: string
  icon: LucideIcon
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subValue, icon: Icon }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center space-x-5 shadow-sm hover:shadow-md transition-shadow">
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center bg-brand-primary",
        // Using arbitrary hex mapping if needed, but sticking to brand primary for consistency with screenshot icons
      )}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div>
        <div className="flex items-baseline space-x-2">
          <p className="text-2xl font-black text-slate-800">{value}</p>
          {subValue && <p className="text-xs font-bold text-green-500">{subValue}</p>}
        </div>
        <p className="text-sm font-semibold text-slate-400 mt-0.5">{title}</p>
      </div>
    </div>
  )
}

export default StatsCard
