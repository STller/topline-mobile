<template>
  <div class="search">
    <!-- 搜索框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键字"
      show-action
      shape="round"

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
    <!-- 搜索历史记录 -->
    <van-cell-group>
      <van-cell v-for="(item,index) in searchHistories" :key="index" :title="item">
        <span>全部删除</span>
        <span>完成</span>
        <van-icon name="delete"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
/**
 * 导入本地化存储相关组件
 */
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      // 搜索关键字
      searchText: '',
      // 根据搜索关键字返回的搜索联想建议列表
      searchSuggestions: [],
      // 获取本地存储的搜索历史记录
      searchHistories: getItem('search-histories')
    }
  },
  methods: {
    /**
     * 点击搜索
     */
    onSearch (data) {
      // 检测本地的历史记录中是否存在当前的搜索关键字
      this.searchHistories = this.searchHistories ? this.searchHistories : []
      const isSearchResultExist = this.searchHistories.indexOf(data)
      if (isSearchResultExist !== -1) {
        // 本地存在该搜索历史记录 调用splice删除
        this.searchHistories.splice(isSearchResultExist, 1)
      }
      // 删除之后将最新的搜索关键字保存在历史记录中
      this.searchHistories.unshift(data)
      setItem('search-histories', this.searchHistories)
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
