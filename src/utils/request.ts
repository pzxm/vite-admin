import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'

// 环境变量
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL
})

// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 认证token设置
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应异常处理
    return response
  },
  (error: AxiosError) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then((response) => {
    return response.data.data as T
  })
}
