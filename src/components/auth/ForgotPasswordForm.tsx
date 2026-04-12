import React from 'react'
import { Link } from 'react-router-dom'
import { Key, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

const ForgotPasswordForm: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 hover:rotate-12 hover:scale-110">
          <Key className="w-8 h-8 text-brand-primary" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Forgot Password?</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-[240px]">Enter your email and we'll send you a link to reset your password</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <Input 
          id="email"
          type="email" 
          label="Email Address"
          placeholder="Enter your email" 
          icon={<Mail className="w-5 h-5" />}
        />

        <Button type="submit" className="w-full" size="lg">
          Send Link
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
