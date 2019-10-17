/**
 *一个专门操作本地存储的API模块
 *存的时候转json-parse 取的时候json-stringfy
 */
/**
 * 获取本地存储
 */
export const getItem = name => {
  return JSON.parse(window.localStorage.getItem(name))
}
/**
 * 添加本地存储
 * JSON.stringfy转数据为本地存储的JSON格式
 * @param {*} name
 * @param {*} data
 */
export const setItem = (name, data) => {
  window.localStorage.setItem(name, JSON.stringify(data))
}
/**
 * 删除本地存储
 * @param {*} name
 */
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
