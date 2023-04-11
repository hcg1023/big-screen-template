import Vue from 'vue'
import Vuex from 'vuex'
import { setToken } from '@/utils/token'
import { ILoginRes } from '@/api/Login'
import { userInfoStorage } from '@/utils/storage'

Vue.use(Vuex)

interface IStoreState {
  userInfo: ILoginRes | null
}

const state: IStoreState = {
  userInfo: userInfoStorage.get(null),
}

const getters = {}

const mutations = {
  setUserInfo(state: IStoreState, userInfo: ILoginRes | null) {
    state.userInfo = userInfo
    setToken(userInfo?.token)
    userInfoStorage.set(userInfo)
  },
}
export type IMutations = typeof mutations

const actions = {}
export type IActions = typeof actions

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
