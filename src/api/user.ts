/**
 * 用户相关请求
 */
import request from '@/utils/request'

interface UserInfo {
  name: string
  nickname: string
  birthday: string
  gender: number
  tel: string
}

export const getUserInfo = () => {
  return request<UserInfo>({
    method: 'GET',
    url: '/channel/user/info',
    params: { id: 22 }
  })
}
