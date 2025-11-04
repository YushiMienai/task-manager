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
    <div className='page-container'>
      <div className='content-container'>
        <PageHeader onLogout={handleLogout} />

        {error && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError(null)}
          />
        )}

        <div className='grid-layout'>
          <div className='grid-sidebar'>
            <TaskForm onTaskCreated={createTask} />
          </div>

          <div className='grid-main'>
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
