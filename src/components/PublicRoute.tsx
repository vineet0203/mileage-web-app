import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

  // If user is already logged in, redirect them to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Otherwise, allow access to public routes (Login, Register, etc.)
  return <Outlet />
}

export default PublicRoute
