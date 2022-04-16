/**
 * 用户相关请求
 */
import request from '@/utils/request'
import { LoginResult, UserInfo } from './types/common'

export const getUserInfo = () => {
  return request<UserInfo>({
    method: 'GET',
    url: '/userinfo',
    params: { id: 22 }
  })
}

export const login = (data: any) => {
  return request<LoginResult>({
    method: 'POST',
    url: '/login',
    data: data
  })
}

export const handleLogout = () => {
  return request({
    method: 'POST',
    url: '/logout'
  })
}
