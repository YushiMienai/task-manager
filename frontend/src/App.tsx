import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ProtectedRoute} from '@components'
import {TasksPage, LoginPage} from '@pages'

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
