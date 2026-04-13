import React from 'react'
import { Calendar, MapPin, Navigation, DollarSign } from 'lucide-react'
import Modal from '../ui/Modal'
import { cn } from '../../lib/utils'

interface TripDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  trip?: any
  onApprove?: () => void
  onReject?: () => void
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 border-l-4 border-l-brand-primary shadow-sm">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-brand-primary shrink-0" />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
    <span className="text-sm font-bold text-slate-800">{value}</span>
  </div>
)

const HistoryItem = ({
  date,
  address,
  hours,
  amount,
  status,
}: {
  date: string
  address: string
  hours: string
  amount: string
  status: string
}) => (
  <div className="flex items-start justify-between px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="space-y-0.5">
      <p className="text-xs text-slate-400">{date}</p>
      <p className="text-sm font-bold text-slate-800">{address}</p>
      <p className="text-xs text-slate-400">Total Hours: {hours}</p>
    </div>
    <div className="flex flex-col items-end gap-1 ml-4 shrink-0">
      <span className="text-base font-bold text-slate-900">{amount}</span>
      <span className={cn(
        'text-xs font-semibold',
        status === 'Approved' ? 'text-green-500' : 'text-red-500'
      )}>
        {status}
      </span>
    </div>
  </div>
)

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ isOpen, onClose, trip, onApprove, onReject }) => {
  const handleApprove = () => {
    onApprove?.()
    onClose()
  }

  const handleReject = () => {
    onReject?.()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trip Details" className="max-w-4xl">
      <div className="flex flex-col lg:flex-row min-h-0 bg-slate-50">
        <div className="flex-1 p-6 space-y-4 border-r border-slate-100">
          <div className="flex items-center gap-3 pb-2">
            <div className="w-9 h-9 bg-brand-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-brand-primary" />
            </div>
            <span className="text-base font-bold text-slate-800">{trip?.date || '31 March, 2026'}</span>
          </div>

          <div className="space-y-2.5">
            <InfoRow icon={MapPin} label="Starting Address" value="#234, Line one, City" />
            <InfoRow icon={MapPin} label="Ending Address" value="#144, Dreamworld, Cty" />
            <InfoRow icon={Navigation} label="Actual Mileage" value={`${trip?.totalMileage || '1.56'} Miles`} />
            <InfoRow icon={DollarSign} label="Price" value={trip?.amount || '$500.00'} />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=400"
                  alt="Starting odometer"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <p className="text-center text-xs font-semibold text-slate-500">Starting Destination</p>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400"
                  alt="Arrival odometer"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <p className="text-center text-xs font-semibold text-slate-500">Arrival Destination</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleApprove}
              className="py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl hover:bg-brand-dark transition-colors shadow-lg shadow-brand-primary/20"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="py-2.5 bg-white border border-brand-primary text-brand-primary text-sm font-semibold rounded-xl hover:bg-brand-primary/5 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>

        <div className="w-full lg:w-72 p-6 flex flex-col gap-4 shrink-0 bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-800">Ride History</h3>

          <div className="space-y-3 overflow-y-auto pr-1">
            <HistoryItem date="April 1, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50:00" status="Approved" />
            <HistoryItem date="April 2, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50:00" status="Approved" />
            <HistoryItem date="April 3, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50:00" status="Approved" />
            <HistoryItem date="April 4, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50:00" status="Approved" />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TripDetailsModal
