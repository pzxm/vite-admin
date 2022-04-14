<template>
  <h1>首页</h1>
  <p>{{ store.count }}</p>
  <el-button @click="changeCount()">测试按钮</el-button>
  <el-date-picker type="date" placeholder="Pick a day" />
</template>

<script lang="ts" setup>
import useStore from '@/store/index'
const store = useStore()
const changeCount = () => {
  store.count++
}
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>
