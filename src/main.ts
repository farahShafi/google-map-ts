import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { BootstrapVue } from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import store from './store'

// Styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/custom.css'

// Components
import MapView from './components/MapView.vue'
import NewProperty from './components/NewProperty.vue'
import LoginView from './components/LoginView.vue'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC4Nm5sj16hCNkuwFOAxtO1j6bAUalevGA',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'Map',
    component: MapView,
    meta: { title: 'Properties' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/new-property',
    name: 'NewProperty',
    component: NewProperty,
    meta: { title: 'Add Property' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
