import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  // Dummy initial state as requested by user
  user: {
    id: '1',
    name: 'Tanzir Rahman',
    email: 'tanzir@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tanzir'
  },
  isAuthenticated: true,
  
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
