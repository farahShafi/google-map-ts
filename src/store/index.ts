import Vue from 'vue'
import Vuex from 'vuex'
import allProperties from './modules/properties'
import loggedIn from './modules/loggedIn'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    allProperties,
    loggedIn
  }
})
