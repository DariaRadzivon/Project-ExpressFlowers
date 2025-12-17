"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  login: (email: string, password: string, name?: string) => boolean
  register: (email: string, password: string, name: string) => boolean
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: (email, password, name) => {
        // Проста локальна авторизація
        const storedUsers = localStorage.getItem("users")
        const users = storedUsers ? JSON.parse(storedUsers) : {}

        if (users[email] && users[email].password === password) {
          set({ user: { email, name: users[email].name } })
          return true
        }
        return false
      },

      register: (email, password, name) => {
        const storedUsers = localStorage.getItem("users")
        const users = storedUsers ? JSON.parse(storedUsers) : {}

        if (users[email]) {
          return false // Користувач вже існує
        }

        users[email] = { password, name }
        localStorage.setItem("users", JSON.stringify(users))
        set({ user: { email, name } })
        return true
      },

      logout: () => {
        set({ user: null })
      },

      isAuthenticated: () => {
        return get().user !== null
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
