<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <menu-bar />
      </el-aside>
      <el-container>
        <el-header>
          <app-header />
        </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MenuBar from '@/layout/siderbar/MenuBar.vue'
import AppHeader from '@/layout/header/index.vue'
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #ffff;
  color: #333;
  line-height: 30px;
}

.el-aside {
  background-color: #304156;
  color: #333;
  width: auto;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
