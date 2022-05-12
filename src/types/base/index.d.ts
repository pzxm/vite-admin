/**
 * 排序字段
 */
export interface SortField {
  field:string
  // 排序字段 true:升序 false：降序
  asc:boolean 
}
/**
 * 分页查询
 */
export interface PageRequest {
  pageNum: number
  pageSize: number
  sortFields: SortField[]
}

/**
 * 分页结果
 */
export interface PageResult<T> {
  pageNum: number
  pageSize: number
  total: number
  totalPage: number
  list: Array<T>
}


/**
 * 响应数据
 */
 export interface R<T = any> {
  code: number
  message: string
  data: T
}

/**
 * 弹窗属性类型声明
 */
 export interface Dialog {
  title: string;
  visible: boolean;
}
