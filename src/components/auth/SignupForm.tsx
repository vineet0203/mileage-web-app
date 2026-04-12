import React from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Building2 } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

const SignupForm: React.FC = () => {
  const roleOptions = [
    { value: '', label: 'Choose your role' },
    { value: 'driver', label: 'Driver' },
    { value: 'fleet_manager', label: 'Fleet Manager' },
    { value: 'admin', label: 'Administrator' },
  ]

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-800">Hello!</h2>
        <p className="text-slate-500 text-sm mt-1">Join the community</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input 
          id="fullname"
          type="text" 
          label="Full Name"
          placeholder="Your names" 
          icon={<User className="w-5 h-5" />}
        />

        <Input 
          id="email"
          type="email" 
          label="Email Address"
          placeholder="Enter email" 
          icon={<Mail className="w-5 h-5" />}
        />

        <Input 
          id="phone"
          type="tel" 
          label="Phone Number"
          placeholder="+91 XXXXX XXXXX" 
          icon={<Phone className="w-5 h-5" />}
        />

        <Select 
          id="role"
          label="Select Role"
          options={roleOptions}
          icon={<Building2 className="w-5 h-5" />}
        />

        <Button type="submit" className="w-full mt-4" size="lg">
          Join Us
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-500 text-sm font-medium">
          Already have an account? <Link to="/login" title="Log in" className="text-brand-primary font-black hover:underline transition-all">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default SignupForm
