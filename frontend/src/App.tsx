import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {useAuth} from '@hooks'
import {LoginPage, TasksPage} from '@pages'
import {ProtectedRoute} from '@components'

function App() {
  const {isAuthenticated} = useAuth()

  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <Routes>
          <Route path='/login' element={
            isAuthenticated ? <Navigate to='/' replace /> : <LoginPage />
          } />
          <Route path='/' element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          } />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App