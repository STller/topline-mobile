<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <van-list
          v-model="channel.loading"
          :finished="channel.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="item in channel.articles" :key="item" :title="item"></van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
/**
 * 获取默认推荐的频道列表
 */
import { getDefaultChannels } from '@/api/channel'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      list: [],
      // loading: false,
      // finished: false,
      channels: []
    }
  },
  watch: {
    /**
     * 监听active的数据变化
     */
    active: function (newValue) {
      // console.log(newValue)
    },
    channels: function (newValue) {
      console.log(newValue)
    }
  },
  methods: {
    /**
     * 点击频道列表
     */
    async onLoad () {
      // 当前激活的频道对象
      const activeChannel = this.channels[this.active]
      /**
       * 请求获取对象
       */
      await setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          activeChannel.articles.push(activeChannel.articles.length + 1)
        }
        // 加载状态结束
        activeChannel.loading = false
        // 数据全部加载完成
        if (activeChannel.articles.length >= 40) {
          activeChannel.finished = true
        }
      }, 500)
      // console.log(activeChannel, this.channels)
    },
    /**
     * 获取频道列表
     */
    async loadChannels () {
      // data 解构赋值 为异步请求的返回值
      const { data } = await getDefaultChannels()
      const channels = data.data.channels
      // console.log(data)
      channels.forEach(channel => {
        /** 为每个频道添加独立的存储属性 */
        channel['articles'] = [] // 存储频道的文章列表
        channel['finished'] = false // 存储频道的加载结束状态
        channel['loading'] = false // 存储频道的加载更多的loading状态
      })
      // 返回的默认频道列表赋予data中的channels
      this.channels = channels
    }
  },
  created () {
    // 页面刷新调用频道获取
    this.loadChannels()
  }
}
</script>

<style>
</style>
