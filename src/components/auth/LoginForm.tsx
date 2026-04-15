import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'
import { authApi } from '../../lib/api/auth'
import { useAuthStore } from '../../store/useAuthStore'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      enqueueSnackbar('Logged in successfully', { variant: 'success' })
      const user = data.data?.user || data.user
      const accessToken = data.data?.accessToken || data.accessToken
      const refreshToken = data.data?.refreshToken || data.refreshToken
      setAuth(user, accessToken, refreshToken)
      navigate('/dashboard')
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Login failed', { variant: 'error' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })
      return
    }
    loginMutation.mutate({ email, password })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">Hello Again!</h2>
        <p className="text-slate-500 text-sm mt-1">Welcome back</p>
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
        />

        <Input 
          id="password"
          type="password" 
          label="Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-xs text-slate-500 cursor-pointer group">
            <Checkbox />
            <span className="group-hover:text-slate-700 transition-colors">Remember me</span>
          </label>
          <Link to="/forgot-password" title="Recover password" className="text-xs text-brand-primary font-bold hover:underline transition-all">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full mt-2" size="lg" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Don't have an account? <Link to="/register" title="Create account" className="text-brand-primary font-black hover:underline transition-all">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
