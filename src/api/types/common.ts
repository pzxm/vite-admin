export default interface R<T = any> {
  code: number
  msg: string
  data: T
}

export interface UserInfo {
  id: number
  username: string
  nickname: string
  password: string
  gender: number
  birthday: string
  deptId: number
  avatar: string
  email: string
  telephone: string
  perms: string[]
}

export interface LoginResult {
  token: string
}
