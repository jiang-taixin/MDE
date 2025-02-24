import axios, { AxiosError } from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 80000,
  headers: {
    post: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
})

// request拦截器
request.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// response 拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error.message)
  },
)
export default request
