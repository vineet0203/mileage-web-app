import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, UserCheck, KeyRound } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { authApi } from '../../lib/api/auth'

const AcceptInviteForm: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const [inviteToken, setInviteToken] = useState(searchParams.get('token') || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const acceptMutation = useMutation({
    mutationFn: authApi.acceptInvite,
    onSuccess: () => {
      enqueueSnackbar('Invitation accepted! You can now log in.', { variant: 'success' })
      navigate('/login')
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Failed to accept invitation', { variant: 'error' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteToken || !password || !confirmPassword) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })
      return
    }
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'warning' })
      return
    }
    acceptMutation.mutate({ inviteToken, password })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:rotate-6 hover:scale-110">
          <UserCheck className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Accept Invitation</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-[280px]">Set up your permanent password to activate your account</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {!searchParams.get('token') && (
          <Input 
            id="token"
            type="text" 
            label="Invite Token"
            placeholder="Enter your invite code" 
            icon={<KeyRound className="w-5 h-5" />}
            value={inviteToken}
            onChange={(e) => setInviteToken(e.target.value)}
          />
        )}

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
          label="Confirm Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" className="w-full mt-2" size="lg" disabled={acceptMutation.isPending}>
          {acceptMutation.isPending ? 'Activating...' : 'Activate Account'}
        </Button>
      </form>

      <div className="mt-8 text-center pt-6 border-t border-slate-100">
         <p className="text-slate-500 text-sm font-medium">
          Already have an account? <Link to="/login" title="Log in" className="text-brand-primary font-black hover:underline transition-all">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default AcceptInviteForm
