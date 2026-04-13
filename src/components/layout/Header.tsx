import React from 'react'
import { Bell, Search } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

const Header: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Hello {user?.name.split(' ')[0]}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-6 h-6 text-slate-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative group">
          <input
            type="text"
            placeholder="Search here"
            className="w-64 bg-white border border-slate-200 rounded-xl py-2 pl-4 pr-10 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </header>
  )
}

export default Header
