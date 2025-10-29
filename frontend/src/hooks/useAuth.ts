import {useState, useEffect, useCallback} from 'react'
import {authService, LoginData, AuthResponse} from '@services'

interface UseAuthReturn {
  isAuthenticated: boolean
  isLoading: boolean
  user: { username: string; user_id: number } | null
  login: (data: LoginData) => Promise<AuthResponse>
  logout: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ username: string; user_id: number } | null>(null)

  useEffect(() => {
    const token = authService.getAuthToken()
    if (token) {
      // Восстанавливаем пользователя из localStorage или оставляем null
      // Данные будут обновлены при следующем логине
      const savedUser = localStorage.getItem('user_data')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (data: LoginData): Promise<AuthResponse> => {
    setIsLoading(true)
    try {
      const response = await authService.login(data)
      // Сохраняем данные пользователя из ответа
      const userData = {
        user_id: response.user_id,
        username: response.username
      }
      setUser(userData)
      setIsAuthenticated(true)
      // Сохраняем в localStorage для восстановления
      localStorage.setItem('user_data', JSON.stringify(userData))
      return response
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
