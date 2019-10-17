<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键字"
      show-action
      shape="round"
      @search="onSearch(searchText)"
      @input="onSearchInput"
    >
    <div slot="action" @click="onSearch(searchText)">搜索</div>
    </van-search>
    <!-- /搜索框 -->
    <!-- 联想建议 -->
      <!-- van-cell-group可以为van-cell提供上下外边框 -->
      <van-cell
        v-for="(item,index) in searchSuggestions"
        :title="item"
        :key="index"
        icon="search"
        @click="onSearch(item)">
        <!-- 运用van-cell title插槽高亮显示关键字 -->
        <div v-html="highLight(item)" slot="title"></div>
      </van-cell>
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
    /**
     * 点击搜索
     */
    onSearch (data) {
      this.$router.push(`/search/${data}`)
    },
    /**
     * 搜索内容发生改变即搜索
     */
    async onSearchInput () {
      const searchText = this.searchText.trim()
      if (!searchText) {
      } else {
        const { data } = await getSearchSuggestions({
          q: this.searchText
        })
        this.searchSuggestions = data.data.options
      }
    },
    /**
     * 搜索联想列表中 搜索关键字高亮显示
     */
    highLight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, '<span style="color:red">' + this.searchText + '</span>')
    }
  }

}
</script>

<style>

</style>
