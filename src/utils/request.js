// axios相关请求在这里
import axios from 'axios'
import jsonBig from 'json-bigint'

// 复制了一个axios 因为有时需要单独定制不同的请求
// 可以设置多个 request 请求对象 每个对象拥有不同的配置
const request = axios.create({
  // 请求的基础路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 解决大数问题
request.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : {}
}]

export default request
