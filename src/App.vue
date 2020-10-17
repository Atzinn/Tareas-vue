<template>
  <div class="container mt-3" id="app">
    <div class="float-right">
      <router-link class="btn btn-primary mr-2" to="/" v-if="existeUsuario">Inicio</router-link>
      <router-link class="btn btn-ligth text-primary mr-2" to="/registro" v-if="!existeUsuario">Registro</router-link> 
      <router-link class="btn btn-ligth text-primary mr-2" to="/login" v-if="!existeUsuario">Log In</router-link>
      <button @click="cerrarSesion" class="btn btn-danger mr-2" v-if="existeUsuario">Cerrar Sesión</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
  methods:{

    ...mapActions(['cerrarSesion'])
  },
  computed: {
    ...mapGetters(['existeUsuario'])
  }
}
</script>