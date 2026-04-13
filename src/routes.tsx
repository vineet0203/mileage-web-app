import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'
import ResetPasswordForm from './components/auth/ResetPasswordForm'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'

/**
 * Type-safe route definitions for the application.
 * Implements bidirectional redirection based on auth status.
 */
export const routes: RouteObject[] = [
  // Authentication sector (Public only)
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/login" replace />,
          },
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'register',
            element: <SignupForm />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordForm />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordForm />,
          },
        ],
      },
    ],
  },

  // Application sector (Protected only)
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'employees',
            element: <Employees />,
          },
          {
            path: 'routes',
            element: <div className="p-8 text-slate-400 font-bold">Route Configuration - Coming Soon</div>,
          },
        ],
      },
    ],
  },
]
