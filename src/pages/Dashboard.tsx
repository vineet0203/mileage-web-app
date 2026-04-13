import React from 'react'
import TrackingTable from '../components/dashboard/TrackingTable'
import { DashboardStats } from '../components/dashboard/DashboardStats'

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      <DashboardStats />
      <TrackingTable />
    </div>
  )
}

export default Dashboard
