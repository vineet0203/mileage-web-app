import React from 'react'
import { Calendar, MapPin, Navigation, DollarSign, History } from 'lucide-react'
import Modal from '../ui/Modal'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

interface TripDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

const InfoRow = ({ icon: Icon, label, value, isBold = true }: { icon: any, label: string, value: string, isBold?: boolean }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-brand-primary">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 flex items-center justify-center text-brand-primary">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-sm font-semibold text-slate-500">{label}</span>
    </div>
    <span className={cn("text-sm text-slate-800", isBold ? "font-black" : "font-semibold")}>{value}</span>
  </div>
)

const HistoryItem = ({ date, address, hours, amount, status }: any) => (
  <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col space-y-2 group hover:border-brand-primary/30 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{date}</span>
      <span className="text-sm font-black text-slate-800">{amount}</span>
    </div>
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-bold text-slate-700 truncate max-w-[140px]">{address}</h4>
      <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded-md border border-green-100">{status}</span>
    </div>
    <p className="text-[10px] font-bold text-slate-400">Total Hours: {hours}</p>
  </div>
)

const TripDetailsModal: React.FC<TripDetailsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trip Details" className="max-w-5xl">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Side - Info */}
        <div className="flex-1 p-6 md:p-8 space-y-6 lg:border-r lg:border-slate-100">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-brand-primary" />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">31 March, 2026</span>
          </div>

          <div className="space-y-3">
            <InfoRow icon={MapPin} label="Starting Address" value="#234, Line one, City" />
            <InfoRow icon={MapPin} label="Ending Address" value="#144, Dreamworld, Cty" />
            <InfoRow icon={Navigation} label="Actual Mileage" value="1.56 Miles" />
            <InfoRow icon={DollarSign} label="Price" value="$500.00" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="space-y-3">
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=400"
                  alt="starting"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black text-white px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm">Odometer Start</span>
                </div>
              </div>
              <p className="text-center text-xs font-black text-slate-500 uppercase tracking-widest">Starting Destination</p>
            </div>
            <div className="space-y-3">
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1550005814-23961b7f9435?auto=format&fit=crop&q=80&w=400"
                  alt="arrival"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-black text-white px-3 py-1 bg-black/50 rounded-full backdrop-blur-sm">Odometer Arrival</span>
                </div>
              </div>
              <p className="text-center text-xs font-black text-slate-500 uppercase tracking-widest">Arrival Destination</p>
            </div>
          </div>

          <div className="flex space-x-4 pt-8">
            <Button size="lg" className="flex-1">Approve</Button>
            <Button variant="outline" size="lg" className="flex-1">Reject</Button>
          </div>
        </div>

        {/* Right Side - History */}
        <div className="w-full lg:w-80 p-6 md:p-8 shrink-0 flex flex-col h-full bg-slate-50/10">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <History className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-lg font-black text-slate-800">Ride History</h3>
          </div>

          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            <HistoryItem date="April 1, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50.00" status="Approved" />
            <HistoryItem date="April 2, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50.00" status="Approved" />
            <HistoryItem date="April 3, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50.00" status="Approved" />
            <HistoryItem date="April 4, 2026" address="123 Oak Ave." hours="1:30 Hours" amount="$50.00" status="Approved" />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TripDetailsModal
