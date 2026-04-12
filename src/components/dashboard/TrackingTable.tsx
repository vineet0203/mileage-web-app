import React, { useState } from 'react'
import { Eye } from 'lucide-react'
import { cn } from '../../lib/utils'
import TripDetailsModal from './TripDetailsModal'

interface TrackingData {
  id: string
  date: string
  employee: string
  employeeImg: string
  jobName: string
  totalMileage: number
  amount: string
  status: 'Approve' | 'Reject' | 'Pending'
}

const mockData: TrackingData[] = [
  { id: '1', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '2', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '3', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '4', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '5', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '6', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '7', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
  { id: '8', date: '15-02-2026', employee: 'Jhon Smith', employeeImg: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jhon', jobName: 'Ac Repair at Residence', totalMileage: 15, amount: '$30.00', status: 'Approve' },
]

const TrackingTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)

  const handleView = (row: any) => {
    setSelectedTrip(row)
    setIsModalOpen(true)
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <TripDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <div className="p-8 pb-4">
        <h3 className="text-xl font-black text-slate-800">Employee Tracking Details</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Job Name</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Total Milage</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-4 text-sm font-semibold text-slate-600">{row.date}</td>
                <td className="px-8 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={row.employeeImg} alt={row.employee} className="w-8 h-8 rounded-full border border-slate-200" />
                    <span className="text-sm font-bold text-slate-800">{row.employee}</span>
                  </div>
                </td>
                <td className="px-8 py-4 text-sm font-semibold text-slate-600">{row.jobName}</td>
                <td className="px-8 py-4 text-sm font-bold text-slate-800">{row.totalMileage}</td>
                <td className="px-8 py-4 text-sm font-bold text-slate-800">{row.amount}</td>
                <td className="px-8 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-brand-primary text-white text-[10px] font-black rounded-lg hover:bg-brand-dark transition-colors">Approve</button>
                    <button className="px-3 py-1 bg-white border border-slate-200 text-brand-primary text-[10px] font-black rounded-lg hover:bg-slate-50 transition-colors">Reject</button>
                  </div>
                </td>
                <td className="px-8 py-4 text-right">
                  <button 
                    onClick={() => handleView(row)}
                    className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-brand-primary/10 hover:text-brand-primary transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Container (Simple UI only) */}
      <div className="p-8 flex items-center justify-between border-t border-slate-50">
        <p className="text-sm font-bold text-slate-400">Showing 1-5 out of 50 results</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={cn(
                "w-8 h-8 rounded-lg text-xs font-black transition-all",
                page === 1
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100"
              )}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrackingTable
