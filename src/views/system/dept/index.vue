<template>
  <base-container>
    <user-form width="500px" v-model="visible" :user-id="userId" @success="handleFormSuccess" />
    <el-button @click="edit" primary> 编辑 </el-button>
    <el-button @click="add" primary> 新增 </el-button>
  </base-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UserForm from '../user/UserForm.vue'
// dialog弹窗属性
const visible = ref<boolean>(false)
const userId = ref<number | null>(1)

const handleFormSuccess = () => {
  visible.value = false
  // TODO 重新加载页面数据
}

const add = () => {
  console.log('userId : %s', userId.value)
  userId.value = null
  console.log('userId : %s', userId.value)
  visible.value = true
}

const edit = () => {
  userId.value = 1
  console.log('userId : %s', userId.value)

  visible.value = true
}
</script>

<style lang="scss" scoped></style>
