import React from 'react'
import { Activity, DollarSign, Waypoints, Gauge } from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import TrackingTable from '../components/dashboard/TrackingTable'

const statsData = [
  { title: 'Total Miles',     value: '1,420', subValue: 'Miles', icon: Activity  },
  { title: 'Total Expenses',  value: '$2,097',                   icon: DollarSign },
  { title: 'Total Mileage',   value: '156',                      icon: Waypoints  },
  { title: 'Rate Per Mileage',value: '10.00',                    icon: Gauge      },
]

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Stats Row Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-4 divide-x divide-slate-200">
          {statsData.map((stat, i) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              subValue={stat.subValue}
              icon={stat.icon}
              isLast={i === statsData.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Main Table */}
      <TrackingTable />
    </div>
  )
}

export default Dashboard
