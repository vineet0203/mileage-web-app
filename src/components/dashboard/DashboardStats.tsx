
import React from 'react'
import { Activity, DollarSign, Waypoints, Gauge, type LucideIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { tripsApi } from '../../lib/api/trips'

// ─── StatsCard Header ────────────────────────────────────────────────────────
interface StatsCardProps {
    title: string
    value: string | number
    subValue?: string
    icon: LucideIcon
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subValue, icon: Icon }) => (
    <div className="flex items-center space-x-4 py-5 px-6">
        <div className="w-14 h-14 rounded-xl bg-brand-primary flex items-center justify-center shrink-0 shadow-md shadow-brand-primary/30">
            <Icon className="w-6 h-6 text-white" />
        </div>

        <div>
            <div className="flex items-baseline gap-1.5">
                <p className="text-2xl font-extrabold text-slate-900 leading-none">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
                {subValue && (
                    <span className="text-xl font-bold text-brand-primary uppercase tracking-tighter opacity-60">{subValue}</span>
                )}
            </div>
            <p className="text-sm text-slate-400 mt-1">{title}</p>
        </div>
    </div>
)

// ─── DashboardStats Component ──────────────────────────────────────────────────
export const DashboardStats: React.FC = () => {
    const { data: statsResponse, isLoading } = useQuery({
        queryKey: ['tripStats'],
        queryFn: () => tripsApi.getTripStats(),
    })

    const stats = statsResponse?.data

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-slate-50"></div>
                    ))}
                </div>
            </div>
        )
    }

    const statsData = [
        {
            title: 'Total Distance',
            value: `${Number(stats?.total_mileage || 0).toFixed(1)} km`,
            subValue: 'TOTAL',
            icon: Activity
        },
        {
            title: 'Total Income',
            value: `$${Number(stats?.total_income || 0).toFixed(2)}`,
            icon: DollarSign
        },
        {
            title: 'Current Month',
            value: `${Number(stats?.month_distance || 0).toFixed(1)} Km`,
            subValue: `$${Number(stats?.month_income || 0).toFixed(2)}`,
            icon: Waypoints
        },
        {
            title: 'Total Trips',
            value: stats?.total_trips || 0,
            icon: Gauge
        },
    ]

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                {statsData.map((stat) => (
                    <StatsCard
                        key={stat.title}
                        {...stat}
                    />
                ))}
            </div>
        </div>
    )
}