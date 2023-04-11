import router from '@/router/router'
import store from '@/store'
import { getToken } from '@/utils/token'

const whiteList = ['/login']

function judgeUserIsLogin(): boolean {
  // return store.state.userInfo
  return !!getToken()
}

router.beforeEach(async (to, from, next) => {
  // 有用户信息，直接进入
  if (judgeUserIsLogin()) {
    next()
    // 无用户信息
  } else {
    // 登录页面直接进入
    if (whiteList.includes(to.path)) {
      next()
      return
    }
    // 没有token，跳转到登录页
    next('/login')
  }
})
