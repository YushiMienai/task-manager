import {useNavigate} from 'react-router-dom'
import {LoginForm, LoginHeader, LoginHint} from '@components'
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

  const testCredentials: LoginData = {
    username: 'testuser',
    password: 'testpassword'
  }

  return (
    <div className='login-page'>
      <div className='login-container'>
        <LoginHeader />
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          onErrorDismiss={clearError}
        />
        <LoginHint credentials={testCredentials} />
      </div>
    </div>
  )
}
