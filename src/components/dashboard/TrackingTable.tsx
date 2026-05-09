import React, { useState } from 'react'
import { cn } from '../../lib/utils'
import DataTable, { type ColumnDef } from '../ui/DataTable'
import TripDetailsModal from './TripDetailsModal'
import ConfirmationModal from '../ui/ConfirmationModal'
import { Button } from '../ui/Button'
import Avatar from '../ui/Avatar'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tripsApi, type Trip } from '../../lib/api/trips'
import { useAuthStore } from '../../store/useAuthStore'
import { useSnackbar } from 'notistack'
import { format } from 'date-fns'

// ─── Component ────────────────────────────────────────────────────────────────
const TrackingTable: React.FC = () => {
  const { user } = useAuthStore()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState<number | null>(null)

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState<{
    id: number;
    status: 'APPROVED' | 'REJECTED';
    title: string;
    message: string;
    variant: 'primary' | 'danger';
  } | null>(null)

  // Fetch trips
  const { data: tripsResponse, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: () => tripsApi.getTrips(),
  })

  const trips = tripsResponse?.data || []

  // Update Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'APPROVED' | 'REJECTED' }) =>
      tripsApi.updateTripStatus(id, status),
    onSuccess: (_, variables) => {
      enqueueSnackbar(`Trip ${variables.status.toLowerCase()} successfully`, { variant: 'success' })
      queryClient.invalidateQueries({ queryKey: ['trips'] })
      queryClient.invalidateQueries({ queryKey: ['tripStats'] })
      setIsConfirmOpen(false)
      setIsDetailsOpen(false)
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to update trip status', { variant: 'error' })
    }
  })

  const openConfirm = (id: number, status: 'APPROVED' | 'REJECTED') => {
    setConfirmConfig({
      id,
      status,
      title: status === 'APPROVED' ? 'Approve Trip' : 'Reject Trip',
      message: `Are you sure you want to ${status.toLowerCase()} this trip? This action cannot be undone.`,
      variant: status === 'APPROVED' ? 'primary' : 'danger'
    })
    setIsConfirmOpen(true)
  }

  const handleView = (trip: Trip) => {
    setSelectedTripId(trip.id)
    setIsDetailsOpen(true)
  }

  const isManagerOrAdmin = user?.role === 'MANAGER' || user?.role === 'ADMIN'

  const columns: ColumnDef<Trip>[] = [
    {
      key: 'date',
      header: 'Date',
      accessor: 'created_at',
      render: (value) => format(new Date(value as string), 'dd-MM-yyyy')
    },
    {
      key: 'employee',
      header: 'Employee',
      accessor: 'employee_name',
      render: (value, row) => (
        <div className="flex items-center gap-2.5">
          <Avatar src={row.profile_image} name={value as string} />
          <span className="text-sm font-medium text-slate-800 whitespace-nowrap">
            {value as string}
          </span>
        </div>
      ),
    },
    {
      key: 'jobName',
      header: 'Job Name',
      accessor: 'title',
    },
    {
      key: 'mileage',
      header: 'Mileage',
      accessor: 'start_mileage',
      render: (_value, row) => (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-800 whitespace-nowrap">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Start</span>
            <span>{Number(row.start_mileage).toLocaleString()}</span>
            <span className="text-slate-300 text-xs">→</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">End</span>
            <span>
              {row.end_mileage != null
                ? Number(row.end_mileage).toLocaleString()
                : <span className="text-slate-400 text-xs font-normal italic">Pending</span>}
            </span>
          </div>
          {row.end_mileage != null && (
            <span className="text-[10px] text-slate-400 font-medium">
              {Number(row.distance).toFixed(1)} km total
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'total_price',
      render: (value) => `$${Number(value).toFixed(2)}`,
      className: 'font-medium text-slate-800',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      render: (status, row) => {
        if (status === 'COMPLETED_PENDING' && isManagerOrAdmin) {
          return (
            <div className="flex items-center gap-1.5">
              <Button
                onClick={() => openConfirm(row.id, 'APPROVED')}
                variant="primary"
                size='sm'
              >
                Approve
              </Button>
              <Button
                onClick={() => openConfirm(row.id, 'REJECTED')}
                variant="outline"
                size='sm'
              >
                Reject
              </Button>
            </div>
          )
        }

        const statusMap = {
          'IN_PROGRESS': { label: 'In Progress', classes: 'bg-blue-50 text-blue-600' },
          'COMPLETED_PENDING': { label: 'Pending Approval', classes: 'bg-amber-50 text-amber-600' },
          'APPROVED': { label: 'Approved', classes: 'bg-green-50 text-green-600' },
          'REJECTED': { label: 'Rejected', classes: 'bg-red-50 text-red-500' },
        }

        const config = statusMap[status as keyof typeof statusMap] || { label: status, classes: 'bg-slate-50 text-slate-500' }

        return (
          <span className={cn(
            'px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full',
            config.classes,
          )}>
            {config.label}
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
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        tripId={selectedTripId}
        onApprove={() => selectedTripId && openConfirm(selectedTripId, 'APPROVED')}
        onReject={() => selectedTripId && openConfirm(selectedTripId, 'REJECTED')}
      />

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => confirmConfig && updateStatusMutation.mutate({ id: confirmConfig.id, status: confirmConfig.status })}
        title={confirmConfig?.title || ''}
        message={confirmConfig?.message || ''}
        variant={confirmConfig?.variant}
        isLoading={updateStatusMutation.isPending}
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <DataTable<Trip>
          columns={columns}
          data={trips}
          title="Employee Tracking Details"
          pagination={{ pageSize: 10 }}
          isLoading={isLoading}
        />
      </div>
    </>
  )
}

export default TrackingTable
