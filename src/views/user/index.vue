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
      <van-cell title="头像" @click="onChangePhoto">
        <van-image round width="30" height="30" :src="user.photo"></van-image>
      </van-cell>
      <van-cell
        title="昵称"
        :value="user.name"
        is-link
        @click="isEditNameShow = !isEditNameShow"
      ></van-cell>
      <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女' "
        is-link
        @click="isEditGenderShow = !isEditGenderShow"
      ></van-cell>
      <van-cell title="生日" :value="user.birthday" is-link></van-cell>
    </van-cell-group>
    <!-- 默认隐藏的文件选择 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- /默认隐藏的文件选择 -->
    <!-- 编辑用户昵称弹窗 -->
    <van-dialog
      v-model="isEditNameShow"
      title="用户昵称"
      show-cancel-button
      @confirm="onUserNameConfirm"
    >
      <van-field placeholder="请输入用户名" :value="user.name" @input="onUserNameInput" />
    </van-dialog>
    <!-- /编辑用户昵称弹窗 -->
    <!-- 编辑用户昵称上拉菜单 -->
    <van-action-sheet
      v-model="isEditGenderShow"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
    />
    <!-- /编辑用户昵称上拉菜单 -->
  </div>
</template>

<script>
import { getProfile, updateUserPhoto } from '@/api/user'
export default {
  name: 'UserIndex',
  data () {
    return {
      user: {},
      isEditNameShow: false, // 编辑昵称弹窗是否显示
      inputUserName: '', // 存储编辑用户数据的输入框数据
      isEditGenderShow: false, // 编辑性别弹窗是否显示
      actions: [
        // 性别上拉菜单的数据
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ]
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
    },
    /**
     *输入新的昵称后确认输入
     */
    onUserNameConfirm () {
      this.user.name = this.inputUserName
    },
    /**
     * 正在输入新的昵称
     */
    onUserNameInput (value) {
      this.inputUserName = value
    },
    /**
     * 性别的弹窗选择
     */
    onSelect (item) {
      // 修改user中的数据
      this.user.gender = item.value
      // 关闭性别上拉弹窗
      this.isEditGenderShow = false
    }
  }
}
</script>

<style>
</style>
