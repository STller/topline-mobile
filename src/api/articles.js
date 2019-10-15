/**
 * 文章接口请求封装
 */
import request from '@/utils/request.js'

/**
 *获取文章列表
 * @param {请求参数} params
 */
export function getArticles (params) {
  return request({ // 返回请求数据
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
