import React, { useState } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useSnackbar } from 'notistack'

interface CreateRouteFormProps {
  onSubmit: (formData: { name: string; rate: number; startDestination: string; endDestination: string }) => void
  isPending?: boolean
}

interface FormState {
  name: string
  rate: string // Using string for input state, will convert to number on submit
  startDestination: string
  endDestination: string
}

const CreateRouteForm: React.FC<CreateRouteFormProps> = ({ onSubmit, isPending }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [formData, setFormData] = useState<FormState>({
    name: '',
    rate: '',
    startDestination: '',
    endDestination: '',
  })

  const handleChange = (key: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.rate || !formData.startDestination || !formData.endDestination) {
      enqueueSnackbar('Please fill out all fields', { variant: 'warning' })
      return
    }
    
    onSubmit({
      name: formData.name,
      rate: parseInt(formData.rate, 10),
      startDestination: formData.startDestination,
      endDestination: formData.endDestination,
    })
    
    setFormData({
      name: '',
      rate: '',
      startDestination: '',
      endDestination: '',
    })
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">Create A Route</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Route Title"
            placeholder="Route Title"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
          />
          <Input
            label="Mileage Rate"
            placeholder="Mileage Rate"
            type="number"
            value={formData.rate}
            onChange={e => handleChange('rate', e.target.value)}
          />
          <Input
            label="Starting Destination"
            placeholder="Starting Destination"
            value={formData.startDestination}
            onChange={e => handleChange('startDestination', e.target.value)}
          />
          <Input
            label="Arrival Destinations"
            placeholder="Arrival Destinations"
            value={formData.endDestination}
            onChange={e => handleChange('endDestination', e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Creating...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}

export default CreateRouteForm