import {useNavigate} from 'react-router-dom'
import {LoginForm} from '@components'
import {useLogin} from '@hooks'
import {LoginData} from '@services'

export const LoginPage = () => {
  const navigate = useNavigate()
  const {isLoading, error, handleLogin, clearError} = useLogin()

  const handleSubmit = async (credentials: LoginData) => {
    try {
      await handleLogin(credentials)
      navigate('/')
    } catch {
      // Ошибка уже обработана в хуке useLogin
    }
  }

  return (
    <div className='login-page-container'>
      <div className='login-container'>
        <div className='text-center'>
          <h2 className='form-title'>Вход в Task Manager</h2>
        </div>
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          onErrorDismiss={clearError}
        />
        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Тестовый аккаунт: testuser / testpassword
          </p>
        </div>
      </div>
    </div>
  )
}
