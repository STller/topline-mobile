<template>
  <div>
    <van-nav-bar title="登陆" />
    <van-cell-group>
      <van-field v-model="user.mobile" required clearable left-icon placeholder="请输入手机号"></van-field>
      <van-field v-model="user.code" required clearable left-icon placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="button-outside">
      <van-button class="button-inside" text="登陆" type="info" @click="onLogin"></van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js' // 引入封装的接口请求代码
export default {
  name: 'loginIndex',
  data () {
    return {
      user: {
        // mobile: '',
        // code: ''
        mobile: '15001230123',
        code: '246810'
      }
    }
  },
  methods: {
    async onLogin () {
      const toast = this.$toast.loading({
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '登录中'
      })
      try {
        let { data } = await login(this.user)
        console.log(data)
        toast.clear()
        this.$toast.success({
          duration: 2000,
          message: '登录成功'
        })
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail('登陆失败，手机号或验证码错误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.button-outside {
  padding: 20px;
  .button-inside {
    width: 100%;
    background-color: #3195fae5;
    color: #ffffff;
  }
}
</style>
