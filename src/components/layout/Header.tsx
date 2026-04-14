import React from 'react'
import { Bell, Menu } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
          Hello {user?.name.split(' ')[0]}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-6 h-6 text-slate-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  )
}

export default Header
