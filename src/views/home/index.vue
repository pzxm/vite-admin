<template>
  <h1>首页</h1>
  <el-button @click="getUser">获取用户信息</el-button>
  <el-button @click="logout1">退出登录1</el-button>
  <p>{{ count }} 1</p>
  <p>{{ count2 }} 2</p>
  <el-button @click="addCount">加1</el-button>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<script lang="ts" setup>
import { logout, getUserInfo } from '@/api/user'
import useStore from '@/store'
import { computed, ref } from 'vue'

const count = ref<number>(useStore().count)
const addCount = () => {
  count.value++
}
const count2 = computed(() => useStore().count)

const getUser = () => {
  getUserInfo()
}
const logout1 = () => {
  logout()
  logout()
  logout()
}
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>
