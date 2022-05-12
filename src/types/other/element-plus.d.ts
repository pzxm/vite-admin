import { ElForm, FormItemRule, ElTree, ElTable, ElDialog } from 'element-plus'

export type IElForm = InstanceType<typeof ElForm>

export type IFormItemRule = Record<string, FormItemRule[]>

export type IElTree = InstanceType<typeof ElTree>

export type IElTable =  InstanceType<typeof ElTable>

export type IElDialog = InstanceType<typeof ElDialog>
