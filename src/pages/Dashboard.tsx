import React from 'react'
import { Activity, DollarSign, Waypoints, Gauge } from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import TrackingTable from '../components/dashboard/TrackingTable'

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Miles" 
          value="1,420" 
          subValue="Miles" 
          icon={Activity} 
        />
        <StatsCard 
          title="Total Expenses" 
          value="$2,097" 
          icon={DollarSign} 
        />
        <StatsCard 
          title="Total Mileage" 
          value="156" 
          icon={Waypoints} 
        />
        <StatsCard 
          title="Rate Per Mileage" 
          value="10.00" 
          icon={Gauge} 
        />
      </div>

      {/* Main Table */}
      <TrackingTable />
    </div>
  )
}

export default Dashboard
