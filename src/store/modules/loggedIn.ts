import { Module } from 'vuex'
import { LoggedInState, RootState } from '@/types'

const state = (): LoggedInState => ({
  loggedIn: false
})

const getters = {
  loggedIn: (state: LoggedInState): boolean => state.loggedIn
}

const mutations = {
  SET_LOGGED_IN(state: LoggedInState, value: boolean): void {
    state.loggedIn = value
  }
}

const actions = {
  setLoggedIn({ commit }: any, value: boolean): void {
    commit('SET_LOGGED_IN', value)
  }
}

const loggedInModule: Module<LoggedInState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default loggedInModule
