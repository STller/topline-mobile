<template>
  <div class="tabbar">
    <!-- 子路由入口 -->
    <router-view></router-view>
    <van-tabbar route v-model="active">
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item
        to="/my"
        icon="setting-o"
        >{{$store.state.user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabbarIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>
</style>
