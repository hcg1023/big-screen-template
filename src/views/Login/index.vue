<template>
  <div class="login">
    <el-button @click="handleLogin">login</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { login } from '@/api/Login'

export default defineComponent({
  name: 'Login',
  setup() {
    return {
      async handleLogin() {
        const res = await login({
          username: 'username',
          password: 'password',
        })
        console.log(res)
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.login {
  width: 1920px;
}
</style>
