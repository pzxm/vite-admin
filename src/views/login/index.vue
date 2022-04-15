<template>
  <el-form
    label-position="left"
    label-width="100px"
    :model="loginForm"
    style="max-width: 460px"
  >
    <el-form-item label="用户名">
      <el-input v-model="loginForm.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        :type="passwordType"
        @click="showPassword"
        v-model="loginForm.password"
      />
    </el-form-item>
    <el-button @click="handleLogin">登录</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { login, getUserInfo } from '@/api/user'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/store'

const router = useRouter()
const route = useRoute()

const loginForm = reactive({
  username: 'admin',
  password: 123456
})
const passwordType = ref<string>('password')

const showPassword = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const handleLogin = () => {
  login('').then((res) => {
    useStore().setAccessToken(res.token)
    getUserInfo()
    // 获取路由上的重定向地址
    let redirect = route.query.redirect || '/'
    if (typeof redirect !== 'string') {
      redirect = '/'
    }
    router.replace(redirect)
  })
}
</script>

<style lang="scss" scoped></style>
