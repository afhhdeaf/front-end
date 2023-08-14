<template>
  <div class="login-container">
    <el-container>
      <el-header>
        <div class="logo">
          <svg-icon name="logo" size="35px" />
          <text class="logo-text">Acloud</text>
        </div>
      </el-header>
      <el-main>
        <el-row style="display: flex; justify-content: space-between">
          <el-col :lg="2" :md="1" :sm="24" :xl="1" :xs="1">
            <div style="color: transparent"></div>
          </el-col>
          <el-col :lg="10" :md="12" :sm="24" :xl="8" :xs="24">
            <el-form
              ref="formRef"
              class="login-form"
              label-position="left"
              :model="form"
              :rules="rules"
            >
              <div class="title">欢迎使用小破站</div>
              <el-form-item prop="username">
                <el-input
                  v-model.trim="form.username"
                  v-focus
                  placeholder="请输入用户名"
                  :prefix-icon="User"
                  tabindex="1"
                  type="text"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :key="passwordType"
                  v-model.trim="form.password"
                  placeholder="请输入密码"
                  :prefix-icon="Lock"
                  tabindex="2"
                  :type="passwordType"
                  @keyup.enter="handleLogin"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login-btn"
                  :loading="loading"
                  type="primary"
                  @click="handleLogin"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :lg="2" :md="1" :sm="24" :xl="1" :xs="1">
            <div style="color: transparent"></div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { useRouter } from 'vue-router'
  import { User, Lock } from '@element-plus/icons-vue'
  import { setToken } from '@/utils/token'
  import { doLogin } from '@/api/module/common'

  export default defineComponent({
    name: 'Login',
    directives: {
      focus: {},
    },
    components: {},
    setup() {
      const router = useRouter()

      const state = reactive({
        formRef: null,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入用户名',
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              message: '请输入密码',
            },
          ],
        },
        loading: false,
        passwordType: 'password',
      })

      const handleLogin = async () => {
        state['formRef'].validate(async (valid) => {
          if (valid)
            try {
              state.loading = true
              const {
                data: { ['token']: token },
              } = await doLogin(state.form).catch(() => {})
              if (token) {
                setToken(token)
                await router.push('/')
              } else {
                console.log('没有获取到token')
              }
            } finally {
              state.loading = false
            }
        })
      }

      onBeforeMount(() => {
        state.form.username = 'raven'
        state.form.password = '123456'
      })

      return {
        ...toRefs(state),
        handleLogin,
        User,
        Lock,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background-color: #f0f2f5;
    background-size: cover;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 300px;
      height: 64px;
      margin-top: 20px;
      margin-left: 24px;
    }
    .logo-text {
      margin-left: 8px;
      font-size: 22px;
      color: #6d6d6d;
    }
    .el-container {
      height: 100vh;
    }
    .el-main {
      padding: 0;
    }

    .login-form {
      position: relative;
      max-width: 100%;
      padding: 5vh;
      margin: calc((100vh - 600px) / 2) 6vw 5vw;
      overflow: hidden;
      background-color: #fff;
      filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.1));
      background-size: 100% 100%;
      border-radius: 10px;

      .title {
        margin-bottom: 100px;
        font-size: 28px;
        font-weight: 500;
        color: #616161;
      }

      .login-btn {
        display: inherit;
        width: 100%;
        height: 50px;
        margin-top: 5px;
        background-image: linear-gradient(
          to right,
          #00d994,
          #00d9a2,
          #00daaf,
          #00d9bb,
          #00d9c5
        );
        filter: drop-shadow(4px 4px 8px rgba(0, 217, 148, 0.5));
        border: 0;
        border-radius: 50px;

        &:hover {
          opacity: 0.9;
        }
      }

      :deep() {
        .el-form-item {
          padding-right: 0;
          margin: 50px 0;
          color: #454545;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;

          &__content {
            min-height: 32px;
            line-height: 32px;
          }

          &__error {
            position: absolute;
            top: 100%;
            left: 18px;
            font-size: 12px;
            line-height: 18px;
            color: #ff4f4f;
          }
        }

        .el-input {
          box-sizing: border-box;

          input {
            height: 48px;
            padding-left: 30px;
            line-height: 48px;
            border: 0;
          }

          &__suffix-inner {
            position: absolute;
            right: 65px;
            cursor: pointer;
          }
        }
      }
    }

    :deep() {
      .el-icon {
        position: absolute;
        left: 15px;
        font-size: 16px;
      }
    }
  }
</style>
