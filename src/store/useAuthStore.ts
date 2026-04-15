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
  refreshToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, token: string, refreshToken: string) => void
  setTokens: (token: string, refreshToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      
      setAuth: (user, token, refreshToken) => set({ user, token, refreshToken, isAuthenticated: true }),
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
      clearAuth: () => set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // saves to localStorage
    }
  )
)
