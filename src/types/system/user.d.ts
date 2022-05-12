import { PageRequest } from "../base"

export interface UserInfo {
  id: number
  username: string
  nickname: string
  password: string
  gender: number
  birthday: string
  deptId: number
  avatar: string
  status: number
  email: string
  telephone: string
  perms: string[]
}

export interface UserQuery extends PageRequest {
  username: string
  gender?: number
  deptId?: number
  status?: number
  telephone: string
}

/**
 * 用户表单类型声明
 */
 export interface UserFormData {
  id?: number
  deptId: number
  username: string
  nickname: string
  birthday:string
  password: string
  telephone: string
  email: string
  gender: number
  status: number
  avatar: string
  roleIds?: number[];
}

export interface LoginResult {
  token: string
}
