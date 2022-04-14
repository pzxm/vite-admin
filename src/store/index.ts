import { defineStore } from 'pinia'

const appStore = defineStore('app', {
  state: () => {
    return {
      count: 0,
      name: 'Eduardo',
      isAdmin: true
    }
  },
  getters: {},
  actions: {}
})

export default appStore
