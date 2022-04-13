<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <app-menu />
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AppMenu from '@/layout/components/AppMenu.vue'
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #304156;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
