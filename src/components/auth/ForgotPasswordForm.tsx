import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Key, Mail, ArrowLeft } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { authApi } from '../../lib/api/auth'

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      enqueueSnackbar('If an account exists, a reset OTP has been sent.', { variant: 'success' })
      navigate('/reset-password', { state: { email } })
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to send reset link', { variant: 'error' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      enqueueSnackbar('Please enter your email', { variant: 'warning' })
      return
    }
    forgotPasswordMutation.mutate({ email })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:rotate-12 hover:scale-110">
          <Key className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Forgot Password?</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-[240px]">Enter your email and we'll send you an OTP to reset your password</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input 
          id="email"
          type="email" 
          label="Email Address"
          placeholder="Enter your email" 
          icon={<Mail className="w-5 h-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full" size="lg" disabled={forgotPasswordMutation.isPending}>
          {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Link'}
        </Button>
      </form>

      <div className="mt-8 text-center pt-6 border-t border-slate-100">
        <Link 
          to="/login" 
          title="Go back" 
          className="inline-flex items-center justify-center text-brand-primary font-black hover:underline group transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordForm
