import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {TaskForm, TaskList, PageHeader, ErrorAlert, LoadingState} from '@components'
import {useTasks, useAuth} from '@hooks'
import {TaskStatus} from '@types'

export const TasksPage = () => {
  const [filter, setFilter] = useState<TaskStatus | null>(null)
  const {logout} = useAuth()
  const navigate = useNavigate()

  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    setError
  } = useTasks()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return <LoadingState />
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <PageHeader onLogout={handleLogout} />

        {error && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-1'>
            <TaskForm onTaskCreated={createTask} />
          </div>

          <div className='lg:col-span-2'>
            <TaskList
              tasks={tasks}
              filter={filter}
              onFilterChange={setFilter}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
