import {useState, useEffect} from 'react'
import {taskService} from '@services'
import {Task, TaskCreate, TaskStatus} from '@types'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

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

  const createTask = async (taskData: TaskCreate): Promise<void> => {
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks(prev => [newTask, ...prev])
    } catch (err) {
      setError('Ошибка создания задачи')
      throw err
    }
  }

  const updateTask = async (taskId: number, updateData: {status: TaskStatus}): Promise<void> => {
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

  const deleteTask = async (taskId: number): Promise<void> => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
    } catch (err) {
      setError('Ошибка удаления задачи')
      throw err
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    setError,
    refetch: loadTasks
  }
}
