import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import LoginForm from './components/auth/LoginForm'
import SignupForm from './components/auth/SignupForm'
import ForgotPasswordForm from './components/auth/ForgotPasswordForm'
import ResetPasswordForm from './components/auth/ResetPasswordForm'

/**
 * Type-safe route definitions for the application.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
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
]
