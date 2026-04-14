import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, KeyRound } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { authApi } from '../../lib/api/auth'

const VerifyOTPForm: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState(location.state?.email || '')
  const [otp, setOtp] = useState('')

  const verifyMutation = useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      enqueueSnackbar('Email verified successfully! You can now log in.', { variant: 'success' })
      navigate('/login')
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Verification failed', { variant: 'error' })
    }
  })

  const resendMutation = useMutation({
    mutationFn: authApi.resendVerification,
    onSuccess: () => {
      enqueueSnackbar('A new OTP has been sent to your email.', { variant: 'success' })
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to resend OTP', { variant: 'error' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !otp) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })
      return
    }
    verifyMutation.mutate({ email, token: otp })
  }

  const handleResend = () => {
    if (!email) {
      enqueueSnackbar('Please provide an Email Address to resend the OTP', { variant: 'warning' })
      return
    }
    resendMutation.mutate({ email })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">Verify Email!</h2>
        <p className="text-slate-500 text-sm mt-1">Enter the 6-digit code sent to your email</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input 
          id="email"
          type="email" 
          label="Email Address"
          placeholder="Enter your email" 
          icon={<Mail className="w-5 h-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!location.state?.email}
        />

        <Input 
          id="otp"
          type="text" 
          label="OTP Code"
          placeholder="XXXXXX" 
          icon={<KeyRound className="w-5 h-5" />}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <Button type="submit" className="w-full mt-2" size="lg" disabled={verifyMutation.isPending}>
          {verifyMutation.isPending ? 'Verifying...' : 'Verify Now'}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-3">
        <button 
          onClick={handleResend}
          disabled={resendMutation.isPending}
          className="text-slate-500 text-sm font-medium hover:text-brand-primary transition-all disabled:opacity-50 flex mx-auto"
          type="button"
        >
          {resendMutation.isPending ? 'Resending...' : "Didn't receive code? Resend OTP"}
        </button>
        <p className="text-slate-500 text-sm font-medium">
          <Link to="/login" title="Log in" className="text-brand-primary font-black hover:underline transition-all">Back to login</Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyOTPForm
