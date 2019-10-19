/**
 * 获取评论
 */
import request from '@/utils/request'
export function getComments (params) {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}
/**
 * 发布文章评论
 */
export function addComment (data) {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}
/**
 * 对文章点赞
 */
export function addCommentLike (commentId) {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
/**
 * 对文章取消点赞
 */
export function deleteCommentLike (commentId) {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
