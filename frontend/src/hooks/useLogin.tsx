import {useState} from 'react'
import {useAuth} from './useAuth'
import {LoginData} from '@services'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const {login: authLogin} = useAuth()

  const handleLogin = async (credentials: LoginData) => {
    setIsLoading(true)
    setError('')

    try {
      return await authLogin(credentials)
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || 'Ошибка авторизации'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError('')

  return {
    isLoading,
    error,
    handleLogin,
    clearError
  }
}
