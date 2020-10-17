import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import { auth } from './firebase'
import { userInfo } from 'os'

auth.onAuthStateChanged((usuario) => {
  if(usuario) {
    console.log(usuario) 
    const detectoUsuario = {
      email: usuario.email,
      uid: usuario.uid
    }
    store.dispatch('detectarUsuario',detectoUsuario)
  } else {
    console.log(usuario)
    store.dispatch('detectarUsuario',usuario)
  }
  
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

