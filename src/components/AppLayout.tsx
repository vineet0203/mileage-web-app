import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './layout/Sidebar'
import Header from './layout/Header'

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar - Fixed/Sticky */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-8 overflow-auto">
          <div className="space-y-8 animate-in fade-in duration-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppLayout
