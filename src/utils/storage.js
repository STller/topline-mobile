/**
 *一个专门操作本地存储的API模块
 */
export const getItem = (name) => {
  return window.localStorage.getItem(name)
}
export const setItem = (name, data) => {
  return window.localStorage.setItem(name, data)
}
export const removeItem = (name) => {
  return window.localStorage.removeItem(name)
}
