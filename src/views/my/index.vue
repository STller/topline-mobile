<template>
  <div class="my">
      <!-- 用户信息 -->
      <van-cell-group
        class="user-info"
        v-if="$store.state.user.length != 0">
        <van-cell
            class="base-info"
            is-link
            :border="false"
            @click="$router.push({name:'user'})">
            <div slot="title">
                <img class="avatar" :src="user.photo">
                <span class="title">{{user.name}}</span>
            </div>
            </van-cell>
            <van-grid
                class="data-info"
                :border="false"
                >
                <van-grid-item>
                    <span class="count">{{user.art_count}}</span>
                    <span class="text">头条</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="count">{{user.follow_count}}</span>
                    <span class="text">关注</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="count">{{user.fans_count}}</span>
                    <span class="text">粉丝</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="count">{{user.like_count}}</span>
                    <span class="text">获赞</span>
                </van-grid-item>
                </van-grid>
        </van-cell-group>
      <!-- /用户信息 -->
    <!-- 未登陆 -->
    <!-- $router.push({name:'login'})路径参数可以是对象形式 -->
    <div class="not-login" v-else>
        <div
            class="circle"
            @click="$router.push({name:'login'})"
            >
        <span>登陆</span>
    </div>
    </div>
    <!-- /未登录 -->
    <!-- 用户信息 -->
    <!-- <van-cell-group class="user-info">
        <van-cell
            class="base-info"
            is-link
            :border="false"
            @click="$router.push({name:'user'})">
            <div slot="title">
                <img class="avatar" :src="user.photo">
                <span class="title">{{user.name}}</span>
            </div>
            </van-cell>
            <van-grid
                class="data-info"
                :border="false">
                <van-grid-item>
                    <span class="count">{{user.art_count}}</span>
                    <span class="text">头条</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="count">{{user.art_count}}</span>
                    <span class="text">关注</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="count">{{user.art_count}}</span>
                    <span class="text">粉丝</span>
                </van-grid-item>
                <van-grid-item>
                    <span class="count">{{user.art_count}}</span>
                    <span class="text">获赞</span>
                </van-grid-item>
                </van-grid>
    </van-cell-group> -->
    <!-- /用户信息 -->
    <!-- 其他 -->
    <van-grid clickable>
        <van-grid-item icon="star" text="我的收藏"></van-grid-item>
        <van-grid-item icon="chat" text="我的评论"></van-grid-item>
        <van-grid-item icon="like" text="我的点赞"></van-grid-item>
        <van-grid-item icon="browsing-history" text="浏览历史"></van-grid-item>
    </van-grid>
    <van-cell-group>
        <van-cell title="消息通知" is-link></van-cell>
        <van-cell title="用户反馈" is-link></van-cell>
        <van-cell
            title="语音助手"
            is-link
            @click="$router.push('/chat')"
            ></van-cell>
        <van-cell
            title="系统设置"
            is-link
            to="/settings"
            ></van-cell>
    </van-cell-group>
    <!-- /其他 -->
  </div>
</template>

<script>
import { getSelf } from '../../api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      user: {} // 用户信息对象
    }
  },
  created () {
    this.loadSelf()
  },
  methods: {
    /**
     *  获取用户的信息
     */
    async loadSelf () {
      const { data } = await getSelf()
      this.user = data.data
      this.$store.commit('setUser', this.user)
    }
  }
}
</script>

<style lang="less" scoped>
.not-login{
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    .circle{
        width: 50px;
        height: 50px;
        padding:20px;
        background-color: red;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;
        font-size: 20px;
    }
}
.user-info{
    .base-info{
        display: flex;
        align-items: center;
        div{
            display: flex;
            align-items: center;
        }
        .avatar{
            margin-right: 15px;
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }
    }
    .data-info{
        .text{
            font-size: 14px;
        }
        .count{
            font-size: 12px;
        }
    }
}
</style>
