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
/**
 * 获取单个文章的详情
 * @param {要查询的文章ID} articleId
 */
export function getArticle (articleId) {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleId}`
  })
}
/**
 * 点赞
 */
export function addLike (articleId) {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
/**
 * 取消点赞
 */
export function deleteLike (articleId) {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
/**
 * 对文章不喜欢
 */
export function addDislike (articleId) {
  return request({
    method: 'post',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}
/**
 * 取消对文章的不喜欢
 */
export function deleteDislike (articleId) {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/dislikes/${articleId}`
  })
}
