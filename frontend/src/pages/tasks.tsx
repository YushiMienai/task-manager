import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {TaskForm, TaskList} from '@components'
import {taskService} from '@services'
import {useAuth} from '@hooks'
import {Task, TaskCreate, TaskStatus} from '@types'

export const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<TaskStatus | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const {logout, user} = useAuth()
  const navigate = useNavigate()

  const loadTasks = async (): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const tasksData = await taskService.getTasks()
      setTasks(tasksData)
    } catch (err) {
      setError('Ошибка загрузки задач. Проверьте подключение к серверу.')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleTaskCreated = async (taskData: TaskCreate): Promise<void> => {
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks(prev => [newTask, ...prev])
    } catch (err) {
      setError('Ошибка создания задачи')
      throw err
    }
  }

  const handleTaskUpdated = async (taskId: number, updateData: {status: TaskStatus}): Promise<void> => {
    try {
      const updatedTask = await taskService.updateTask(taskId, updateData)
      setTasks(prev =>
        prev.map(task => task.id === taskId ? updatedTask : task)
      )
    } catch (err) {
      setError('Ошибка обновления задачи')
      throw err
    }
  }

  const handleTaskDeleted = async (taskId: number): Promise<void> => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (err) {
      setError('Ошибка удаления задачи')
      throw err
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-lg text-gray-600'>Загрузка...</div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <header className='text-center mb-12'>
          <div className='flex justify-between items-center mb-4'>
            <div></div>
            <h1 className='text-4xl font-bold text-gray-800'>
              📝 Менеджер задач
            </h1>
            <div className='flex items-center gap-4'>
              <span className='text-gray-600'>Привет, {user?.username}!</span>
              <button
                onClick={handleLogout}
                className='px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200'
              >
                Выйти
              </button>
            </div>
          </div>
          <p className='text-xl text-gray-600'>
            Организуйте свои задачи эффективно
          </p>
        </header>

        {error && (
          <div className='bg-red-500 text-white p-4 rounded-lg mb-6 flex justify-between items-center'>
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className='text-white hover:text-gray-200 text-xl'
            >
              ×
            </button>
          </div>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <div className='lg:col-span-1'>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>

          <div className='lg:col-span-2'>
            <TaskList
              tasks={tasks}
              filter={filter}
              onFilterChange={setFilter}
              onUpdateTask={handleTaskUpdated}
              onDeleteTask={handleTaskDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
