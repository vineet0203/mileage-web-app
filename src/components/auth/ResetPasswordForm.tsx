import React from 'react'
import { Link } from 'react-router-dom'
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

const ResetPasswordForm: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:rotate-6 hover:scale-110">
          <ShieldCheck className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Set New Password</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-[280px]">Your new password must be different from previously used passwords</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Input 
          id="password"
          type="password" 
          label="New Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
        />

        <Input 
          id="confirm-password"
          type="password" 
          label="Confirm New Password"
          placeholder="••••••••" 
          icon={<Lock className="w-5 h-5" />}
        />

        <Button type="submit" className="w-full mt-2" size="lg">
          Reset Password
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
