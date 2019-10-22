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
/**
 * 获取用户自己的信息
 */
export function getSelf (userId) {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
/**
 * 获取用户个人资料
 */
export function getProfile () {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
/**
 * 更新用户头像
 */
export function updateUserPhoto (data) {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/photo',
    data
  })
}
