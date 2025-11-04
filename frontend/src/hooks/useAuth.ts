import {useState, useEffect, useCallback} from 'react'
import {authService, LoginData, AuthResponse} from '@services'
import {User} from '@types'

interface UseAuthReturn {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  login: (data: LoginData) => Promise<AuthResponse>
  logout: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  // Функция для проверки авторизации
  const checkAuth = useCallback(() => {
    const token = authService.getAuthToken()
    if (token) {
      const savedUser = localStorage.getItem('user_data')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          console.error('Error parsing user data:', e)
          localStorage.removeItem('user_data')
        }
      }
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  // Проверяем авторизацию при монтировании
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = useCallback(async (data: LoginData): Promise<AuthResponse> => {
    setIsLoading(true)
    try {
      const response = await authService.login(data)
      const userData = {
        user_id: response.user_id,
        username: response.username
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem('user_data', JSON.stringify(userData))
      return response
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      localStorage.removeItem('user_data')
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('user_data')
  }, [])

  return {isAuthenticated, isLoading, user, login, logout}
}
