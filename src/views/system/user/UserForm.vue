<template>
  <dialog-form
    :title="title"
    @closed="handleDialogClosed"
    @open="handleDialogOpen"
    @submit="handleSubmit"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="loading"
    >
      <el-form-item label="管理员账号" prop="account">
        <el-input v-model="formData.account" placeholder="请输入管理员账号" />
      </el-form-item>
      <el-form-item label="管理员密码" prop="pwd">
        <el-input v-model="formData.pwd" type="password" placeholder="请输入管理员密码" />
      </el-form-item>
      <el-form-item label="确认密码" prop="conf_pwd">
        <el-input v-model="formData.conf_pwd" type="password" placeholder="请输入确认密码" />
      </el-form-item>
      <el-form-item label="管理员姓名" prop="real_name">
        <el-input v-model="formData.real_name" placeholder="请输入管理员姓名" />
      </el-form-item>
      <el-form-item label="管理员身份" prop="roles">
        <el-select
          :teleported="false"
          multiple
          v-model="formData.roles"
          placeholder="请选择管理员身份"
        >
          <el-option key="1" label="管理员" value="1" />
          <el-option key="2" label="用户" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1"> 开启 </el-radio>
          <el-radio :label="0"> 关闭 </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </dialog-form>
</template>

<script lang="ts" setup>
import type { IElForm, IFormItemRule } from '@/types/other/element-plus'
import { ElMessage } from 'element-plus'
import { PropType, ref } from 'vue'

const props = defineProps({
  userId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

const loading = ref<boolean>(false)
const form = ref<IElForm | null>(null)
const title = ref<string>('')

const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})

const emit = defineEmits<{
  (e: 'update:user-id', value: number | null): void
  (e: 'success'): void
}>()

const formRules: IFormItemRule = {
  account: [{ required: true, message: '请输入管理员账号', trigger: 'blur' }],
  pwd: [{ required: true, message: '请输入管理员密码', trigger: 'blur' }],
  conf_pwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
  roles: [{ required: true, message: '请选择管理员角色', trigger: 'blur' }],
  real_name: [{ required: true, message: '请输入管理员姓名', trigger: 'blur' }]
}

const handleDialogOpen = () => {
  title.value = props.userId ? '编辑用户' : '新增用户'
  loading.value = true
  // TODO 加载数据
  loading.value = false
}

const handleDialogClosed = () => {
  emit('update:user-id', null)
  // 清除验证结果
  form.value?.clearValidate()
  // 清除表单数据
  form.value?.resetFields()
}

const handleSubmit = async () => {
  console.log('提交表单')

  const valid = await form.value?.validate()
  if (!valid) {
    return
  }
  if (props.userId) {
    // 更新管理员
    console.log('更新用户' + props.userId)
  } else {
    // 添加管理员
    console.log('新增用户')
  }
  emit('success')
  ElMessage.success('保存成功')
}
</script>

<style lang="scss" scoped></style>
