import {FormEvent, useState} from 'react'
import {LoginData} from '@services'

interface LoginFormProps {
  onSubmit: (credentials: LoginData) => Promise<void>
  isLoading: boolean
  error?: string
  onErrorDismiss?: () => void
}

export const LoginForm = ({onSubmit, isLoading, error, onErrorDismiss}: LoginFormProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await onSubmit({username, password})
  }

  const isFormValid = username.trim() && password.trim()

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      {error && (
        <div className='login-error'>
          <span>{error}</span>
          {onErrorDismiss && (
            <button
              type='button'
              onClick={onErrorDismiss}
              className='login-error-dismiss'
              aria-label='Закрыть сообщение об ошибке'
            >
              ×
            </button>
          )}
        </div>
      )}

      <div className='login-fields'>
        <div>
          <input
            type='text'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='login-input login-input-top'
            placeholder='Имя пользователя'
            disabled={isLoading}
            autoComplete='username'
          />
        </div>
        <div>
          <input
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='login-input login-input-bottom'
            placeholder='Пароль'
            disabled={isLoading}
            autoComplete='current-password'
          />
        </div>
      </div>

      <div>
        <button
          type='submit'
          disabled={isLoading || !isFormValid}
          className='button button-primary button-login'
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </div>
    </form>
  )
}
