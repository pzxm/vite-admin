/**
 * 用户相关请求
 */
import { MenuInfo } from '@/types/system/menu'
import request from '@/utils/request'
import { LoginResult, UserFormData, UserInfo, UserQuery } from '@/types/system/user'
import { PageResult } from '@/types/base'

export function getUserInfo(id: number | undefined) {
  return request<UserInfo>({
    method: 'GET',
    url: '/userinfo',
    params: { id: 22 }
  })
}

export function login(data: any) {
  return request<LoginResult>({
    method: 'POST',
    url: '/login',
    data: data
  })
}

export function handleLogout() {
  return request({
    method: 'POST',
    url: '/logout'
  })
}

export function getUserMenu() {
  return request<MenuInfo[]>({
    method: 'GET',
    url: '/menu'
  })
}

export function page(param: UserQuery) {
  return request<PageResult<UserInfo>>({
    method: 'POST',
    url: '/user/page',
    data: param
  })
}

export function addUser(data: UserFormData) {
  return request({
    method: 'POST',
    url: '/user',
    data: data
  })
}

export function updateUser(data: UserFormData) {
  return request({
    method: 'PUT',
    url: '/user',
    data: data
  })
}
