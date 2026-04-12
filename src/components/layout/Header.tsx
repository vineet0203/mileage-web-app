import React from 'react'
import { Bell, Search } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

const Header: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Hello {user?.name.split(' ')[0]}
        </h2>
      </div>

      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative group">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search here" 
            className="w-72 bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-slate-50 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}

export default Header
