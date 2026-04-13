import React, { useState } from 'react'
import { cn } from '../../lib/utils'
import DataTable, { type ColumnDef } from '../ui/DataTable'
import TripDetailsModal from './TripDetailsModal'
import { Button } from '../ui/Button'

// ─── Types ────────────────────────────────────────────────────────────────────
interface TrackingRow extends Record<string, unknown> {
  id: string
  date: string
  employee: string
  employeeImg: string
  jobName: string
  totalMileage: number
  amount: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

// ─── Mock Data (50 rows) ─────────────────────────────────────────────────────
const ALL_DATA: TrackingRow[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  date: '15-02-2026',
  employee: 'Jhon Smith',
  employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon',
  jobName: 'Ac Repair at Residence',
  totalMileage: 15,
  amount: '$30:00',
  status: 'Pending' as const,
}))

// ─── Component ────────────────────────────────────────────────────────────────
const TrackingTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen]   = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<TrackingRow | null>(null)

  // Per-row approve/reject override
  const [rowStatuses, setRowStatuses]   = useState<Record<string, TrackingRow['status']>>({})

  const getStatus = (row: TrackingRow): TrackingRow['status'] =>
    rowStatuses[row.id] ?? row.status

  const handleApprove = (id: string) =>
    setRowStatuses(prev => ({ ...prev, [id]: 'Approved' }))

  const handleReject = (id: string) =>
    setRowStatuses(prev => ({ ...prev, [id]: 'Rejected' }))

  const handleView = (row: TrackingRow) => {
    setSelectedTrip(row)
    setIsModalOpen(true)
  }

  const columns: ColumnDef<TrackingRow>[] = [
    {
      key: 'date',
      header: 'Date',
      accessor: 'date',
    },
    {
      key: 'employee',
      header: 'Employee',
      accessor: 'employee',
      render: (value, row) => (
        <div className="flex items-center gap-2.5">
          <img
            src={row.employeeImg as string}
            alt={value as string}
            className="w-8 h-8 rounded-xl border border-slate-200 bg-slate-100"
          />
          <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
            {value as string}
          </span>
        </div>
      ),
    },
    {
      key: 'jobName',
      header: 'Job Name',
      accessor: 'jobName',
    },
    {
      key: 'totalMileage',
      header: 'Total Milage',
      accessor: 'totalMileage',
      className: 'font-medium text-slate-800',
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      className: 'font-medium text-slate-800',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'id',
      render: (_value, row) => {
        const status = getStatus(row)
        if (status === 'Pending') {
          return (
            <div className="flex items-center gap-1.5">
              <Button
                onClick={() => handleApprove(row.id)}
                variant="primary"
                size='sm'
              >
                Approve
              </Button>
              <Button
                onClick={() => handleReject(row.id)}
                variant="outline"
                size='sm'
              >
                Reject
              </Button>
            </div>
          )
        }
        return (
          <span className={cn(
            'px-3 py-1 text-xs font-semibold rounded-xl',
            status === 'Approved'
              ? 'bg-green-50 text-green-600'
              : 'bg-red-50 text-red-500',
          )}>
            {status}
          </span>
        )
      },
    },
    {
      key: 'action',
      header: 'Action',
      accessor: 'id',
      align: 'center',
      render: (_value, row) => (
        <Button
          onClick={() => handleView(row)}
          variant="ghost"
          size='sm'
          >
          View
        </Button>
      ),
    },
  ]

  return (
    <>
      <TripDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trip={selectedTrip}
        onApprove={() => selectedTrip && handleApprove(selectedTrip.id)}
        onReject={() => selectedTrip && handleReject(selectedTrip.id)}
      />

      <DataTable<TrackingRow>
        columns={columns}
        data={ALL_DATA}
        title="Employee Tracking Details"
        pagination={{ pageSize: 8 }}
      />
    </>
  )
}

export default TrackingTable
