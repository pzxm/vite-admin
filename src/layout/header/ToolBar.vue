<template>
  <div class="nav-rigth">
    <el-icon size="24px"><bell /></el-icon>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar> user </el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.stop="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { handleLogout } from '@/api/user'
import { LOGIN_PAGE_NAME } from '@/constants/route'
import router from '@/router/'
import useStore from '@/store'
import { ElMessageBox } from 'element-plus'

const logout = () => {
  ElMessageBox.confirm('是否退出系统, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      handleLogout().then(() => {
        // 清除pinia数据
        useStore().reset()
        router.push(LOGIN_PAGE_NAME)
      })
    })
    .catch((reason) => {
      console.log('取消退出登录' + reason)
    })
}
</script>

<style lang="scss" scoped>
.nav-right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 120px;
  .el-dropdown {
    padding-right: 40px;
    padding-left: 0px;
  }
}
</style>
