// 用户接口相关请求模块
// request是新的axios实例
import request from '@/utils/request'
/**
 * 登陆
 */
export function login (data) {
  return request({
    method: 'POST',
    url: 'app/v1_0/authorizations',
    data
  })
}
/**
 * 关注用户
 */
export function followUser (userId) {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId // 用户的ID
    }
  })
}
/**
 * 取消关注用户
 */
export function unFollowUser (userId) {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
