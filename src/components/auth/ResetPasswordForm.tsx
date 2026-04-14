import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Lock, ArrowLeft, ShieldCheck, Mail, KeyRound } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { authApi } from '../../lib/api/auth'

const ResetPasswordForm: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState(location.state?.email || '')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      enqueueSnackbar('Password reset successfully. You can now login.', { variant: 'success' })
      navigate('/login')
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Password reset failed', { variant: 'error' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !token || !password || !confirmPassword) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })
      return
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'warning' })
      return
    }
    resetMutation.mutate({ email, token, newPassword: password })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:rotate-6 hover:scale-110">
          <ShieldCheck className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Set New Password</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-[280px]">Check your email for the OTP to reset your password</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {!location.state?.email && (
          <Input 
            id="email"
            type="email" 
            label="Email Address"
            placeholder="Enter your email" 
            icon={<Mail className="w-5 h-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        
        <Input 
          id="token"
          type="text" 
          label="OTP Code"
          placeholder="XXXXXX" 
          icon={<KeyRound className="w-5 h-5" />}
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <Input 
          id="password"
          type="password" 
          label="New Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input 
          id="confirm-password"
          type="password" 
          label="Confirm New Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" className="w-full mt-2" size="lg" disabled={resetMutation.isPending}>
          {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>

      <div className="mt-8 text-center pt-6 border-t border-slate-100">
        <Link 
          to="/login" 
          title="Back to login" 
          className="inline-flex items-center justify-center text-brand-primary font-black hover:underline group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  )
}

export default ResetPasswordForm
