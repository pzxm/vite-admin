import { UserInfo } from '@/api/types/common'
import { defineStore } from 'pinia'

const useStore = defineStore('app', {
  state: () => {
    return {
      isCollapse: false,
      userInfo: {} as UserInfo | null,
      accessToken: ''
    }
  },
  getters: {
    isAuthenticated(): string {
      return this.accessToken
    }
  },
  actions: {
    setIsCollapse(collapse: boolean) {
      this.isCollapse = collapse
    },
    setUser(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken
    },
    reset() {
      this.$reset()
    }
  },
  // pinia 持久化插件（持久化到localStorage）
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})

export default useStore
