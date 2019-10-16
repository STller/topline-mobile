/**
 * 频道相关接口模块
 */
import request from '@/utils/request'

/**
 * 获取用户默认推荐的频道列表
 */
export function getDefaultChannels () {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
/**
 * 获取所有频道
 */
export function getAllChannels () {
  return request({
    url: '/app/v1_0/channels',
    method: 'GET'
  })
}
