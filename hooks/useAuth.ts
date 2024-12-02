import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  accessToken: string,
  refreshToken: string,
}

type AuthStore = {
  user: User | null
  status: 'idle' | 'signOut' | 'signIn' | string; 
  setUser: (user: User) => void
  logout: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: 'idle',
  user: null,
  setUser: async (user: User) => {
    set({ user: user, status: 'signIn' })
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },
  logout: async () => {
    set({ user: null, status: 'signOut' })
    await AsyncStorage.removeItem('user')
  },
  hydrate: async () => {
    const storage = await AsyncStorage.getItem('user')
    const userStorage = storage && JSON.parse(storage)

    if(userStorage)
      set({user: userStorage, status: 'signIn'})
    else 
      set({status: 'signOut'})
  },
}))