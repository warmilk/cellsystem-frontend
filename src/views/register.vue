<template>
  <el-container>
    <el-header>
      <logo dark />
    </el-header>
    <el-main>
      <div style="width: 80%">
        <el-button icon="el-icon-back" circle @click="$router.push('/')">
        </el-button>
      </div>
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRule" label-width="5rem">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="registerForm.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hadnleRegister">注册</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form></el-main
    >
  </el-container>
</template>

<script>
import logo from '@/components/logo.vue'
import { register } from '@/service/user'

export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        name: '',
        gender: null
      },
      registerFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        gender: [
          {
            type: 'number',
            required: true,
            message: '请选择性别',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    hadnleRegister() {
      this.$refs.registerFormRef.validate(async (valid) => {
        if (!valid) return
        const res = await register(this.registerForm)
        if (res === null) return

        this.$msg.success(res.message)
        this.$router.push('/')
      })
    },
    handleReset() {
      this.$refs.registerFormRef.resetFields()
    }
  },
  components: {
    logo
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #303133;
}
.el-main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form {
  margin-top: 2.5rem;
}
</style>
