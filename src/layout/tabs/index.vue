<template>
  <div class="tab-container">
    <div class="tab-container__box">
      <el-tabs
        type="card"
        :model-value="activeTab"
        @tab-click="clickBtn"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane v-for="item in tabList" :key="item.key" :label="item.label" :name="item.name">
        </el-tab-pane>
      </el-tabs>
      <el-dropdown class="tab-container__menu">
        <el-button type="primary" size="default">
          更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click.stop="closeOtherTab"> 关闭其他</el-dropdown-item>
            <el-dropdown-item @click.stop="closeAllTab">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router/'
import { computed } from 'vue'
import useStore from '@/store'
import { ROOT_PATH } from '@/constants/route'
import { TabPanelName, TabsPaneContext } from 'element-plus'

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
