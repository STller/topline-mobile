<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <van-nav-bar
      title="xxx 的搜索结果"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->
    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        :title="item.title"
      ></van-cell>
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      // 文章列表
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearch({
        page: this.page, // 页数 不传默认为1
        per_page: this.perPage, // 每页数量，不传的话每页数量由后端决定
        q: this.$route.params.q
      })
      this.list.push(...data.data.results)
      this.loading = false
      if (data.data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  margin-top: 46px;
}
</style>
