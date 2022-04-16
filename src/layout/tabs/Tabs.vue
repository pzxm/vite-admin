<template>
  <el-tabs
    :model-value="activeTab"
    @tab-click="clickBtn"
    type="card"
    closable
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.key"
      :label="item.label"
      :name="item.name"
    ></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import router from '@/router/'
import { TabPanelName, TabsPaneContext } from 'element-plus'
import { computed } from 'vue'
import useStore from '@/store'

const store = useStore()
// 当前打开的选项开列表
const tabList = computed(() => store.tabList)
// store中存储的当前激活选项卡
const activeTab = computed(() => store.activeTab)

/**
 * 移除Tab选项
 */
const removeTab = (targetName: TabPanelName | string) => {
  store.removeTab(targetName as string)
  // 跳转路由
  router.push(activeTab.value)
}

// 点击选项卡
const clickBtn = (tab: TabsPaneContext) => {
  // const paneName  = tab.props.name
  // 跳转路由
  router.push({ path: tab.paneName as string })
}
</script>

<style lang="scss" scoped>
.el-tabs {
  background-color: #ffffff;
}
</style>
