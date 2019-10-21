<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count+'条回复'">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 当前评论 -->
    <van-cell
      title="当前评论">
      <van-image
        slot="icon"
        round width="30"
        height="30"
        style="margin-top:10px"
        :src="comment.aut_photo"></van-image>
      <span style="color:#466b9d" slot="title">{{comment.aut_name}}</span>
      <div slot="label">
        <p style="color:#363636">{{comment.content}}</p>
        <p>
          <span style="margin-top:10px">{{comment.pubdate|relativeTime}}</span>
          <van-button size="mini" type="default">回复{{comment.reply_count}}</van-button>
        </p>
      </div>
    </van-cell>
    <!-- /当前评论 -->
    <van-cell title="全部评论"></van-cell>
    <!-- 回复列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.aut_name">
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
            <span style="margin-top:10px">{{item.pubdate|relativeTime}}</span>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="item.is_liking?'liek':'like-o'"
          @click="onCommentLike(item)"
        ></van-icon>
      </van-cell>
    </van-list>
    <!-- /回复列表 -->
    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field v-model="commentText" clearable placeholder="请输入评论内容">
        <van-button text="发布回复" slot="button" size="mini" type="info" @click="onAddComment"></van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
  </div>
</template>

<script>
import { getComments, addComment, addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentReply',
  props: ['comment'], // 从父组件接收的数据
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的loading
      finished: false, // 是否加载结束
      offset: null, //
      commentText: '' //
    }
  },
  methods: {
    /**
     * 请求获取数据
     */
    async onLoad () {
      const { data } = await getComments({
        type: 'c', // c-对评论的回复
        source: this.comment.com_id.toString(),
        offset: this.offset
      })
      // console.log(this.comment.com_id.toString())
      this.list.push(...data.data.results)
      this.loading = false
      if (data.data.results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    /**
     * 发布评论
     */
    async onAddComment () {
      const commentText = this.commentText.trim()
      if (!commentText) {
        return
      }
      const { data } = await addComment({
        target: this.comment.com_id.toString(), // 当前评论的ID
        content: commentText,
        art_id: this.$route.params.articleId // 对评论内容发表回复时需要传递文章ID 仅对文章进行评论不必添加此参数
      })
      this.list.unshift(data.data.new_obj)
      this.commentText = ''
      this.comment.reply_count++
    },
    /**
     * 评论点赞/取消评论点赞
     */
    async onCommentLike (comment) {
      const commentId = comment.com_id.toString()
      if (comment.is_liking) {
        await deleteCommentLike(commentId)
      } else {
        await addCommentLike(commentId)
      }
      comment.is_liking = !comment.is_liking
    },
    /**
     * 展示回复弹层
     */
    onReplyShow () {
      this.isReplyShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.publish-wrap{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
.van-list{
    margin-bottom: 45px;
}
</style>
