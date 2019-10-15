/**
 * 专门处理时间的工具模块
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(rTime)
dayjs.locale('zh-cn')
Vue.filter('relativeTime', value => {
  return dayjs().from(dayjs(value))
})
