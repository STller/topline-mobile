<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar class="nav-bar" title="首页" fixed>
      <van-button
        class="search-btn"
        slot="title"
        round
        type="info"
        size="small"
        text="搜索"
        @click="$router.push('/search')"
      ></van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 弹窗组件 -->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{height:'95%'}"
      round
      :closeable="true"
      close-icon-position="top-left"
    >
      <div class="channel-container">
        <van-cell title="我的频道" :border="false">
          <van-button
            type="danger"
            size="mini"
            @click="isEditShow = !isEditShow"
          >{{ isEditShow ? '完成' : '编辑' }}</van-button>
        </van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(item,index) in channels"
            :key="index"
            :text="item.name"
            @click="onMyChannelClick(index)"
          >
            <van-icon v-show="isEditShow" class="close-icon" slot="icon" name="close"></van-icon>
          </van-grid-item>
        </van-grid>
        <van-cell title="推荐频道" :border="false"></van-cell>
        <van-grid :gutter="10">
          <van-grid-item
            v-for="(value,index) in recommendChannels"
            :key="index"
            :text="value.name"
            @click="onAddChannel(value)"
          ></van-grid-item>
        </van-grid>
      </div>
    </van-popup>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <!-- 面包按钮通过van-tabs的nav-right插槽插入 -->
      <div slot="nav-right" class="wap-nav" @click="isChannelEditShow = true">
        <van-icon name="wap-nav" size="20px"></van-icon>
      </div>
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
            <van-cell
              v-for="(item,index) in channel.articles"
              :key="index"
              :title="item.title"
              @click="$router.push({
                name:'article', // name是router里定义的路由名字
                params:{
                  articleId:item.art_id.toString()
                }
              })">
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
 * 获取默认推荐的频道列表||获取所有频道
 */
import { getDefaultChannels, getAllChannels } from '@/api/channel'
import { setItem, getItem } from '@/utils/storage'
/**
 * 获取文章列表
 */
import { getArticles } from '@/api/articles'
export default {
  name: 'HomeIndex',
  data () {
    return {
      // 当前激活的频道
      active: 0,
      // list: [],
      // loading: false,
      // finished: false,
      // 我的频道列表
      channels: [],
      // 频道弹窗显示标志
      isChannelEditShow: false,
      allChannels: [],
      isEditShow: false
      // recommendChannels: []
    }
  },
  computed: {
    /**
     * 获取推荐频道列表
     * 定义的名字就是新的data数据
     */
    recommendChannels () {
      // 定义的推荐频道数据
      const arr = []
      this.allChannels.forEach(channel => {
        const result = this.channels.find(item => item.id === channel.id)
        // 总频道数据中找不到我的数据中的频道 就把数据压入推荐频道中去
        if (!result) {
          arr.push(channel)
        }
      })
      return arr
    }
  },
  watch: {
    /**
     * 监听active的数据变化
     */
    // active: function (newValue) {
    //   // console.log(newValue)
    // },
    /**
     * 一旦我的频道数据改变 就实现数据本地化
     */
    channels (newVal) {
      setItem('channels', newVal)
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
      // 先从本地读取存储的频道列表 不管有没有
      let channels = []
      let localChannels = getItem('channels')
      if (localChannels) {
        // 如果本地有 直接取用本地的
        channels = localChannels
        console.log(channels)
      } else {
        // 如果本地没有的话 转而发送请求 请求数据
        // data 解构赋值 为异步请求的返回值
        const { data } = await getDefaultChannels()
        channels = data.data.channels
      }
      // console.log(data)
      // const { data } = await getDefaultChannels()
      // const channels = data.data.channels
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
    },
    /**
     * 获取所有频道
     */
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    /**
     * 点击推荐频道向我的频道 添加频道
     */
    onAddChannel (value) {
      this.channels.push(value)
    },
    /**
     * 我的频道点击事件
     * 分为编辑模式与非编辑模式点击
     * 编辑模式下点击为删除 非编辑模式点击为进入该频道
     */
    onMyChannelClick (index) {
      if (this.isEditShow) {
        // index表示从哪个开始删除 1表示删除几个
        this.channels.splice(index, 1)
      } else {
        // 切换到当前激活的频道
        this.active = index
        this.isChannelEditShow = false
      }
    }
  },
  /**
   * 页面刷新获取我的频道与所有频道
   */
  mounted () {
    this.loadChannels()
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.home {
  .nav-bar .search-btn{
    margin-top: 8px;
    width: 100%;
  }
  .channel-container {
    padding-top: 30px;
    .close-icon {
      position: absolute;
      top: -5px;
      right: -5px;
    }
  }
  .van-tabs {
    /deep/ .van-tabs__content {
      margin-bottom: 50px;
      margin-top: 90px;
    }
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      z-index: 2;
      left: 0;
      right: 0;
    }
    .wap-nav {
      position: sticky;
      right: 0;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
    }
  }
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
