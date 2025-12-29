import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'customer'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        email: email,
        name: 'Admin User',
        role: 'admin',
      }
      setUser(adminUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(adminUser))
      }
      return true
    } else if (email && password) {
      const customerUser: User = {
        id: '2',
        email: email,
        name: 'Customer User',
        role: 'customer',
      }
      setUser(customerUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(customerUser))
      }
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
