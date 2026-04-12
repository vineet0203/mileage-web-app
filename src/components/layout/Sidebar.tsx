import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Map, LogOut } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAuthStore } from '../../store/useAuthStore'
import { Button } from '../ui/Button'

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  active?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, active }) => (
  <Link
    to={href}
    className={cn(
      "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      active 
        ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-white" : "text-slate-400 group-hover:text-white")} />
    <span className="font-semibold">{label}</span>
  </Link>
)

const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/employees', icon: Users, label: 'Employee Master' },
    { href: '/routes', icon: Map, label: 'Route Configuration' },
  ]

  return (
    <aside className="w-64 bg-slate-950 text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-xl font-black tracking-tight flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Map className="w-5 h-5 text-white" />
          </div>
          Mileage Tracking
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.href}
          />
        ))}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 bg-slate-900/50 m-4 rounded-2xl border border-white/5 space-y-4">
        <Button 
          variant="ghost" 
          onClick={logout}
          className="w-full text-slate-400 hover:text-white hover:bg-slate-800 justify-start px-3"
        >
          <LogOut className="w-5 h-5 mr-3 rotate-180" />
          Logout
        </Button>

        <div className="flex items-center space-x-3 p-2">
          {user?.avatar && (
            <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-xl border border-white/10" />
          )}
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate cursor-pointer hover:text-brand-primary">View profile</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
