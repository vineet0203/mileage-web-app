import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  subValue?: string
  icon: LucideIcon
  isLast?: boolean
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subValue, icon: Icon, isLast }) => {
  return (
    <div className={`flex items-center space-x-4 py-4 px-6 ${!isLast ? 'border-r border-slate-200' : ''}`}>
      <div className="w-14 h-14 rounded-xl bg-brand-primary flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-primary/30">
        <Icon className="w-6 h-6 text-white" />
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <p className="text-2xl font-extrabold text-slate-900 leading-none">{value}</p>
          {subValue && (
            <span className="text-xs font-bold text-green-500">{subValue}</span>
          )}
        </div>
        <p className="text-sm text-slate-400 mt-1">{title}</p>
      </div>
    </div>
  )
}

export default StatsCard
