<template>
  <div>
      <van-nav-bar
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
        right-text="保存"
        ></van-nav-bar>
        <van-cell-group>
          <!-- 点击头像切换头像 -->
            <van-cell
              title="头像"
              @click="onChangePhoto">
                <van-image
                    round
                    width="30"
                    height="30"
                    :src="user.photo"></van-image>
            </van-cell>
            <van-cell
                title="昵称"
                :value="user.name"
                is-link></van-cell>
            <van-cell
                title="性别"
                :value="user.gender === 0 ? '男' : '女' "
                is-link></van-cell>
            <van-cell
                title="生日"
                :value="user.birthday"
                is-link></van-cell>
        </van-cell-group>
        <!-- 默认隐藏的文件选择 -->
        <input
          type="file"
          hidden
          ref="file"
          @change="onFileChange">
  </div>
</template>

<script>
import { getProfile } from '@/api/user'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    /**
     * 获取用户的个人信息
     */
    async loadUserProfile () {
      const { data } = await getProfile()
      this.user = data.data
    },
    /*
     * 当点击头像时候触发ref为file的click
     */
    onChangePhoto () {
      this.$refs.file.click()
    },
    /*
    * 在选择头像之后 file发生改变
     */
    onFileChange () {
      this.user.photo = window.URL.createObjectURL(this.$refs.file.files[0])
    }
  }
}
</script>

<style>

</style>
