// 用户接口相关请求模块
// 方便接口重用
// 方便接口管理
// request是新的创建的axios实例
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
