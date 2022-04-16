<template>
  <el-dropdown>
    <el-button type="primary" size="large">
      更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click.stop="closeOtherTab"
          >关闭其他</el-dropdown-item
        >
        <el-dropdown-item @click.stop="closeAllTab">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ROOT_PATH } from '@/constants/route'
import router from '@/router/'
import useStore from '@/store'

const store = useStore()

/**
 * 关闭其他tab
 */
const closeOtherTab = () => {
  store.closeOtherTab()
}
/**
 * 关闭所有tab
 */
const closeAllTab = () => {
  store.closAllTab()
  if (store.activeTab !== ROOT_PATH) {
    // 跳转回首页
    router.push({ path: ROOT_PATH })
  }
}
</script>

<style lang="scss" scoped></style>
