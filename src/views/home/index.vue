<template>
  <h1>首页</h1>
  <el-button @click="getUser">获取用户信息</el-button>
  <el-button @click="logout1">退出登录1</el-button>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<script lang="ts" setup>
import { logout, getUserInfo } from '@/api/user'
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
