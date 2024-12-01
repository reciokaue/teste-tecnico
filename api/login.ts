import { User } from "@/hooks/useAuth";
import { api } from "./axios";

interface LoginData {
  username: string
  password: string
}

export async function login({
  username, password
}: LoginData){
  const result = await api.post(`/auth/login`, {
    username, password
    
  }, {
    withCredentials: true
  })

  return result.data as User
}