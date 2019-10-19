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
