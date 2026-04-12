import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Checkbox } from '../ui/Checkbox'

const LoginForm: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800">Hello Again!</h2>
        <p className="text-slate-500 text-sm mt-1">Welcome back</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Input 
          id="email"
          type="email" 
          label="Email Address"
          placeholder="Enter your email" 
          icon={<Mail className="w-5 h-5" />}
        />

        <Input 
          id="password"
          type="password" 
          label="Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
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

        <Button type="submit" className="w-full mt-2" size="lg">
          Login
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
