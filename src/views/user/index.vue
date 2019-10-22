<template>
  <div>
      <van-nav-bar
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
        right-text="保存"
        @click-right="onSave"
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
import { getProfile, updateUserPhoto } from '@/api/user'
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
  // watch: {
  //   user: function () {
  //     console.log(this.user)
  //   }
  // },
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
      console.log(this.$refs.file.files)
      this.user.photo = window.URL.createObjectURL(this.$refs.file.files[0])
    },
    /**
     * 上传用户头像
     */
    async onSave () {
      // 展示加载提示
      this.$toast.loading({
        duration: 0, // 持续展示toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner', // 加载图标类型
        message: '保存中' // 文本类型
      })
      try {
        const formData = new FormData()
        formData.append('photo', this.$refs.file.files[0])
        await updateUserPhoto(formData)
        this.$toast.success('保存成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('保存失败')
      }
    }
  }
}
</script>

<style>

</style>
