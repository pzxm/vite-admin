<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <side-bar />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <app-tabs />
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import SideBar from '@/layout/siderbar/index.vue'
import AppHeader from '@/layout/header/index.vue'
import AppTabs from '@/layout/tabs/index.vue'
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header,
.el-footer {
  --el-header-padding: 0;
  background-color: #ffffff;
  color: #333;
  line-height: 30px;
}

.el-aside {
  background-color: #304156;
  color: #333;
  width: auto;
}

.el-main {
  --el-main-padding: 0px;
  background-color: #e9eef3;
  color: #333;
}
.app-tabs {
  padding-top: 0px;
}
</style>
