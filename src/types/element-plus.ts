import { ElForm, FormItemRule } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>

export type IFormItemRule = Record<string, FormItemRule[]>
