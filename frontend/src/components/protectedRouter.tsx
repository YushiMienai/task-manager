import {ReactNode, useEffect} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from '@hooks'

interface ProtectedRouteProps {
  children: ReactNode
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
  const {isAuthenticated, isLoading} = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        replace
        to="/login"
        state={{from: location}}
      />
    )
  }

  return <>{children}</>
}
