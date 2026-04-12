import React from 'react'
import { Outlet } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-brand-bg font-sans leading-relaxed">
      {/* Left Part - Branding Section */}
      <div className="w-full md:w-[60%] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-brand-dark to-brand-primary text-white relative overflow-hidden group">
        {/* Decorative Circles */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 border-[1px] border-white/10 rounded-full transition-transform duration-1000 group-hover:scale-110"></div>
        <div className="absolute -bottom-40 -left-12 w-80 h-80 border-[1px] border-white/5 rounded-full transition-transform duration-1000 group-hover:scale-105"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-2xl border border-white/20 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2 drop-shadow-md">
            Mileage Tracking
          </h1>
          <p className="text-blue-100 text-lg opacity-80 max-w-xs">Track your journeys with precision and ease</p>
        </div>
      </div>

      {/* Right Part - Form Section */}
      <div className="w-full md:w-[40%] flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm bg-white p-8 md:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 animate-in fade-in zoom-in-95 duration-700">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
