<template>
  <div class="article-comment">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right:10px"
          :src="item.aut_photo"
        ></van-image>
        <span style="color:#466b9d" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color:#363636">{{item.content}}</p>
          <p>
            <span style="margin-right:10px">{{item.pubdate|relativeTime}}</span>
            <van-button size="mini" type="default">{{item.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o"></van-icon>
      </van-cell>
    </van-list>
    <!-- /评论列表 -->
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {},
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 上拉加载是否结束
      offset: null, // 获取下一页数据的页码，第一页就是null
      limit: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComments({
        type: 'a', // ‘a’对文章的评论 ‘c’对评论的回复
        source: this.$route.params.articleId,
        offset: this.offset // 表示从此id的数据向后取 不传表示从第一页开始读取数据
      })
      // 将返回的评论数据压入list中
      this.list.push(...data.data.results)
      // 结束本次的loading
      this.loading = false
      // 如果后面还有数据
      if (data.data.results.length) {
        this.offset = data.data.last_id
      } else {
        // 如果后面没有数据了
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrap{
    position: fixed;
    bottom: 0;
    width: 100%;
}
.van-list{
    margin-bottom: 45px;
}
</style>
