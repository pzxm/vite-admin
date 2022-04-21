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
import { handleLogout, getUserInfo } from '@/api/user'
import useStore from '@/store'
import { computed, ref } from 'vue'

const store = useStore()

const count = ref<number>(store.count)
const addCount = () => {
  count.value++
}
const count2 = computed(() => store.count)

const getUser = () => {
  getUserInfo()
}
const logout1 = () => {
  handleLogout()
}
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>
