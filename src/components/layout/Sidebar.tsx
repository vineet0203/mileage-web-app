import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut, X } from 'lucide-react'
import { MileageRouteIcon } from '../ui/Icons'
import { cn } from '../../lib/utils'
import { useAuthStore } from '../../store/useAuthStore'
import { Button } from '../ui/Button'
import { authApi } from '../../lib/api/auth'
import { useSnackbar } from 'notistack'

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, active, onClick }) => (
  <Link
    to={href}
    onClick={onClick}
    className={cn(
      "flex items-center space-x-3 px-4 py-2 rounded-sm transition-all duration-200 group",
      active
        ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    )}
  >
    <Icon className={cn("w-5 h-5", active ? "text-white" : "text-slate-400 group-hover:text-white")} />
    <span className="font-semibold">{label}</span>
  </Link>
)

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user, clearAuth } = useAuthStore()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (e) {
      console.error('Logout API failed', e)
    } finally {
      clearAuth()
      enqueueSnackbar('Logged out', { variant: 'info' })
    }
  }

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/employees', icon: Users, label: 'Employee Master' },
    { href: '/routes', icon: MileageRouteIcon, label: 'Route Configuration' },
  ]

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-60 md:hidden backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "w-64 bg-slate-950 text-white flex flex-col h-screen fixed inset-y-0 left-0 z-[70] transform transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 shadow-2xl md:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button - Half-on half-off */}
        {isOpen && <button
          onClick={onClose}
          className="md:hidden absolute -right-5 top-8 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg border-4 border-slate-950 hover:scale-110 active:scale-95 transition-all z-[80]"
          aria-label="Close Menu"
        >
          <X className="w-6 h-6" />
        </button>}

        {/* Logo */}
        <div className="py-8 px-4 flex items-center">
          <h1 className="text-xl font-black tracking-tight flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex-shrink-0 flex items-center justify-center p-1.5">
              <MileageRouteIcon className="w-full h-full text-white" />
            </div>
            <span>Mileage Tracking</span>
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
              onClick={() => onClose()}
            />
          ))}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-2 bg-slate-900/50 m-4 rounded-xl border border-white/5 space-y-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full text-slate-400 hover:text-white hover:bg-slate-800 justify-start px-3"
          >
            <LogOut className="w-5 h-5 mr-3 rotate-180" />
            Logout
          </Button>

          <div className="flex items-center space-x-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center overflow-hidden border border-white/10 font-bold text-white">
              {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name || user?.email}</p>
              <p className="text-[10px] text-slate-500 truncate cursor-pointer hover:text-brand-primary capitalize">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
