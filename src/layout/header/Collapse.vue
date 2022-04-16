<template>
  <el-icon @click="changeCollapse" size="20px">
    <component :is="isCollapse ? 'expand' : 'fold'" />
  </el-icon>
</template>

<script lang="ts" setup>
import useStore from '@/store/index'
import { computed } from 'vue'
const store = useStore()

// 获取pinia中的isCollapse属性
const isCollapse = computed(() => store.isCollapse)

// 重新设置pinia中的isCollapse
const changeCollapse = () => {
  store.setIsCollapse(!isCollapse.value)
}
</script>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
  margin-right: 15px;
}
</style>
