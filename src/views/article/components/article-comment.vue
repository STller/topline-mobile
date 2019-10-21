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
            <van-button
                size="mini"
                type="default"
                @click="onReplyShow(item)">
                回复{{item.reply_count}}
            </van-button>
          </p>
        </div>
        <van-icon
            slot="right-icon"
            :name="item.is_liking?'like':'like-o'"
            @click="onCommentLike(item)"></van-icon>
      </van-cell>
    </van-list>
    <!-- /评论列表 -->
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field v-model="commentText" clearable placeholder="请输入评论内容">
        <van-button
            slot="button"
            size="mini"
            type="info"
            @click="onAddComment(commentText)"
            >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <!-- 评论回复 -->
    <van-popup
        v-model="isReplyShow"
        round
        position="bottom"
        style="height:90%">
    <CommentReply :comment="currentComment"/>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getComments, addComment, addCommentLike, deleteCommentLike } from '@/api/comment'
import CommentReply from '@/views/article/components/comment-reply'
export default {
  name: 'ArticleComment',
  props: {},
  components: {
    CommentReply
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 上拉加载是否结束
      offset: null, // 获取下一页数据的页码，第一页就是null
      limit: 10, // 每页大小
      commentText: '', // 评论内容
      isReplyShow: false, // 控制评论弹窗弹出或隐藏
      currentComment: {} // 查看回复的当前评论
    }
  },
  methods: {
    /**
     * 加载评论
     */
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
    },
    /**
     * 发表评论
     */
    async onAddComment () {
      // 获取评论内容
      const commentText = this.commentText.trim()
      if (!commentText) {
        return
      }
      const { data } = await addComment({
        target: this.$route.params.articleId, // 评论的目标ID
        content: commentText // 评论内容
      })
      // 将最新添加的评论数据放在顶部展示
      this.list.unshift(data.data.new_obj)
      // 评论输入框清空
      this.commentText = ''
    },
    /**
     * 评论点赞或取消点赞
     */
    async onCommentLike (comment) {
      const commentId = comment.com_id.toString()
      if (comment.is_liking) {
        // 已赞 则取消点赞
        await deleteCommentLike(commentId)
      } else {
        // 未赞 添加点赞
        await addCommentLike(commentId)
      }
      // 反转点赞的状态
      comment.is_liking = !comment.is_liking
    },
    /**
     * 控制回复评论的弹窗
     */
    onReplyShow (item) {
      this.currentComment = item
      this.isReplyShow = true
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
