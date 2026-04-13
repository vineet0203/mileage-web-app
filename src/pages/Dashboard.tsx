import React from 'react'
import TrackingTable from '../components/dashboard/TrackingTable'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import Search from '../components/ui/Search'

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Searching employees:', query)
    // Filter logic would go here if we had the data in this component
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Search 
          placeholder="Search employees..." 
          onSearch={handleSearch}
          className="w-full md:max-w-md"
        />
      </div>
      <DashboardStats />
      <TrackingTable />
    </div>
  )
}

export default Dashboard
