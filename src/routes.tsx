import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import VerifyOTPForm from './components/auth/VerifyOTPForm'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'
import ResetPasswordForm from './components/auth/ResetPasswordForm'
import AcceptInviteForm from './components/auth/AcceptInviteForm'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import RouteConfiguration from './pages/RouteConfiguration'
import PrivacyPolicy from './pages/PrivacyPolicy'

/**
 * Type-safe route definitions for the application.
 * Implements bidirectional redirection based on auth status.
 */
export const routes: RouteObject[] = [
  // Static Public Pages
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
  },

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
            path: 'verify-email',
            element: <VerifyOTPForm />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordForm />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordForm />,
          },
          {
            path: 'accept-invite',
            element: <AcceptInviteForm />,
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
            element: <RouteConfiguration />,
          },
        ],
      },
    ],
  },
]
