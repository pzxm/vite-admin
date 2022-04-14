<template>
  <h1>首页</h1>
  <p>{{ useStore.count }}</p>
  <el-button @click="changeCount()">测试按钮</el-button>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<script lang="ts" setup>
import appStore from '@/store/index'
const useStore = appStore()
const changeCount = () => {
  useStore.count++
}
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>
