<template>
  <el-icon @click="changeCollapse" size="20px">
    <component :is="isCollapse ? 'expand' : 'fold'" />
  </el-icon>
</template>

<script lang="ts" setup>
import useStore from '@/store/index'
import { computed } from 'vue'
const { menuStore } = useStore()

// 获取pinia中的isCollapse属性
const isCollapse = computed(() => menuStore.isCollapse)

// 重新设置pinia中的isCollapse
const changeCollapse = () => {
  menuStore.setIsCollapse(!isCollapse.value)
}
</script>

<style lang="scss" scoped>
.el-icon {
  cursor: pointer;
  margin: 10px 10px;
}
</style>
