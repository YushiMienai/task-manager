import {ReactNode} from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '@hooks'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const {isAuthenticated, isLoading} = useAuth()

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
