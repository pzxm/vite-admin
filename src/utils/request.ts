import router from '@/router/'
import userStore from '@/store'
import { LOGIN_PATH } from '@/constants/route'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { R } from '@/types/base'

// 环境变量
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const request: AxiosInstance = axios.create({
  baseURL: BASE_URL
})

// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { appStore } = userStore()
    const accessToken = appStore.accessToken
    // 统一设置认证token
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`
    }
    // 认证token设置
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 控制登录过期锁
let isRefreshing: boolean = false
// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<R>) => {
    const result = response.data
    //  const code = result.code
    const { code, message } = result

    // 正确情况
    if (!code || code === 0) return response

    // 其他错误情况 token过期
    if (code === 401) {
      // 正在处理token过期，直接返回错误
      if (isRefreshing) return Promise.reject(response)
      isRefreshing = true
      ElMessageBox.confirm('登录过期，是否退出', '登录过期', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          // 清除本地过期登录信息
          userStore().reset()
          // 跳转到登录页
          router.push({
            path: LOGIN_PATH,
            query: {
              redirect: router.currentRoute.value.fullPath
            }
          })
        })
        .finally(() => {
          isRefreshing = false
        })
      // 抛出异常 内部消化业务异常
      return Promise.reject(response)
    }

    ElMessage.error(message || '请求失败，请稍后重试')
    // 手动返回Promise异常
    return Promise.reject(response)
  },
  (error: AxiosError) => {
    ElMessage.error('系统异常，请稍后重试')
    // 请求错误处理
    return Promise.reject(error)
  }
)

export default async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<R<T>> = await request(config)
  return response.data.data
}
