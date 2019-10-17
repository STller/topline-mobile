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
