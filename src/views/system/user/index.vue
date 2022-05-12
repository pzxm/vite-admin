<template>
  <div class="base-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="dept-tree">
          <el-card shadow="never">
            <el-input
              v-model="filterText"
              placeholder="输入关键字进行过滤"
              prefix-icon="Search"
              style="margin-bottom: 10px"
            />
            <el-tree
              ref="treeRef"
              class="filter-tree"
              :data="deptOptions"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            />
          </el-card>
        </div>
      </el-col>
      <el-col :span="20">
        <el-form ref="queryFormRef" :model="queryParam" :inline="true">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="queryParam.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item label="联系电话" prop="telephone">
            <el-input v-model="queryParam.telephone" placeholder="联系电话" />
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-select v-model="queryParam.gender" placeholder="性别">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="queryParam.status" placeholder="用户状态">
              <el-option label="正常" :value="0" />
              <el-option label="禁用" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery" icon="Search">搜索</el-button>
            <el-button @click="handleReset" icon="Refresh">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" @click="handleUpdate">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" @click="handleDelete">删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="info" plain icon="Upload" @click="handleDelete">导入</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleDelete">导出</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="multipleTableRef"
          :data="userList"
          stripe
          border
          v-loading="loading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            fixed
            type="index"
            label="序号"
            :index="indexMethod"
            width="60px"
            align="center"
          />
          <el-table-column prop="username" label="用户名" align="center" width="120px" />
          <el-table-column prop="nickname" label="昵称" align="center" width="120px" />
          <el-table-column prop="avatar" label="头像" align="center" show-overflow-tooltip />
          <el-table-column prop="gender" label="性别" align="center" width="80px">
            <template #default="scope">
              <span>{{ scope.row.gender === 0 ? '女' : '男' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="telephone" label="联系电话" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="status" label="状态" align="center" width="80px">
            <template #default="scope">
              <el-switch
                inline-prompt
                active-text="启用"
                :active-value="0"
                inactive-text="禁用"
                v-model="scope.row.status"
                :inactive-value="1"
                @change="editStatus(scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center" width="150px">
            <template #default="scope">
              <el-button type="text" size="small" @click="handleDelete">授权</el-button>
              <el-button type="text" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-if="total > 0"
          :total="total"
          v-model:page="queryParam.pageNum"
          v-model:limit="queryParam.pageSize"
          @pagination="handleQuery"
        />
      </el-col>
    </el-row>

    <!-- 用户表单 -->
    <el-dialog
      :title="dialog.title"
      v-model="dialog.visible"
      width="600px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="userFormRef" :model="userFormData" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input
            :readonly="!!userFormData.id"
            v-model="userFormData.username"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userFormData.nickname" placeholder="请输入用户昵称" />
        </el-form-item>

        <el-form-item label="所属部门" prop="deptId">
          <el-tree-select
            :teleported="false"
            v-model="userFormData.deptId"
            placeholder="请选择所属部门"
            :data="deptOptions"
            filterable
            check-strictly
          />
        </el-form-item>

        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="userFormData.telephone" placeholder="请输入手机号码" maxlength="11" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userFormData.email" placeholder="请输入邮箱" maxlength="50" />
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userFormData.status">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="性别" prop="gender">
          <el-select v-model="userFormData.gender" placeholder="请选择">
            <el-option label="女" :value="0" />
            <el-option label="男" :value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
          <el-button @click="handleCancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { addUser, getUserInfo, page, updateUser } from '@/api/user'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, watch } from 'vue'
import type { IElTree, IElForm, IElTable } from '@/types/other/element-plus'
import { UserFormData, UserInfo, UserQuery } from '@/types/system/user'
import { Dialog } from '@/types/base'

const multipleTableRef = ref<IElTable>()
const queryFormRef = ref<IElForm | null>(null)
const userFormRef = ref<IElForm | null>(null)
const total = ref<number>(0)
const loading = ref<boolean>(true)
const userList = ref<UserInfo[]>([])
const multipleSelection = ref<UserInfo[]>([])
const queryParam = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 10,
  sortFields: [],
  username: '',
  gender: undefined,
  deptId: undefined,
  status: undefined,
  telephone: ''
})

const userFormData = reactive<UserFormData>({
  username: '',
  gender: 0,
  deptId: 0,
  status: 0,
  telephone: '',
  nickname: '',
  birthday: '',
  password: '',
  email: '',
  avatar: ''
})

// dialog弹窗属性
const dialog = reactive<Dialog>({
  title: '用户管理',
  visible: false
})

// 选中行数据
const handleSelectionChange = (val: UserInfo[]) => {
  multipleSelection.value = val
}

/**
 * 表单提交
 */
function handleConfirm() {
  const userId = userFormData.id
  if (userId) {
    updateUser(userFormData).then(() => {
      ElMessage.success('修改用户成功')
    })
  } else {
    addUser(userFormData).then(() => {
      ElMessage.success('新增用户成功')
    })
  }
  handleCancel()
  handleQuery()
}

/**
 * 取消表单提交
 */
function handleCancel() {
  dialog.visible = false
  userFormData.id = undefined
  userFormRef.value?.resetFields()
}

const indexMethod = (index: number) => {
  return index + 1
}

/**
 * 查询用户信息
 */
function handleQuery() {
  loading.value = true
  page(queryParam)
    .then((data) => {
      userList.value = data.list
      total.value = data.total
    })
    .finally(() => {
      loading.value = false
    })
}

/**
 * 重置搜索条件
 */
const handleReset = () => {
  console.log(queryFormRef.value)
  queryFormRef.value?.resetFields()
}

/**
 * 更新用户状态
 */
const editStatus = (row: any) => {
  // TODO 调用接口，更新状态
  const status = row.status
  const id = row.id
  console.log('id %s status %s', id, status)
}

/**
 * 新增用户
 */
function handleAdd() {
  dialog.title = '新增用户'
  dialog.visible = true
}

/**
 * 更新用户
 */
function handleUpdate(row: { [key: string]: any }) {
  let id: number
  if (row.id) {
    id = row.id
  } else {
    if (multipleSelection.value.length > 1) {
      ElMessage.error('不能同时修改多个用户信息')
      return
    }
    if (multipleSelection.value.length < 1) {
      ElMessage.error('请选择要修改的用户')
      return
    }
    id = multipleSelection.value[0].id
  }
  dialog.title = '修改用户'
  dialog.visible = true
  // TODO 根据用户id 获取用户详细信息
  getUserInfo(id).then((data) => {
    userFormData.id = id
    userFormData.nickname = data.nickname
    userFormData.username = data.username
    userFormData.email = data.email
    userFormData.telephone = data.telephone
    userFormData.gender = data.gender
    userFormData.status = data.status
    userFormData.deptId = data.deptId
  })
}

const handleDelete = (row: { [key: string]: any }) => {
  let ids = []
  if (row.id) {
    ids.push(row.id)
  } else {
    ids = multipleSelection.value.map((item) => item.id)
  }
  if (ids.length <= 0) {
    ElMessage.error('请选择要删除的用户')
    return
  }
  ElMessage.success('删除成功 ' + ids)
}

onMounted(() => {
  handleQuery()
})

interface Tree {
  id: number
  value: number
  label: string
  children?: Tree[]
}

const filterText = ref('')
const treeRef = ref<IElTree>()

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: any) => {
  if (!value) return true
  return data.label.includes(value)
}

/**
 * 部门树节点点击事件
 */
function handleNodeClick(data: any) {
  queryParam.deptId = data.id
  handleQuery()
}

const deptOptions: Tree[] = [
  {
    id: 1,
    value: 1,
    label: '天天向上公司',
    children: [
      {
        id: 4,
        value: 4,
        label: '研发部',
        children: [
          {
            id: 9,
            value: 9,
            label: '产品部'
          },
          {
            id: 10,
            value: 10,
            label: '技术部'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    value: 2,
    label: '北京分公司',
    children: [
      {
        id: 5,
        value: 5,
        label: '财务部'
      },
      {
        id: 6,
        value: 6,
        label: '人力资源部'
      }
    ]
  },
  {
    id: 3,
    value: 3,
    label: '深圳分公司',
    children: [
      {
        id: 7,
        value: 7,
        label: '运维部'
      },
      {
        id: 8,
        value: 8,
        label: '市场部'
      }
    ]
  }
]
</script>

<style lang="scss" scoped>
.base-container {
  padding: 20px;
  margin: 10px 10px;
  height: 100%;
  background-color: #fff;
}
.el-table {
  margin-top: 10px;
}
.el-card {
  border: none;
  --el-card-padding: 0;
}
</style>
