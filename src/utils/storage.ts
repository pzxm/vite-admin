/**
 * 获取本地存储内容
 * @param key key
 * @returns 值
 */
export const getItem = <T>(key: string) => {
  const data = window.localStorage.getItem(key)
  if (!data) return null
  try {
    return JSON.parse(data) as T
  } catch (error) {
    return null
  }
}

/**
 * 移除本地存储
 * @param key key
 */
export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}

/**
 * 设置本地存储
 * @param key key
 * @param value 值
 */
export const setItem = (key: string, value: object | string | null) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

export const clearAll = () => {
  window.localStorage.clear()
}
