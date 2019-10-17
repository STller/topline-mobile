/**
 * 搜索相关模块
 */
import request from '@/utils/request.js'
export function getSearchSuggestions (params) {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params
  })
}
/**
 * 根据请求结果获取搜索结果
 */
export function getSearch (params) {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
