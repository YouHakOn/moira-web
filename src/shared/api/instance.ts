import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios'

export const DEV_URL = '/api'

const baseAPI = (url: string, options?: CreateAxiosDefaults): AxiosInstance => {
  return axios.create({ baseURL: url, ...options })
}

const authAPI = (url: string, options?: CreateAxiosDefaults): AxiosInstance => {
  return axios.create({
    baseURL: url,
    withCredentials: true,
    ...options
  })
}

export const baseInstance = baseAPI(DEV_URL)
export const authInstance = authAPI(DEV_URL)

// axios interceptor에 자동으로 token 설정
authInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
