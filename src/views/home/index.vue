<template>
  <h1>首页</h1>
  <el-button>测试按钮</el-button>
  <el-date-picker v-model="value1" type="date" placeholder="Pick a day" />
</template>

<script lang="ts" setup>
const value1 = ''
</script>

<style lang="scss" scoped>
h1 {
  color: $color;
}
</style>
