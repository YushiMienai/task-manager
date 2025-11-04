import {LoginData} from '@services'

interface LoginHintProps {
  credentials?: LoginData
  className?: string
}

export const LoginHint = ({credentials, className = ''}: LoginHintProps) => {
  if (!credentials) return null

  return (
    <div className={`login-hint ${className}`}>
      <p className='login-hint-text'>
        Тестовый аккаунт: <strong>{credentials.username}</strong> / <strong>{credentials.password}</strong>
      </p>
    </div>
  )
}
