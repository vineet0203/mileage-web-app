import React, { useState } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { Route } from '../../pages/RouteConfiguration'

interface CreateRouteFormProps {
  onSubmit: (formData: Omit<Route, 'id'>) => void
}

interface FormState {
  title: string
  startingDestination: string
  arrivalDestinations: string
  mileageRate: string
}

const CreateRouteForm: React.FC<CreateRouteFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormState>({
    title: '',
    startingDestination: '',
    arrivalDestinations: '',
    mileageRate: '',
  })

  const handleChange = (key: keyof FormState, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: formData.title,
      startingDestination: formData.startingDestination,
      arrivalDestinations: formData.arrivalDestinations,
      mileageRate: parseFloat(formData.mileageRate) || 0,
    })
    setFormData({
      title: '',
      startingDestination: '',
      arrivalDestinations: '',
      mileageRate: '',
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
            value={formData.title}
            onChange={e => handleChange('title', e.target.value)}
          />
          <Input
            label="Mileage Rate"
            placeholder="Mileage Rate"
            type="number"
            value={formData.mileageRate}
            onChange={e => handleChange('mileageRate', e.target.value)}
          />
          <Input
            label="Starting Destination"
            placeholder="Starting Destination"
            value={formData.startingDestination}
            onChange={e => handleChange('startingDestination', e.target.value)}
          />
          <Input
            label="Arrival Destinations"
            placeholder="Arrival Destinations"
            value={formData.arrivalDestinations}
            onChange={e => handleChange('arrivalDestinations', e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CreateRouteForm