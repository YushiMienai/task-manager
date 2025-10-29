import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface LoginData {
  username: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user_id: number
  username: string
}

class Auth {
  private token: string | null = null

  constructor() {
    this.token = localStorage.getItem('auth_token')
    if (this.token) {
      this.setAuthToken(this.token)
    }
  }

  setAuthToken(token: string | null) {
    this.token = token
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('auth_token', token)
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('auth_token')
    }
  }

  getAuthToken(): string | null {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, loginData)
      const { access_token } = response.data
      this.setAuthToken(access_token)
      return response.data as AuthResponse
    } catch (error) {
      this.setAuthToken(null)
      throw error
    }
  }

  async getCurrentUser(): Promise<AuthResponse> {
    const response = await axios.get<AuthResponse>(`${API_BASE_URL}/auth/me`)
    return response.data as AuthResponse
  }

  logout() {
    this.setAuthToken(null)
  }
}

export const authService = new Auth()