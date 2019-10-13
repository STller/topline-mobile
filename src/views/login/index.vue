<template>
  <div>
    <van-nav-bar title="登陆" />
    <ValidationObserver ref="loginForm">
      <van-cell-group>
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{errors}">
          <van-field :error-message="errors[0]" label="手机号" v-model="user.mobile" required clearable left-icon placeholder="请输入手机号"></van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|max:6" v-slot="{ errors }">
          <van-field label="验证码" :error-message="errors[0]" v-model="user.code" required clearable left-icon placeholder="请输入验证码">
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <div class="button-outside">
      <van-button class="button-inside" text="登陆" type="info" @click="onLogin"></van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js' // 引入封装的接口请求代码
/**
 * 按需导入需要的本地存储API
 */
import { setItem } from '@/utils/storage.js'
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
      // 表单验证 成功后再往下继续
      const isValid = await this.$refs.loginForm.validate()
      if (!isValid) {
        return
      }
      // toast样式设置
      const toast = this.$toast.loading({
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '登录中'
      })
      try {
        let { data } = await login(this.user)
        /**
         * 本地存储token令牌
         */
        setItem('token', data.data.token)
        /**
         * 容器存储token令牌
         * 为了防止刷新页面state中的token过期
         * 转为本地存储token令牌
         */
        this.$store.commit('setToken', data.data.token)
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
