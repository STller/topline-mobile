<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <!-- 文章列表 -->
        <!-- 下拉刷新组件 -->
        <van-pull-refresh v-model="channel.isPullDownLoading" @refresh="onRefresh">
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- 每一行的文章内容 -->
            <van-cell v-for="(item,index) in channel.articles" :key="index" :title="item.title">
              <div slot="label">
                <!-- <div :slot="title"><p>{{item.title}}</p></div> -->
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img,index) in item.cover.images" :key="index">
                    <van-image lazy-load height="80" :src="img"></van-image>
                  </van-grid-item>
                </van-grid>
                <div class="article-info">
                  <div class="meta">
                    <span>用户：{{item.aut_name}}</span>
                    <span>评论数：{{item.comm_count}}</span>
                    <span>创建时间：{{item.pubdate|relativeTime}}</span>
                  </div>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
/**
 * 获取默认推荐的频道列表
 */
import { getDefaultChannels } from '@/api/channel'
import { getArticles } from '@/api/articles'
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
       * 请求获取文章数据
       */
      const { data } = await getArticles({
        channel_id: activeChannel.id, // 频道ID
        timestamp: activeChannel.timestamp || Date.now(), // 将当前的时间戳传送，没有的话就传当前的时间
        with_top: 1
      })
      // 返回的文章保存到当前频道中
      activeChannel.articles.push(...data.data.results)
      // 结束刷新行为
      activeChannel.loading = false
      // 返回的数据中还有时间戳的话
      if (data.data.pre_timestamp) {
        activeChannel.timestamp = data.data.pre_timestamp
      } else {
        // 返回的数据中没有时间戳了，代表后边没有数据了
        activeChannel.finished = true
      }
      // await setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     activeChannel.articles.push(activeChannel.articles.length + 1)
      //   }
      //   // 加载状态结束
      //   activeChannel.loading = false
      //   // 数据全部加载完成
      //   if (activeChannel.articles.length >= 40) {
      //     activeChannel.finished = true
      //   }
      // }, 500)
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
        channel['timestamp'] = null // 存储频道下一页的时间戳
        channel['isPullDownLoading'] = false // 存储频道的下拉刷新状态
      })
      // 返回的默认频道列表赋予data中的channels
      this.channels = channels
    },
    /**
     * 下拉刷新处理函数
     */
    async onRefresh () {
      // 获取当前激活的频道对象
      const activeChannel = this.channels[this.active]
      // 请求获取最新推荐的频道列表
      const { data } = await getArticles({
        channel_id: activeChannel.id,
        timestamp: Date.now(), // 下拉刷新永远在获取最新的文章列表，所以传最新时间戳
        with_top: 1
      })
      activeChannel.articles.unshift(...data.data.results) // 将最新获取的文章添加到文章的顶部
      activeChannel.isPullDownLoading = false // 关闭下拉刷新的loading状态
      this.$toast('刷新成功')
    }
  },
  created () {
    // 页面刷新调用频道获取
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
.home {
  .article-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .meta span {
      margin-right: 10px;
    }
  }
}
</style>
