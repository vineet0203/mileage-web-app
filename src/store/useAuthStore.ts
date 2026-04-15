import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  fullname: string
  email: string
  role?: string
  designation?: string
  ssn?: string
  phone?: string
  organization_id?: number
  organization_name?: string
  manager_id?: number
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // saves to localStorage
    }
  )
)
