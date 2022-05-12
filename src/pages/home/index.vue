<template>
  <h1>首页</h1>
  <el-button @click="getUser">获取用户信息</el-button>
  <el-button @click="logout1">退出登录1</el-button>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<script lang="ts" setup>
import { handleLogout, getUserInfo } from '@/api/user'
import { PageRequest } from '@/types/base'
const page: PageRequest = {
  pageNum: 1,
  pageSize: 10,
  sortFields: [
    {
      field: 'true',
      asc: true
    }
  ]
}
console.log(JSON.stringify(page))

const getUser = () => {
  getUserInfo(1)
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
