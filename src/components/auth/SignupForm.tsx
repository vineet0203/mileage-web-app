import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Building2, Lock } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { authApi } from '../../lib/api/auth'

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    organizationName: '',
    website: '',
    phone: '',
  })
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      enqueueSnackbar('Account created successfully. Please check your email for the OTP.', { variant: 'success' })
      navigate('/verify-email', { state: { email: formData.email } })
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response?.data?.message || 'Signup failed', { variant: 'error' })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Required fields: organizationName, fullname, email, password
    if (!formData.fullname || !formData.email || !formData.password || !formData.organizationName) {
      enqueueSnackbar('Please fill in all required fields', { variant: 'warning' })
      return
    }
    
    // Role is now ADMIN by default for account creators
    signupMutation.mutate({
      ...formData,
      role: 'ADMIN'
    })
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-800">Get Started</h2>
        <p className="text-slate-500 text-sm mt-1">Create an account for your company</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input 
          id="organizationName"
          type="text" 
          label="Company Name *"
          placeholder="e.g. Acme Corp" 
          icon={<Building2 className="w-5 h-5" />}
          value={formData.organizationName}
          onChange={handleChange}
        />

        <Input 
          id="website"
          type="url" 
          label="Website Link"
          placeholder="https://..." 
          icon={<Building2 className="w-4 h-4" />}
          value={formData.website}
          onChange={handleChange}
        />

        <Input 
          id="phone"
          type="tel" 
          label="Phone Number"
          placeholder="+91..." 
          icon={<Phone className="w-4 h-4" />}
          value={formData.phone}
          onChange={handleChange}
        />

        <Input 
          id="fullname"
          type="text" 
          label="Admin Name *"
          placeholder="Your full name" 
          icon={<User className="w-5 h-5" />}
          value={formData.fullname}
          onChange={handleChange}
        />

        <Input 
          id="email"
          type="email" 
          label="Work Email Address *"
          placeholder="name@company.com" 
          icon={<Mail className="w-5 h-5" />}
          value={formData.email}
          onChange={handleChange}
        />

        <Input 
          id="password"
          type="password" 
          label="Password *"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" className="w-full mt-4" size="lg" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? 'Creating Account...' : 'Sign Up'}
        </Button>
      </form>

      <div className="mt-6 text-center border-t border-slate-100 pt-6">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account? <Link to="/login" title="Log in" className="text-brand-primary font-black hover:underline transition-all">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm
