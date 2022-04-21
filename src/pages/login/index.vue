<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="https://s.weituibao.com/1582958061265/mlogo.png" />
        <div class="name">
          <div class="title">MOTE-AMDIN</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm" :loading="loding"
            >立即登录</el-button
          >
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserMenu, login } from '@/api/user'
import useStore from '@/store'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { IElForm, IFormItemRule } from '@/types/element-plus'
import { ElMessage } from 'element-plus'
import { HOME as homeMenu } from '@/utils/menu'
// import { HOME_PAGE } from '@/utils/menu'

const route = useRoute()
const router = useRouter()
const store = useStore()
const loginForm = ref<IElForm | null>(null)
const checked = ref(true)
const loding = ref(false)
const ruleForm = reactive({
  username: 'admin',
  password: '123456'
})

const rules = reactive<IFormItemRule>({
  username: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})
const submitForm = async () => {
  const valid = await loginForm.value?.validate()
  if (!valid) return false
  loding.value = true
  // 登录
  login('')
    .then((res) => {
      loding.value = false
      // 1. 保存token
      store.setAccessToken(res.token)
    })
    .then(() => {
      // 2. 获取菜单信息、封装动态路由
      return getUserMenu()
    })
    .then((data) => {
      // 3.获取菜单信息，添加首页菜单并存储到pinia中
      data.unshift(homeMenu)
      store.setMenuList(data)
    })
    .then(() => {
      // 4. 获取路由上的重定向地址，重定向到请求页面
      let redirect = route.query.redirect || '/'
      if (typeof redirect !== 'string') {
        redirect = '/'
      }
      router.replace(redirect)
    })
    .catch((reason) => {
      ElMessage.error(reason)
    })
}
</script>

<style lang="scss" scoped>
.login-body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>
