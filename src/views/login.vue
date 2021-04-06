<template>
  <div class="login-container">
    <div class="login-box">
      <logo />
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRule">
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
          />
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="handleLogin">登陆</el-button>
        <el-button @click="$router.push('/register')">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/components/logo.vue'
import { login } from '@/service/user'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['SAVE_USER']),
    handleLogin() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const res = await login(
          this.loginForm.username,
          this.loginForm.password
        )
        if (res === null) return
        this.SAVE_USER(res.data)

        this.$msg.success(res.message)
        this.$router.push('/home')
      })
    }
  },
  components: {
    logo
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: #409eff;
  height: 100%;
}
.login-box {
  width: 400px;
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: #fff;
  border-radius: 0.25rem;

  .el-form {
    width: 80%;
  }
}
.logo {
  height: 50px;
}
</style>
