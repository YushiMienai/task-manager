import axios from 'axios'
import {Task, TaskCreate, TaskUpdate, TaskStatus} from '@types'
import {authService} from '@services'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    const token = authService.getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authService.logout()
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export const taskService = {
  getTasks: async (status: TaskStatus | null = null): Promise<Task[]> => {
    const params = status ? {status} : {}
    const response = await api.get<Task[]>('/tasks/', {params})
    return response.data as Task[]
  },

  createTask: async (taskData: TaskCreate): Promise<Task> => {
    const response = await api.post<Task>('/tasks/', taskData)
    return response.data as Task
  },

  updateTask: async (taskId: number, taskData: TaskUpdate): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${taskId}`, taskData)
    return response.data as Task
  },

  deleteTask: async (taskId: number): Promise<void> => {
    await api.delete(`/tasks/${taskId}`)
  },
}

export default api