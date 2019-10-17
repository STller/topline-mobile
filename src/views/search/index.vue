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
      <van-cell title="单元格" icon="search"></van-cell>
      <van-cell title="单元格" icon="search"></van-cell>
    <!-- /联想建议 -->
  </div>
</template>

<script>
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {
      console.log('onsearch')
    }
  }

}
</script>

<style>

</style>
