import Vue from 'vue'
import Vuex from 'vuex'
import { db,auth } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    error: null,
    tareas: [],
    tarea: {
      id: '',
      nombre: ''
    },
    carga: false,
    texto: ''
  },
  mutations: {
    setUsuario(state,payload) {
      state.usuario = payload  
    },
    setError(state,payload) {
      state.error = payload
    },
    setTareas(state,payload) {
      state.tareas = payload
    },
    setTarea(state,payload) {
      state.tarea = payload
    },
    setEliminarTarea(state,payload) {
      state.tareas = state.tareas.filter(tarea => tarea.id !== payload)
    },
    cargarFirebase(state,payload) {
      state.carga = payload
    }
  },
  actions: {
    buscador({commit,state},payload) {
      state.texto = payload.toLowerCase()
    },
    eliminarTarea({commit,state},id) {
      db.collection(state.usuario.email).doc(id).delete()
        .then(() => {
          commit('setEliminarTarea',id)
        }).catch(err => console.log(err))
    },
    agregarTarea({commit,state},nombreTarea) {
      commit('cargarFirebase',true)
      db.collection(state.usuario.email).add({
        nombre:nombreTarea
      }).then(doc => {
        router.push({name: 'Inicio'})
        commit('cargarFirebase',false)
      }).catch(err => console.log(err))
    },
    getTarea({commit,state},id) {
      db.collection(state.usuario.email).doc(id).get()
        .then(doc => {
          let tarea = doc.data()
          tarea.id = doc.id
          commit('setTarea',tarea)
        })
    },
    editarTarea({commit,state},tarea) {
      db.collection(state.usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      }).then(() => {
        router.push({name:'Inicio'})
      }).catch(err => console.log(err))
    },
    getTareas({commit,state}) {
      commit('cargarFirebase',true)
      const arrayTareas = []
      db.collection(state.usuario.email).get()
        .then(res => {
          res.forEach(doc => {
            let tarea = doc.data()
            tarea.id = doc.id
            arrayTareas.push(tarea)
          })
          commit('cargarFirebase',false)
        })
        commit('setTareas',arrayTareas)
    },
    crearUsuario({commit},usuario) {
      auth.createUserWithEmailAndPassword(usuario.email,usuario.password)
          .then(res => {
            // console.log(res);
            const usuarioCreado = {
              email: res.user.email,
              uid: res.user.uid
            }

            db.collection(res.user.email).add({
              nombre: 'tarea de ejemplo'
            }).then(doc => {
              commit('setUsuario',usuarioCreado)
              router.push('/')
            }).catch(err => console.log(err))

          })
          .catch(error => {
            // console.log(error);
            commit('setError',error.code)
          })
    },
    ingresoUsuario({commit},usuario) {
      auth.signInWithEmailAndPassword(usuario.email,usuario.pass)
          .then(res => {
            console.log(res);
            const usuarioLoggeado = {
              email: res.user.email,
              uid: res.user.uid
            }
            commit('setUsuario',usuarioLoggeado)
            router.push('/')
          })
          .catch(error => {
            console.log(error);
            commit('setError',error)
          })
    },
    cerrarSesion({commit}) {
      auth.signOut().then(() => router.push('/login'))
    },
    detectarUsuario({commit},usuario) {
      commit('setUsuario',usuario)
    },
  },
  getters: {
    existeUsuario(state) {
      if(state.usuario === null){
        return false
      } else {
        return true
      }
    },
    arrayFiltrado(state) {
      let arr = []
      for(let tarea of state.tareas) {
        let nombre = tarea.nombre.toLowerCase()
        if(nombre.indexOf(state.texto) >= 0) {
          arr.push(tarea) 
        }
      }

      return arr
    }
  },
  modules: {
  }
})
