
import { Activity, DollarSign, Waypoints, Gauge, type LucideIcon } from 'lucide-react'

// ─── StatsCard Header ────────────────────────────────────────────────────────
interface StatsCardProps {
    title: string
    value: string
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
                <p className="text-2xl font-extrabold text-slate-900 leading-none">{value}</p>
                {subValue && (
                    <span className="text-xs font-bold text-green-500">{subValue}</span>
                )}
            </div>
            <p className="text-sm text-slate-400 mt-1">{title}</p>
        </div>
    </div>
)

// ─── DashboardStats Component ──────────────────────────────────────────────────
const statsData = [
    { title: 'Total Miles', value: '1,420', subValue: 'Miles', icon: Activity },
    { title: 'Total Expenses', value: '$2,097', icon: DollarSign },
    { title: 'Total Mileage', value: '156', icon: Waypoints },
    { title: 'Rate Per Mileage', value: '10.00', icon: Gauge },
]

export const DashboardStats: React.FC = () => {
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