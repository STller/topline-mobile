<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 loading -->
    <van-loading class="article-loading" v-if="loading"/>
    <!-- /加载中 loading -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate}}</p>
        </div>
        <van-button
          round
          size="small"
          type="info"
          @click="onFollow"
        >{{article.is_followed?'取消关注':'+ 关注'}}</van-button>
      </div>
      <!-- 利用了v-html的组件 -->
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button
            round size="small"
            hairline
            :type="article.attitude === 1?'default':'primary'"
            plain
            :icon="article.attitude === 1?'good-job':'good-job-o'"
            @click="onLike"
            >{{article.attitude === 1?'取消点赞':'点赞'}}</van-button>
            &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
            round
            size="small"
            hairline
            type="danger"
            plain
            icon="delete"
            @click="onDislike">{{article.attitude === 0?'取消不喜欢':'不喜欢'}}</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败的消息提示 -->
    <div class="error" v-else>
      <p>网络超时，点击 <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。</p>
    </div>
    <!-- /加载失败的消息提示 -->
  </div>
</template>

<script>
import { getArticle, addLike, deleteLike, addDislike, deleteDislike } from '@/api/articles'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      loading: false, // 控制加载中的 loading 状态
      article: { // 文章详情
        title: 'hello world',
        content: '<p>hello hello</p>',
        aut_name: 'LPZ',
        pubdate: '4天前',
        aut_photo: 'http://toutiao.meiduo.site/FsyeQUotMscq-vji-2ZDiXrc44k5',
        is_followed: false,
        attitude: ''
      }
    }
  },
  methods: {
    /**
     * 获取单个文章
     */
    async loadArticle () {
      // 开启loading显示
      this.loading = true
      // 捕捉异步获取中出的错误
      try {
        const { data } = await getArticle(this.$route.params.articleId)
        this.article = data.data
      } catch (error) {
        console.log(error)
      }
      // 无论加载成功还是失败 loading都要结束
      this.loading = false
    },
    /**
     * 关注或取消关注
     */
    onFollow () {
      // 对is_followed做取反处理
      this.article.is_followed = ~this.article.is_followed
    },
    /**
     * 点赞
     */
    async onLike () {
      const articleId = this.article.art_id.toString()
      // 如果已赞 则取消点赞
      if (this.article.attitude === 1) {
        await deleteLike(articleId)
        this.article.attitude = -1
      } else {
        // 否则点赞
        await addLike(articleId)
        this.article.attitude = 1
      }
    },
    /**
     * 不喜欢/取消不喜欢
     */
    async onDislike () {
      const articleId = this.article.art_id.toString()
      // 如果是不喜欢状态 则取消不喜欢
      if (this.article.attitude === 0) {
        await deleteDislike(articleId)
        this.article.attitude = -1
      } else {
        // 否则 不喜欢
        await addDislike(articleId)
        this.article.attitude = 0
      }
    }
  },
  created () {
    /**
     * 调用获取文章的方法
     */
    this.loadArticle()
  }
}
</script>

<style lang='less' scoped>
.detail{
    padding: 50px 0;
    .title{
        font-size: 16px;
    }
    .zan{
        text-align: center;
    }
    .author{
        padding: 10px 0;
        display: flex;
        .text{
            flex: 1;
            padding-left: 10px;
            line-height: 1.3;
            .name{
                font-size: 14px;
                margin: 0;
            }
            .time{
                margin: 0;
                font-size: 12px;
                color: #999;
            }
        }
    }
    .content{
        overflow: hidden;
        white-space: pre-wrap;
        word-break: break-all;
        /deep/ img{
            min-width: 100%;
            background: #f9f9f9;
        }
    }
}
</style>
