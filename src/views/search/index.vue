<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键字"
      show-action
      shape="round"
      @search="onSearch"
    >
    <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <!-- /搜索框 -->
    <!-- 联想建议 -->
      <!-- van-cell-group可以为van-cell提供上下外边框 -->
      <van-cell v-for="(item,index) in searchSuggestions" :title="item" :key="index" icon="search"></van-cell>
    <!-- /联想建议 -->
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // 搜索关键字
      searchText: '',
      // 根据搜索关键字返回的搜索联想建议列表
      searchSuggestions: []
    }
  },
  methods: {
    async onSearch () {
      const searchText = this.searchText.trim()
      if (!searchText) {

      } else {
        const { data } = await getSearchSuggestions({
          q: this.searchText
        })
        this.searchSuggestions = data.data.options
      }
    }
  }

}
</script>

<style>

</style>
