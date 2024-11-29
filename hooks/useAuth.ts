import { router } from 'expo-router'
import { create } from 'zustand'

interface User {
  name: string
  username: string
  email: string
  password: string
  profileUrl: string
}

type AuthStore = {
  user: User | null
  errorMessage: string
  login: (username: string, password: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  errorMessage: '',
  login: (username, password) => {
    if(username === 'emilys' && password === 'emilyspass'){
      set({
        user: {
          name: 'emilyspass',
          username: 'Kaue Recio',
          email: 'kaue.recio2@gmail.com',
          password: 'emilyspass',
          profileUrl: 'https://github.com/reciokaue.png',
        },
        errorMessage: ''
      })

      router.push('/(tabs)/(home)')
    }else {
      set({errorMessage: 'Username ou senha inválidos'})
    }
  },
  logout: () => {
    set({ user: null })
    router.push('/(tabs)/(home)')
  }
}))